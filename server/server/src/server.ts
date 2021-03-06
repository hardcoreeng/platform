//
// Copyright © 2021 Anticrm Platform Contributors.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { Doc, generateId, Ref, Storage, Tx } from '@anticrm/core'
import type { Request } from '@anticrm/rpc'
import { Code, readRequest, serialize } from '@anticrm/rpc'
import { PlatformError, Severity, Status, unknownStatus } from '@anticrm/status'
import { createServer, Server as HttpServer } from 'http'
import { createServer as createHttpsServer } from 'https'
import { IncomingMessage } from 'http'
import * as net from 'net'
import WebSocket, { Server as WebSocketServer } from 'ws'
import { SecurityOptions } from './tls_utils'

/**
 * @public
 */
export interface StorageProvider {
  connect: (clientId: string, token: string, sendTx: (tx: Tx) => void, close: () => void) => Promise<Storage>
  close: (clientId: string) => Promise<void>
}

/**
 * @public
 */
export function parseAddress (addr: string): net.AddressInfo {
  const addrSegm = addr.split(':')
  if (addrSegm.length === 2) {
    const pport = parseInt(addrSegm[1])
    if (!isNaN(pport)) {
      return { family: 'IPv4', address: addrSegm[0], port: pport }
    }
  }
  throw new PlatformError(unknownStatus(`Invalid address returned:${addr}`))
}

/**
 * @public
 */
export function convertAddress (
  addr: net.AddressInfo | string | null,
  host: string | undefined,
  port: number
): net.AddressInfo {
  if (typeof addr === 'string') {
    return parseAddress(addr)
  } else {
    return addr ?? { family: 'IPv4', address: host ?? 'locahost', port: port }
  }
}

/**
 * @public
 */
export class Server {
  connections = new Map<string /* clientId */, WebSocket>()
  server: WebSocketServer
  httpServer: HttpServer
  constructor (
    readonly host: string | undefined,
    readonly port: number,
    readonly provider: StorageProvider,
    security?: SecurityOptions
  ) {
    this.httpServer =
      security !== undefined
        ? createHttpsServer({ key: security.key, cert: security.cert, ca: security.ca })
        : createServer()
    this.server = new WebSocketServer({
      noServer: true,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      }
    })

    this.httpServer.on('upgrade', (request, socket, head) => {
      this.upgradeHandler(request, socket, head)
    })
  }

  private upgradeHandler (request: IncomingMessage, socket: any, head: Buffer): void {
    const token = request.url?.substring(1) // remove leading '/'
    if (token === undefined || token.trim().length === 0) {
      socket.write('HTTP/1.1 400 Bad Request\r\n\r\n')
      socket.destroy()
      return
    }
    this.server.handleUpgrade(request, socket, head, (ws) => {
      this.handleConnection(ws, token).catch((err) => {
        this.traceError(err)
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n')
        socket.destroy()
        // ws.close()
      })
    })
  }

  async listen (): Promise<void> {
    return await new Promise((resolve) => {
      this.httpServer.listen(this.port, this.host, () => {
        resolve()
      })
    })
  }

  shutdown (): void {
    console.log('Shutting down http server')

    for (const conn of this.connections.entries()) {
      this.provider.close(conn[0]).catch(this.traceError)
      conn[1].close()
    }
    this.server.close()
    this.httpServer.close()
  }

  address (): net.AddressInfo {
    return convertAddress(this.httpServer.address(), this.host, this.port)
  }

  private async handleConnection (ws: WebSocket, token: string): Promise<void> {
    const clientId = generateId()

    const storage = this.provider.connect(
      clientId,
      token,
      (tx) => ws.send(serialize({ id: tx._id, result: tx })),
      (): void => ws.close()
    )
    this.registerOnMessage(ws, storage)

    this.connections.set(clientId, ws)

    this.registerOnClose(ws, clientId)
    this.registerOnError(ws, clientId)

    await storage
  }

  private async handleRequest (ws: WebSocket, storage: Storage, request: Request<any>): Promise<void> {
    const { id, method, params } = request
    const callOp = (storage as any)[method]
    try {
      const result = await Reflect.apply(callOp, storage, params)
      ws.send(serialize({ id, result }))
    } catch (error: any) {
      ws.send(
        serialize({
          id,
          error:
            error instanceof PlatformError
              ? new Status(error.status.severity, error.status.code, {
                ...error.status.params,
                message: error.message,
                stack: error.stack
              })
              : new Status(Severity.ERROR, Code.BadRequest, {
                message: error.message,
                stack: error.stack
              })
        })
      )
    }
  }

  private registerOnMessage (ws: WebSocket, storage: Promise<Storage>): void {
    ws.on('message', (msg: string): void => {
      const request = readRequest(msg)
      storage
        .then((s) => {
          this.handleRequest(ws, s, request).catch(this.traceError)
        })
        .catch(this.traceError)
    })
  }

  private registerOnError (ws: WebSocket, clientId: Ref<Doc>): void {
    ws.on('error', (error) => {
      console.error('communication error:', error)
      this.connections.delete(clientId)
      this.provider.close(clientId).catch(this.traceError)
    })
  }

  private registerOnClose (ws: WebSocket, clientId: Ref<Doc>): void {
    ws.on('close', () => {
      this.connections.delete(clientId)
      this.provider.close(clientId).catch(this.traceError)
    })
  }

  private traceError (err: Error): void {
    console.error(err)
  }
}

/**
 * Starts a server handling websocket connections.
 * @param host - host or undefined
 * @param port - port, could pass 0 to handle on any random port.
 * @param provider - a client connection storage provider.
 * @returns a server promise, promise will be resolved in case of server become available.
 *
 * @public
 */
export async function start (
  host: string | undefined,
  port: number,
  provider: StorageProvider,
  security?: SecurityOptions
): Promise<Server> {
  console.log(`starting server on port ${port}...`)

  const server = new Server(host, port, provider, security)
  await server.listen()
  const addr = server.address()
  console.log(`server is listening on host: ${addr.address}: ${addr.port} `)
  return server
}
