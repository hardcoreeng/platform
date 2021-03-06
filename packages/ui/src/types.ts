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

import type { Asset, IntlString, UIComponent } from '@anticrm/status'

export type { Asset }

export const CONTEXT_PLATFORM = 'platform'
export const CONTEXT_PLATFORM_UI = 'platform-ui'

export interface Document {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * Allow to control currently selected document.
 */
export interface DocumentProvider {
  /**
   * Opening a document
   * */
  open: (doc: Document) => Promise<void>

  /**
   * Return currently selected document, if one.
   */
  selection: () => Document | undefined
}

export interface Action {
  label: IntlString
  icon: Asset | UIComponent
  action: (ev?: Event) => Promise<void>
}

export interface IPopupItem {
  _id?: number
  title?: IntlString
  component?: UIComponent
  props?: Object
  selected?: boolean
  action?: Function
  onDeselect?: Function
  matcher?: (search: string) => boolean
}

export type PopupAlignment = HTMLElement | 'right' | 'float' | 'full'

export type TooltipAligment = 'top' | 'bottom' | 'left' | 'right'

export interface LabelAndProps {
  label: IntlString | undefined
  element: HTMLElement | undefined
  direction?: TooltipAligment
  component?: UIComponent
  props?: any
  onClose?: (result?: any) => void
}

export interface CheckListItem {
  id: string
  description: string
  done: boolean
}

export interface CompletionItem {
  key: string
  completion: string
  label: string
  title?: string
}

export interface CompletionPopupActions {
  handleUp: () => void
  handleDown: () => void
  handleSubmit: () => void
}

export interface ItemRefefence {
  id: string
  class: string
}

export interface IconGroupItem {
  tooltip: IntlString
  icon: UIComponent
  id: string
}

export interface ExtendedCompletionItem extends CompletionItem, ItemRefefence {}

export interface DropdownItem {
  id: string
  label: IntlString | string
}

export interface Person {
  firstName?: string
  lastName?: string
  avatar?: string
}

export interface KanbanState {
  _id: string
  name: IntlString | string
  color?: string
}

export interface KanbanItem {
  _id: string
  state: string
}
