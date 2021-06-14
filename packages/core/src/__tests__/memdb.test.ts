//
// Copyright © 2020 Anticrm Platform Contributors.
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

import type { Ref, Class, Obj, Emb, Doc, Account } from '../classes'
import core from '../component'
import { Hierarchy } from '../hierarchy'
import { ModelDb, TxDb } from '../memdb'
import type { TxAddCollection } from '../tx'

import { describe, expect, it } from '@jest/globals'

import txes from './model.tx'

describe('memdb', () => {
  it('should save all tx', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const txDb = new TxDb(hierarchy)
    for (const tx of txes) await txDb.tx(tx)
    const result = await txDb.findAll(core.class.Tx, {})
    expect(result.length).toBe(
      txes.filter((tx) => tx._class === 'class:core.TxCreateDoc' || tx._class === 'class:core.TxAddCollection').length
    )
  })

  it('should query model', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) await hierarchy.tx(tx)
    const model = new ModelDb(hierarchy)
    for (const tx of txes) await model.tx(tx)
    const result = await model.findAll(core.class.Class, {})
    expect(result.length).toBe(11)
  })

  it('should query model with params', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const model = new ModelDb(hierarchy)
    for (const tx of txes) await model.tx(tx)
    const first = await model.findAll(core.class.Class, {
      _id: txes[1].objectId as Ref<Class<Obj>>,
      kind: 0
    })
    expect(first.length).toBe(1)
    const incorrectId = await model.findAll(core.class.Class, {
      _id: (txes[1].objectId + 'test') as Ref<Class<Obj>>
    })
    expect(incorrectId.length).toBe(0)
    const result = await model.findAll(core.class.Class, {
      _id: txes[1].objectId as Ref<Class<Obj>>,
      kind: 1
    })
    expect(result.length).toBe(0)
  })

  it('should throw error', async () => {
    expect.assertions(1)
    const errorTx: TxAddCollection<Doc, Emb> = {
      _id: '60b73133d22498e666800cd2' as Ref<TxAddCollection<Doc, Emb>>,
      _class: 'class:core.TxAddCollection' as Ref<Class<TxAddCollection<Doc, Emb>>>,
      space: core.space.Tx,
      modifiedBy: 'xxx' as Ref<Account>,
      modifiedOn: 0,
      objectId: 'class:test.MyClass' as Ref<Doc>,
      objectSpace: core.space.Model,
      itemClass: 'class:core.Attribute' as Ref<Class<Doc>>,
      collection: 'attributes',
      localId: 'name',
      attributes: {
        _class: 'class:core.Attribute' as Ref<Class<Doc>>,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        __embedded: {
          _class: 'class:core.Attribute' as Ref<Class<Doc>>
        } as Emb
      }
    }

    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const model = new ModelDb(hierarchy)

    await model.tx(errorTx).catch((error: Error) => {
      expect(error.message).toBe('ERROR: status:core.ObjectNotFound')
    })
  })
})
