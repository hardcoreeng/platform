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

import type { Tx } from '../tx'
import { Hierarchy } from '../hierarchy'
import { EsDb } from '../esdb'
import core from '../component'
import { Domain } from '../classes'

describe('hierarchy', () => {

  it('should query model with params', async () => {
    const txes = ((await import('./core.tx.json')) as any).default as Tx[]
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const model = new EsDb(hierarchy)
    for (const tx of txes) await model.tx(tx)
    const first = await model.findAll(core.class.Class, { _id: txes[0].objectId, domain: "model" as Domain })
    expect(first.length).toBe(1)
    const result = await model.findAll(core.class.Class, { _id: txes[0].objectId, domain: "domain" as Domain})
    expect(result.length).toBe(0)
  })

})
