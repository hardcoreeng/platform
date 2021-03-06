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

import type { Class, Doc, FullRef, FullRefString, Ref } from './classes'

function toHex (value: number, chars: number): string {
  const result = value.toString(16)
  if (result.length < chars) {
    return '0'.repeat(chars - result.length) + result
  }
  return result
}

let counter = (Math.random() * (1 << 24)) | 0
const random = toHex((Math.random() * (1 << 24)) | 0, 6) + toHex((Math.random() * (1 << 16)) | 0, 4)

function timestamp (): string {
  const time = (Date.now() / 1000) | 0
  return toHex(time, 8)
}

function count (): string {
  const val = counter++ & 0xffffff
  return toHex(val, 6)
}

/**
 * @public
 */
export function generateId<T extends Doc> (): Ref<T> {
  return (timestamp() + random + count()) as Ref<T>
}

/**
 * @public
 */
export function getFullRef<T extends Doc> (_id: Ref<T>, _class: Ref<Class<T>>): FullRefString {
  return JSON.stringify({ _id, _class })
}

/**
 * @public
 */
export function parseFullRef<T extends Doc> (fullRef: FullRefString): FullRef<T> {
  return JSON.parse(fullRef)
}

/**
 * @public
 */

export class DeferredPromise<T> {
  promise: Promise<T>
  resolve!: (value: T) => void
  reject!: (reason?: any) => void
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
