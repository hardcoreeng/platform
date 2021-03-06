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

import type { Class, Data, Doc, DocumentQuery, Ref, Space } from '@anticrm/core'
import { Plugin, plugin, Service } from '@anticrm/platform'
import type { PresentationClient } from '@anticrm/presentation'
import type { AnyComponent, Asset, IntlString, UIComponent } from '@anticrm/status'
import { getContext } from 'svelte'
import { currentDocument, DocumentSelection } from './selection'
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
export interface SpacesNavModel<T extends Space = Space> {
  label: IntlString
  spaceIcon: Asset
  spaceClass: Ref<Class<T>>
  spaceQuery?: DocumentQuery<T>
  addSpaceLabel: IntlString
  createComponent?: AnyComponent
  component?: AnyComponent
  spaceItem?: AnyComponent // An component to display a space selectable item. param {space: Space}
  spaceHeader?: AnyComponent // An component to display a space header. param {space: Space}
  hideIfEmpty?: boolean // If defined and true, category will be not visible
  userSpace?: Data<T>
  item?: {
    createComponent?: AnyComponent
    createLabel?: IntlString
    editComponent?: AnyComponent
  }
  notification?: {
    spaceClass?: Ref<Class<Doc>>
    itemByIdClass?: Ref<Class<Doc>>
    itemByIdField?: string
  }
  // TODO: This one and `createComponent` item should be refactored to list of actions for item.
  showActions?: boolean // Show or not actions for specified nav model item.

  // If defined, will show tool and show following popup.
  spaceMore?: AnyComponent
}

/**
 * @public
 */
export interface SpecialNavModel {
  id: string // Uniq id
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
      Profile: '' as IntlString,
      Members: '' as IntlString,
      InviteMember: '' as IntlString
    },
    icon: {
      Hashtag: '' as Asset,
      Lock: '' as Asset,
      Members: '' as Asset
    },
    component: {
      WorkbenchApp: '' as AnyComponent,
      MembersSection: '' as AnyComponent
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
export function showModal (component: UIComponent | AnyComponent, props: any, element?: HTMLElement): void {
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
export { currentDocument, DocumentSelection }

/**
 * Will set current active document,
 * If undefined is passed no active document is selected.
 * @public
 */
export function showSideDocument (doc?: Pick<Doc, '_id' | '_class'>, shortId?: string | null): void {
  currentDocument.set(doc === undefined ? null : { document: doc, shortId })
}

/**
 * @public
 */
export interface WorkbenchRoute {
  app?: Ref<Application>
  space?: Ref<Space>

  // Browse define a document selection,
  // It could be TSK-101 - if short reference to document is exists
  // Or class:objectId if not.
  browse?: Ref<Doc> | string

  special?: string
}

/**
 * @public
 */
export default workbench
