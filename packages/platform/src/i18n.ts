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

import { Component, Status, Severity, unknownError, parseId } from '@anticrm/status'
import type { IntlString } from '@anticrm/status'
import { setPlatformStatus } from './event'
import { IntlMessageFormat } from 'intl-messageformat'

import platform from './component'

export type { IntlString }

/**
 * @public
 */
export type Loader = (locale: string) => Promise<Record<string, string | Record<string, string>>>

/**
 * @public
 */
export type Messages = Record<string, IntlString | Record<string, IntlString>>

const locale = 'en'

const loaders = new Map<Component, Loader>()
const translations = new Map<Component, Messages | Status>()
const cache = new Map<IntlString, IntlMessageFormat | Status>()

/**
 * @public
 */
export function addStringsLoader (component: Component, loader: Loader): void {
  loaders.set(component, loader)
}

async function loadTranslationsForComponent (component: Component): Promise<Messages | Status> {
  const loader = loaders.get(component)
  if (loader === undefined) {
    const status = new Status(Severity.ERROR, platform.status.NoLoaderForStrings, { component })
    await setPlatformStatus(status)
    return status
  }
  try {
    return (await loader(locale)) as Record<string, IntlString> | Status
  } catch (err: any) {
    const status = unknownError(err)
    await setPlatformStatus(status)
    return status
  }
}

async function getTranslation (message: IntlString): Promise<IntlString | Status> {
  try {
    const id = parseId(message)
    let messages = translations.get(id.component)
    if (messages === undefined) {
      messages = await loadTranslationsForComponent(id.component)
      translations.set(id.component, messages)
    }
    if (messages instanceof Status) {
      return messages
    }
    return (
      (id.kind !== undefined
        ? (messages[id.kind] as Record<string, IntlString>)?.[id.name]
        : (messages[id.name] as IntlString)) ?? message
    )
  } catch (err: any) {
    const status = unknownError(err)
    await setPlatformStatus(status)
    return status
  }
}

/**
 * @public
 */
export async function translate<P extends Record<string, any>> (message: IntlString<P>, params: P): Promise<string> {
  const compiled = cache.get(message)
  if (compiled !== undefined) {
    if (compiled instanceof Status) {
      return message
    }
    return compiled.format(params)
  } else {
    const translation = await getTranslation(message)
    if (translation instanceof Status) {
      cache.set(message, translation)
      return message
    }
    const compiled = new IntlMessageFormat(translation, locale)
    cache.set(message, compiled)
    return compiled.format(params)
  }
}
