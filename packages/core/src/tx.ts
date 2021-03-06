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

import type { KeysByType } from 'simplytyped'
import type { Account, Arr, Class, Data, Doc, Domain, Ref, Space } from './classes'
import core from './component'
import { createShortRef } from './shortref'
import { QuerySelector, Storage } from './storage'
import { generateId } from './utils'

/**
 * @public
 * Define server settable, sequential identifier of transaction apply.
 */
export type TransactionID = number

/**
 * @public
 */
export interface Tx<T extends Doc = Doc> extends Doc {
  sid: TransactionID
  objectId: Ref<T>
  objectSpace: Ref<Space>
}

/**
 * @public
 */
export interface ObjectTx<T extends Doc> extends Tx<T> {
  objectClass: Ref<Class<T>>
}

/**
 * @public
 */
export interface TxCreateDoc<T extends Doc> extends ObjectTx<T> {
  attributes: Data<T>
}

/**
 * @public
 */
export type ArrayAsElement<T extends Doc> = {
  [P in keyof T]: T[P] extends Arr<infer X> ? X : never
}

/**
 * @public
 */
export type ArrayPush<T extends Doc> = {
  [P in keyof T]: T[P] extends Arr<infer X> ? X | EachArray<X> : never
}

/**
 * @public
 */
export interface EachArray<T> {
  $each: T[]
}

/**
 * @public
 */
export type ArrayAsElementQuery<T extends Doc> = {
  [P in keyof T]: T[P] extends Arr<infer X> ? X | QuerySelector<X> : never
}

/**
 * @public
 */
export type OmitNever<T extends object> = Omit<T, KeysByType<T, never>>

/**
 * @public
 */
export interface DocOperation<T extends Doc> {
  $push?: Partial<OmitNever<ArrayPush<Required<T>>>>
  $pull?: Partial<OmitNever<ArrayAsElementQuery<Required<T>>>>
}

/**
 * @public
 */
export type DocumentUpdate<T extends Doc> = Partial<Data<T>> & DocOperation<T>

/**
 * @public
 */
export interface TxUpdateDoc<T extends Doc> extends ObjectTx<T> {
  operations: DocumentUpdate<T>
}

/**
 * @public
 */
export interface TxRemoveDoc<T extends Doc> extends ObjectTx<T> {}

/**
 * @public
 */
export const DOMAIN_TX = 'tx' as Domain

/**
 * Define a list of classes with objectClass definition inside.
 */
const TxObjectClasses = [core.class.TxCreateDoc, core.class.TxUpdateDoc, core.class.TxRemoveDoc]

/**
 * @public
 */
export function txObjectClass (tx: Tx): Ref<Class<Doc>> | undefined {
  if (TxObjectClasses.includes(tx._class)) {
    return (tx as ObjectTx<Doc>).objectClass
  }
}

/**
 * @public
 */
export class TxProcessor {
  txHandlers = {
    [core.class.TxCreateDoc]: async (tx: Tx) => await this.txCreateDoc(tx as TxCreateDoc<Doc>),
    [core.class.TxUpdateDoc]: async (tx: Tx) => await this.txUpdateDoc(tx as TxUpdateDoc<Doc>),
    [core.class.TxRemoveDoc]: async (tx: Tx) => await this.txRemoveDoc(tx as TxRemoveDoc<Doc>)
  }

  async tx (tx: Tx): Promise<void> {
    return await this.txHandlers[tx._class]?.(tx)
  }

  static createDoc2Doc (tx: TxCreateDoc<Doc>): Doc {
    return {
      _id: tx.objectId,
      _class: tx.objectClass,
      space: tx.objectSpace,
      modifiedBy: tx.modifiedBy,
      modifiedOn: tx.modifiedOn,
      createOn: tx.createOn,
      ...tx.attributes
    }
  }

  protected async txCreateDoc (tx: TxCreateDoc<Doc>): Promise<void> {}
  protected async txUpdateDoc (tx: TxUpdateDoc<Doc>): Promise<void> {}
  protected async txRemoveDoc (tx: TxRemoveDoc<Doc>): Promise<void> {}
}

/**
 * @public
 */
export interface TxOperations {
  accountId: () => Ref<Account>
  createDoc: <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    attributes: Data<T>,
    objectId?: Ref<T>,
    userTxSpace?: boolean // Use user Transaction space.
  ) => Promise<T>
  createShortRef: <T extends Doc>(_id: Ref<T>, _class: Ref<Class<T>>, space: Ref<Space>) => Promise<string | undefined>
  updateDoc: <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    operations: DocumentUpdate<T>,
    userTxSpace?: boolean // Use user Transaction space.
  ) => Promise<void>
  removeDoc: <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    userTxSpace?: boolean // Use user Transaction space.
  ) => Promise<void>
}

