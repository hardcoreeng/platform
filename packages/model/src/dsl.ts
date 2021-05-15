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

import type {
  Ref,
  Doc,
  Type,
  PropertyType,
  Attribute,
  Tx,
  Class,
  Obj,
  TxAddCollection,
  TxCreateObject
} from '@anticrm/core'
import { ClassifierKind, generateId, makeEmb } from '@anticrm/core'

import core from './component'

type NoIDs<T extends Tx> = Omit<T, '_id' | 'objectId'>

interface ClassTxes {
  _id: Ref<Doc>
  extends: Ref<Class<Obj>>
  txes: NoIDs<Tx>[]
}

const transactions = new Map<any, ClassTxes>()

function getTxes (target: any): ClassTxes {
  const txes = transactions.get(target)
  if (txes === undefined) {
    const txes = { txes: [] } as unknown as ClassTxes
    transactions.set(target, txes)
    return txes
  }
  return txes
}

export function Prop (type: Type<PropertyType>) {
  return function (target: any, propertyKey: string): void {
    const txes = getTxes(target)
    const tx: NoIDs<TxAddCollection<Attribute<PropertyType>>> = {
      _class: core.class.TxAddCollection,
      domain: 'tx',
      collection: 'attributes',
      localId: propertyKey,
      attributes: makeEmb(core.class.Attribute, { type })
    }
    txes.txes.push(tx)
  }
}

export function Model<T extends Obj> (
  _class: Ref<Class<T>>,
  _extends: Ref<Class<Obj>>
) {
  return function classDecorator<C extends new () => T> (constructor: C): void {
    const txes = getTxes(constructor.prototype)
    txes._id = _class
    txes.extends = _extends
  }
}

function generateIds (objectId: Ref<Doc>, txes: NoIDs<Tx>[]): Tx[] {
  return txes.map((tx) => ({
    _id: generateId(),
    objectId,
    ...tx
  }))
}

function _generateTx (candidate: ClassTxes, txes: ClassTxes[]): Tx[] {
  let prepend: Tx[] = []
  for (let i = 0; i < txes.length; i++) {
    if (txes[i]._id === candidate.extends) {
      const newCandiate = txes.splice(i)
      prepend = _generateTx(newCandiate[0], txes)
      break
    }
  }
  const objectId = candidate._id
  const createTx: TxCreateObject<Class<Obj>> = {
    _id: generateId(),
    _class: core.class.TxCreateObject,
    domain: 'tx',
    objectId,
    objectClass: core.class.Class,
    attributes: {
      domain: 'model',
      kind: ClassifierKind.CLASS,
      extends: candidate.extends
    }
  }
  const all = [...prepend, createTx, ...generateIds(objectId, candidate.txes)]
  const newCandiate = txes.pop()
  return newCandiate != null
    ? [...all, ..._generateTx(newCandiate, txes)]
    : all
}

export function generateTx (...classes: Array<new () => Obj>): Tx[] {
  const txes = classes.map((ctor) => getTxes(ctor.prototype))
  const candidate = txes.pop()
  return candidate !== undefined ? _generateTx(candidate, txes) : []
}

// T Y P E S

export function TypeString (): Type<string> {
  return makeEmb(core.class.TypeString, {})
}
