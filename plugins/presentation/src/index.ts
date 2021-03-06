//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
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

import core, {
  Account,
  Class,
  Data,
  Doc,
  DocumentQuery,
  DocumentUpdate,
  FindOptions,
  FindResult,
  Obj,
  Ref,
  Space,
  Storage,
  Tx,
  TxOperations
} from '@anticrm/core'
import { getResource, plugin, Plugin, Service } from '@anticrm/platform'
import { Client } from '@anticrm/plugin-core'
import { deepEqual } from 'fast-equals'
import { onDestroy } from 'svelte'

class LiveQueryImpl<T extends Doc> {
  oldQuery?: DocumentQuery<T>
  oldClass?: Ref<Class<T>>
  oldOptions: FindOptions<T> | undefined
  unsubscribe?: UnsubscribeFunc

  constructor (
    private readonly client: () => Promise<Client>,
    private readonly callback: (result: FindResult<T>) => void,
    readonly stack?: string
  ) {
    onDestroy(() => {
      this.unsubscribe?.()
      this.unsubscribe = undefined
    })
  }

  update (newClass: Ref<Class<T>>, newQuery: DocumentQuery<T>, options?: FindOptions<T>): void {
    if (this.checkParams(newQuery, newClass, options)) {
      return
    }

    this.unsubscribe?.()
    this.oldQuery = newQuery
    this.oldClass = newClass
    this.oldOptions = options
    this.client()
      .then((client) => {
        this.unsubscribe = client.query(newClass, newQuery, this.callback, options, (reason) => {
          console.error('Query failed:', reason, this.stack)
        })
      })
      .catch((reason) => {
        console.error('Query failed:', reason, this.stack)
      })
  }

  private checkParams (
    newQuery: DocumentQuery<T>,
    newClass: Ref<Class<T>>,
    options: FindOptions<T> | undefined
  ): boolean {
    return deepEqual(this.oldQuery, newQuery) && this.oldClass === newClass && deepEqual(this.oldOptions, options)
  }
}

/**
 * @public
 */
export interface QueryUpdater<T extends Doc> {
  update: (_class: Ref<Class<T>>, query: DocumentQuery<T>, options?: FindOptions<T>) => void
  unsubscribe: () => void
}

type UnsubscribeFunc = () => void
export interface PresentationService extends Service {}
const PluginPresentation = 'presentation' as Plugin<PresentationService>

export class PresentationClient implements Storage, TxOperations {
  constructor (private readonly client: () => Promise<Client>, private readonly accountIdValue: Ref<Account>) {}

  static async create (accountId: Ref<Account>, client: () => Promise<Client>): Promise<PresentationClient> {
    return new PresentationClient(client, accountId)
  }

  async isDerived<T extends Obj>(_class: Ref<Class<T>>, from: Ref<Class<T>>): Promise<boolean> {
    return (await this.client()).isDerived(_class, from)
  }

  async getDescendants<T extends Obj>(_class: Ref<Class<T>>): Promise<Array<Ref<Class<Obj>>>> {
    return (await this.client()).getDescendants(_class)
  }

  async getAncestors (_class: Ref<Class<Obj>>): Promise<Array<Ref<Class<Obj>>>> {
    return (await this.client()).getAncestors(_class)
  }

  async findAll<T extends Doc>(
    _class: Ref<Class<T>>,
    query: DocumentQuery<T>,
    options?: FindOptions<T>
  ): Promise<FindResult<T>> {
    return await (await this.client()).findAll(_class, query, options)
  }

  async tx (tx: Tx): Promise<void> {
    return await (await this.client()).tx(tx).catch((error) => this.handleError(error))
  }

  async notifyTx (tx: Tx): Promise<void> {
    return await (await this.client()).notifyTx(tx).catch((error) => this.handleError(error))
  }

  query<T extends Doc>(
    liveQuery: QueryUpdater<T> | undefined,
    _class: Ref<Class<T>>,
    query: DocumentQuery<T>,
    callback: (result: FindResult<T>) => void,
    options?: FindOptions<T>
  ): QueryUpdater<T> {
    if (liveQuery !== undefined) {
      liveQuery.update(_class, query, options)
      return liveQuery
    }
    return this.liveQuery(_class, query, callback, options)
  }

  accountId (): Ref<Account> {
    return this.accountIdValue
  }

  userSpace (): Ref<Space> {
    return this.accountIdValue.toString() as Ref<Space>
  }

  async createDoc<T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    attributes: Data<T>,
    objectId?: Ref<T>,
    txSpace?: boolean // Use user Transaction space.
  ): Promise<T> {
    return await (await this.client()).createDoc(_class, space, attributes, objectId, txSpace).catch((error) => {
      this.handleError(error)
      throw error
    })
  }

  async createShortRef<T extends Doc>(
    _id: Ref<T>,
    _class: Ref<Class<T>>,
    space: Ref<Space>
  ): Promise<string | undefined> {
    return await (await this.client()).createShortRef(_id, _class, space)
  }

  async updateDoc<T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    operations: DocumentUpdate<T>,
    txSpace?: boolean // Use user Transaction space.
  ): Promise<void> {
    return await (await this.client())
      .updateDoc(_class, space, objectId, operations, txSpace)
      .catch((error) => this.handleError(error))
  }

  async removeDoc<T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    txSpace?: boolean // Use user Transaction space.
  ): Promise<void> {
    return await (await this.client())
      .removeDoc(_class, space, objectId, txSpace)
      .catch((error) => this.handleError(error))
  }

  private liveQuery<T extends Doc>(
    _class: Ref<Class<T>>,
    query: DocumentQuery<T>,
    callback: (result: FindResult<T>) => void,
    options?: FindOptions<T>
  ): QueryUpdater<T> {
    const lQuery = new LiveQueryImpl<T>(this.client, callback, new Error().stack)
    lQuery.update(_class, query, options)

    return {
      update: (_class, query, options) => lQuery.update(_class, query, options),
      unsubscribe: () => {
        lQuery.unsubscribe?.()
      }
    }
  }

  private handleError (error: any): void {
    console.error(error)
    throw error
  }
}

export default plugin(PluginPresentation, {}, {})

export async function openReferencedDocument (
  client: PresentationClient,
  doc: Pick<Doc, '_class' | '_id'>
): Promise<boolean> {
  const p = await client.findAll(core.class.DocumentPresenter, { objectClass: doc._class })
  if (p.length > 0) {
    for (const pr of p) {
      if (pr.linkHandler !== undefined) {
        const handler = await getResource(pr.linkHandler)
        if (handler !== undefined) {
          await handler(doc._class, doc._id)
          return true
        }
      }
    }
  }
  return false
}