/**
 * @public
 */
export function withOperations<T extends Storage> (user: Ref<Account>, storage: T): T & TxOperations {
  const result = storage as T & TxOperations

  result.accountId = () => user

  result.createDoc = async <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    attributes: Data<T>,
    objectId?: Ref<T>,
    userTxSpace?: boolean
  ): Promise<T> => {
    const tx: TxCreateDoc<T> = newTxCreateDoc<T>(user, _class, space, attributes, objectId, userTxSpace)
    await storage.tx(tx)
    return TxProcessor.createDoc2Doc(tx) as T
  }

  result.createShortRef = async <T extends Doc>(
    _id: Ref<T>,
    _class: Ref<Class<T>>,
    space: Ref<Space>
  ): Promise<string | undefined> => {
    const objectSpace = (await storage.findAll(core.class.Space, { _id: space }, { limit: 1 }))[0]
    const workspace = objectSpace.name
      .trim()
      .toUpperCase()
      .replace(/[^a-z0-9]/gim, '_')
      .replace(/[_]/g, '_')
    return await createShortRef(storage, user, space, _id, _class, workspace)
  }

  result.updateDoc = async <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    operations: DocumentUpdate<T>,
    userTxSpace?: boolean
  ): Promise<void> => {
    const tx: TxUpdateDoc<T> = {
      sid: 0, // <-- Will be updated on server
      _id: generateId(),
      _class: core.class.TxUpdateDoc,
      space: txSpace(user, userTxSpace),
      modifiedBy: user,
      modifiedOn: Date.now(), // <-- Will be updated on server
      createOn: Date.now(), // <-- Will be updated on server
      objectId,
      objectClass: _class,
      objectSpace: space,
      operations
    }
    await storage.tx(tx)
  }

  result.removeDoc = async <T extends Doc>(
    _class: Ref<Class<T>>,
    space: Ref<Space>,
    objectId: Ref<T>,
    userTxSpace?: boolean
  ): Promise<void> => {
    const tx: TxRemoveDoc<T> = {
      sid: 0, // <-- Will be updated on server
      _id: generateId(),
      _class: core.class.TxRemoveDoc,
      space: txSpace(user, userTxSpace),
      modifiedBy: user,
      modifiedOn: Date.now(), // <-- Will be updated on server
      createOn: Date.now(), // <-- Will be updated on server
      objectId,
      objectClass: _class,
      objectSpace: space
    }
    await storage.tx(tx)
  }

  return result
}

/**
 * Will create a transaction to create a docuemnt.
 * @public
 */
export function newTxCreateDoc<T extends Doc> (
  user: Ref<Account>,
  _class: Ref<Class<T>>,
  space: Ref<Space>,
  attributes: Data<T>,
  objectId?: Ref<T>,
  userTxSpace?: boolean
): TxCreateDoc<T> {
  return {
    sid: 0, // <-- Will be updated on server
    _id: generateId(),
    _class: core.class.TxCreateDoc,
    space: txSpace(user, userTxSpace),
    modifiedBy: user,
    modifiedOn: Date.now(), // <-- Will be updated on server
    createOn: Date.now(), // <-- Will be updated on server
    objectId: objectId ?? generateId(),
    objectClass: _class,
    objectSpace: space,
    attributes
  }
}

function txSpace (user: Ref<Account>, userTxSpace?: boolean): Ref<Space> {
  return userTxSpace ?? false ? ((core.space.Tx + '#' + user) as Ref<Space>) : core.space.Tx
}

/**
 * @public
 */
export function isEachArray<T> (push: T | EachArray<T>): push is EachArray<T> {
  if ((push as EachArray<T>).$each !== undefined) {
    return true
  }
  return false
}

/**
 * @public
 * Return storage with sid auto-updater and transactio time update.
 */
export function withSID (storage: Storage | undefined, lastSid = -1): (tx: Tx) => Promise<Tx> {
  // Last available sid
  const init =
    storage !== undefined
      ? storage.findAll<Tx>(core.class.Tx, { space: core.space.Tx }, { sort: { sid: -1 }, limit: 1 }).then((tx) => {
        lastSid = tx.shift()?.sid ?? -1
      })
      : Promise.resolve()

  return async (tx) => {
    await init
    tx.sid = ++lastSid

    tx.createOn = Date.now()
    tx.modifiedOn = Date.now()

    return tx
  }
}
