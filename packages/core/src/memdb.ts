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

import { PlatformError, Severity, Status } from '@anticrm/status'
import type { Class, Collection, Doc, Emb, PrimitiveType, Ref } from './classes'
import core from './component'
import type { Hierarchy } from './hierarchy'
import { DocumentQuery, Storage } from './storage'
import { Tx, TxAddCollection, TxCreateDoc, TxProcessor } from './tx'
import { generateId, makeEmb } from './utils'

function findProperty (objects: Doc[], propertyKey: string, value: PrimitiveType): Doc[] {
  const result: Doc[] = []
  for (const object of objects) {
    if ((object as any)[propertyKey] === value) {
      result.push(object)
    }
  }
  return result
}

class MemDb {
  private readonly hierarchy: Hierarchy
  private readonly objectsByClass = new Map<Ref<Class<Doc>>, Doc[]>()
  private readonly objectById = new Map<Ref<Doc>, Doc>()

  constructor (hierarchy: Hierarchy) {
    this.hierarchy = hierarchy
  }

  private getObjectsByClass (_class: Ref<Class<Doc>>): Doc[] {
    const result = this.objectsByClass.get(_class)
    if (result === undefined) {
      const result: Doc[] = []
      this.objectsByClass.set(_class, result)
      return result
    }
    return result
  }

  getCollection (_id: Ref<Doc>, collection: string): Collection<Emb> {
    const doc = this.objectById.get(_id)
    if (doc === undefined) {
      throw new PlatformError(new Status(Severity.ERROR, core.status.ObjectNotFound, { _id }))
    }
    const result = (doc as any)[collection]
    if (result === undefined) {
      const result = {} as Collection<Emb> // eslint-disable-line @typescript-eslint/consistent-type-assertions
      ;(doc as any)[collection] = result
      return result
    }
    return result
  }

  async findAll<T extends Doc>(_class: Ref<Class<T>>, query: DocumentQuery<T>): Promise<T[]> {
    let result: Doc[]
    if (Object.prototype.hasOwnProperty.call(query, '_id')) {
      if (query._id === undefined) {
        result = []
      } else {
        const obj = this.objectById.get(query._id)
        result = obj !== undefined ? [obj] : []
      }
    } else {
      result = this.getObjectsByClass(_class)
    }

    for (const key in query) {
      if (key === '_id') continue
      const value = (query as any)[key]
      result = findProperty(result, key, value)
    }
    return [...result] as T[]
  }

  addDoc (doc: Doc): void {
    this.hierarchy.getAncestors(doc._class).forEach((_class) => {
      this.getObjectsByClass(_class).push(doc)
    })
    this.objectById.set(doc._id, doc)
  }
}

/**
 * Hold transactions
 */
export class TxDb extends MemDb implements Storage {
  async tx (tx: Tx): Promise<void> {
    this.addDoc(tx)
  }
}

/**
 * Hold model objects and classes
 */
export class ModelDb extends TxProcessor implements Storage {
  private readonly db: MemDb

  constructor (hierarchy: Hierarchy) {
    super()
    this.db = new MemDb(hierarchy)
  }

  async findAll<T extends Doc>(_class: Ref<Class<T>>, query: DocumentQuery<T>): Promise<T[]> {
    return await this.db.findAll<T>(_class, query)
  }

  protected async txCreateDoc (tx: TxCreateDoc<Doc>): Promise<void> {
    this.db.addDoc(TxProcessor.createDoc2Doc(tx))
  }

  protected async txAddCollection (tx: TxAddCollection<Doc, Emb>): Promise<void> {
    ;(this.db.getCollection(tx.objectId, tx.collection) as any)[tx.localId ?? generateId()] = makeEmb(
      tx.itemClass,
      tx.attributes
    )
  }
}
