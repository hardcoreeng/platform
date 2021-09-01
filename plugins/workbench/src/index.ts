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

import type { Class, Doc, DocumentQuery, Ref, Space } from '@anticrm/core'
import { Plugin, plugin, Service } from '@anticrm/platform'
import type { PresentationClient } from '@anticrm/presentation'
import type { Asset, IntlString } from '@anticrm/status'
import type { AnyComponent, AnySvelteComponent } from '@anticrm/ui'
import { getContext } from 'svelte'
import { CompAndProps, store } from './stores'

/**
 * @public
 */
export interface Application extends Doc {
  label: IntlString
  icon: Asset
  navigatorModel?: NavigatorModel
}

/**
 * @public
 */
export interface SpacesNavModel {
  label: IntlString
  spaceIcon: Asset
  spaceClass: Ref<Class<Space>>
  spaceQuery?: DocumentQuery<Space>
  addSpaceLabel: IntlString
  createComponent?: AnyComponent
  component?: AnyComponent
  spaceItem?: AnyComponent // An component to display a space selectable item. param {space: Space}
  spaceHeader?: AnyComponent // An component to display a space header. param {space: Space}
  hideIfEmpty?: boolean // If defined and true, category will be not visible
}

/**
 * @public
 */
export interface SpecialNavModel {
  label: IntlString
  icon: Asset
  component: AnyComponent
}

/**
 * @public
 */
export interface NavigatorModel {
  navTitle?: IntlString // Navigator title, if applicable.
  specials?: SpecialNavModel[]
  spaces: SpacesNavModel[]
  spaceView: AnyComponent
  createComponent?: AnyComponent
  editComponent?: AnyComponent
}

/**
 * @public
 */
export interface WorkbenchService extends Service {}

const PluginWorkbench = 'workbench' as Plugin<WorkbenchService>

/**
 * @public
 */
const workbench = plugin(
  PluginWorkbench,
  {},
  {
    context: {
      Client: ''
    },
    class: {
      Application: '' as Ref<Class<Application>>
    },
    string: {
      Logout: '' as IntlString,
      Profile: '' as IntlString
    },
    icon: {
      Hashtag: '' as Asset,
      Lock: '' as Asset
    },
    component: {
      WorkbenchApp: '' as AnyComponent
    }
  }
)

/**
 * @public
 */
export function getClient (): PresentationClient {
  return getContext<PresentationClient>(workbench.context.Client)
}

/**
 * @public
 */
export function showModal (component: AnySvelteComponent | AnyComponent, props: any, element?: HTMLElement): void {
  store.set({ is: component, props, element: element })
}

/**
 * @public
 */
export function closeModal (): void {
  store.set({ is: undefined, props: {}, element: undefined })
}

/**
 * @public
 */
export { store, CompAndProps }

/**
 * @public
 */
export interface WorkbenchRoute {
  app?: Ref<Application>
  space?: Ref<Space>
  itemId?: Ref<Doc>
}

/**
 * @public
 */
export default workbench
