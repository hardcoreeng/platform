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

import { Class, Doc, DocumentQuery, Hierarchy, likeSymbol, Obj, Ref, Tx, QuerySelector } from '@anticrm/core'
import { FilterQuery } from 'mongodb'
import copy from 'fast-copy'

export function toMongoIdQuery (tx: Tx): FilterQuery<Doc> {
  return {
    _id: tx.objectId,
    space: tx.objectSpace
  }
}

/**
 * Creates a query with filled class properly set.
 **
 * @param objectClass - a class query is designed for.
 * @param query - a query object to convert to.
 */
export function toMongoQuery<T extends Doc> (
  hierarchy: Hierarchy,
  objectClass: Ref<Class<T>>,
  query: DocumentQuery<T>
): FilterQuery<T> {
  const mongoQuery: FilterQuery<Doc> = copy(query as FilterQuery<Doc>)
  for (const key in query) {
    const value = query[key]
    if (typeof value !== 'object') continue
    if (key === '$or') {
      mongoQuery[key] = (value as Array<DocumentQuery<T>>).map((t) => toMongoQuery(hierarchy, objectClass, t))
    } else {
      mongoQuery[key] = translateQuery(value)
    }
  }

  mongoQuery._class = objectClass
  const classes: Ref<Class<Obj>>[] = [objectClass]

  const byClass = hierarchy.getDescendants(objectClass)
  // We need find for all classes extending our own.
  classes.push(...byClass.filter((c) => c !== objectClass))

  // Find by all classes.
  if (classes.length > 1) {
    mongoQuery._class = { $in: classes.map((cl) => cl) }
  }

  return mongoQuery
}

function translateQuery<P extends keyof T, T extends Doc> (value: QuerySelector<P>): any {
  const { $like, ...data } = value
  const result = data as any
  if ($like !== undefined) {
    const searchString = $like.split(likeSymbol).join('.*')
    const regex = RegExp(`^${searchString}$`)
    result.$regex = regex
  }
  return result
}
