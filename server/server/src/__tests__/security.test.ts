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

import core, {
  Class,
  ClassifierKind,
  Doc,
  Domain,
  generateId,
  Hierarchy,
  ModelDb,
  Ref,
  Space,
  Storage,
  Tx,
  TxCreateDoc,
  TxUpdateDoc
} from '@anticrm/core'
import builder from '@anticrm/model-all'
import { ClientInfo, SecurityClientStorage, SecurityModel } from '../security'

const txes = builder.getTxes()
const user: ClientInfo = {
  clientId: '',
  accountId: core.account.System,
  workspaceId: 'string',
  tx: (tx: Tx) => {}
}

describe('security', () => {
  let db: Storage
  let model: ModelDb
  let hierarchy: Hierarchy
  let securityStorage: SecurityClientStorage
  let security: SecurityModel
  async function initDb (): Promise<void> {
    const objectClassTx: TxCreateDoc<Doc> = {
      objectId: 'task' as Ref<Class<Doc>>,
      objectSpace: core.space.Model,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxCreateDoc,
      objectClass: core.class.Class,
      attributes: {
        domain: 'task' as Domain,
        kind: ClassifierKind.CLASS,
        extends: core.class.Doc
      }
    }

    hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    hierarchy.tx(objectClassTx)
    db = new ModelDb(hierarchy)
    model = new ModelDb(hierarchy)
    security = await SecurityModel.create(hierarchy, model)
    for (const tx of txes) await security.tx(tx)
    await security.tx(objectClassTx)
    securityStorage = new SecurityClientStorage(
      security,
      {
        findAll: async (_class, query) => await db.findAll(_class, query),
        tx: async (tx) => {
          hierarchy.tx(tx)
          await db.tx(tx)
          await security.tx(tx)
        }
      },
      hierarchy,
      user,
      new Map<string, ClientInfo>()
    )
  }

  beforeAll(async () => {
    return await initDb()
  })

  it('object visibility, the object must be visible in user spaces', async () => {
    expect.assertions(5)

    const spaceTx: TxCreateDoc<Space> = {
      objectId: generateId(),
      objectSpace: core.space.Model,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxCreateDoc,
      objectClass: core.class.Space,
      attributes: {
        name: 'test',
        description: 'test public Space',
        private: true,
        members: []
      }
    }
    await securityStorage.tx(spaceTx)

    const objectTx: TxCreateDoc<Doc> = {
      objectId: generateId(),
      objectSpace: spaceTx.objectId,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxCreateDoc,
      objectClass: 'task' as Ref<Class<Doc>>,
      attributes: {}
    }

    await db.tx(objectTx) // add object ignore security

    const first = await securityStorage.findAll('task' as Ref<Class<Doc>>, {})
    expect(first).toHaveLength(0)

    await securityStorage.findAll('task' as Ref<Class<Doc>>, { space: objectTx.objectSpace }).catch((error: Error) => {
      expect(error.message).toBe('ERROR: security.AccessDenied')
    })

    await securityStorage
      .findAll('task' as Ref<Class<Doc>>, { space: { $in: [objectTx.objectSpace] } })
      .catch((error: Error) => {
        expect(error.message).toBe('ERROR: security.AccessDenied')
      })

    const addMemberTx: TxUpdateDoc<Space> = {
      objectId: spaceTx.objectId,
      objectSpace: core.space.Model,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxUpdateDoc,
      objectClass: core.class.Space,
      operations: {
        $push: { members: user.accountId }
      }
    }

    await securityStorage.tx(addMemberTx)

    const third = await securityStorage.findAll('task' as Ref<Class<Doc>>, { space: objectTx.objectSpace })
    expect(third).toHaveLength(1)

    const last = await securityStorage.findAll('task' as Ref<Class<Doc>>, {})
    expect(last).toHaveLength(1)
  })

  it('tx', async () => {
    expect.assertions(2)

    const spaceTx: TxCreateDoc<Space> = {
      objectId: generateId(),
      objectSpace: core.space.Model,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxCreateDoc,
      objectClass: core.class.Space,
      attributes: {
        name: 'test',
        description: 'test public Space',
        private: false,
        members: []
      }
    }
    await securityStorage.tx(spaceTx)

    const objectTx: TxCreateDoc<Doc> = {
      objectId: generateId(),
      objectSpace: spaceTx.objectId,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxCreateDoc,
      objectClass: 'task' as Ref<Class<Doc>>,
      attributes: {}
    }

    await securityStorage.tx(objectTx).catch((error: Error) => {
      expect(error.message).toBe('ERROR: security.AccessDenied')
    })

    const addMemberTx: TxUpdateDoc<Space> = {
      objectId: spaceTx.objectId,
      objectSpace: core.space.Model,
      _id: generateId(),
      space: core.space.Tx,
      modifiedBy: user.accountId,
      modifiedOn: Date.now(),
      _class: core.class.TxUpdateDoc,
      objectClass: core.class.Space,
      operations: { $push: { members: user.accountId } }
    }

    await securityStorage.tx(addMemberTx)
    await securityStorage.tx(objectTx)
    expect(true).toBeTruthy()
  })
})
