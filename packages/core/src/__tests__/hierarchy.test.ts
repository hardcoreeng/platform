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
import { Class, Doc, Obj, Ref } from '../classes'
import core from '../component'
import { Hierarchy } from '../hierarchy'
import { TxCreateDoc } from '../tx'
import { _genMinModel } from '../minmodel'

const txes = _genMinModel()

describe('hierarchy', () => {
  it('should build hierarchy', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const ancestors = hierarchy.getAncestors(core.class.TxCreateDoc)
    expect(ancestors).toContain(core.class.Tx)
  })

  it('isDerived', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const derived = hierarchy.isDerived(core.class.Space, core.class.Doc)
    expect(derived).toBeTruthy()
    const notDerived = hierarchy.isDerived(core.class.Space, core.class.Tx)
    expect(notDerived).not.toBeTruthy()
  })

  it('getClass', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const data = hierarchy.getClass(core.class.TxCreateDoc)
    expect(data).toMatchObject((txes.find((p) => p.objectId === core.class.TxCreateDoc) as TxCreateDoc<Doc>).attributes)
    const notExistClass = 'class:test.MyClass' as Ref<Class<Obj>>
    expect(() => hierarchy.getClass(notExistClass)).toThrowError('class not found: ' + notExistClass)
    expect(() => hierarchy.getAncestors(notExistClass)).toThrowError('ancestors not found: ' + notExistClass)
  })

  it('getDomain', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const txDomain = hierarchy.getDomain(core.class.TxCreateDoc)
    expect(txDomain).toBe('tx')
    const modelDomain = hierarchy.getDomain(core.class.Class)
    expect(modelDomain).toBe('model')
    const nestedDomain = hierarchy.getDomain(core.class.Title)
    expect(nestedDomain).toBe('model')
  })

  it('getDescendants', async () => {
    const hierarchy = new Hierarchy()
    for (const tx of txes) hierarchy.tx(tx)
    const tx = hierarchy.getDescendants(core.class.Tx)
    expect(tx.length).toBe(4)
    const notExistClass = 'class:test.MyClass' as Ref<Class<Obj>>
    expect(() => hierarchy.getDescendants(notExistClass)).toThrowError('descendants not found: ' + notExistClass)
  })
})
