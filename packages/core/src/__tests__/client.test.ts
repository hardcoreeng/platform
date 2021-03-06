//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2021 Hardcore Engineering, Inc.
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

import { Doc, Ref, Space } from '../classes'
import { createClient } from '../client'
import core from '../component'
import { DerivedData, DerivedDataDescriptor } from '../derived'
import { withOperations } from '../tx'
import { connect } from './connection'

describe('client', () => {
  it('client', async () => {
    const klass = core.class.Space
    const baseClient = await createClient(connect)
    try {
      const accountId = await baseClient.accountId()
      expect(accountId).toEqual(core.account.System)
      const client = withOperations(core.account.System, baseClient)
      const result = await client.findAll(klass, {})
      let expectedCount = 2
      expect(result).toHaveLength(expectedCount)

      await client.createDoc<Space>(klass, core.space.Model, {
        private: false,
        name: 'NewSpace',
        description: '',
        members: []
      })
      const result2 = await client.findAll(klass, {})
      expect(result2).toHaveLength(++expectedCount)

      await client.createDoc(klass, core.space.Model, {
        private: false,
        name: 'NewSpace',
        description: '',
        members: []
      })
      const result3 = await client.findAll(klass, {})
      expect(result3).toHaveLength(++expectedCount)

      await client.createDoc(core.class.Reference, result3[0]._id, {
        objectClass: core.class.Reference,
        objectId: '' as Ref<Doc>,
        descriptorId: '' as Ref<DerivedDataDescriptor<Doc, DerivedData>>,
        link: 'link-text'
      })
      const res = await client.findAll(core.class.Reference, {})
      expect(res).toHaveLength(1)

      const derived = client.isDerived(core.class.Space, core.class.Doc)
      expect(derived).toBeTruthy()
      const notDerived = client.isDerived(core.class.Space, core.class.Tx)
      expect(notDerived).not.toBeTruthy()
    } finally {
      await baseClient.close()
    }
  })
})
