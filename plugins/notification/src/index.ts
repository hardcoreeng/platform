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
import type { Ref, Class, Doc, Space, Account, Tx, DocumentMapper, DerivedData } from '@anticrm/core'
import type { IntlString, Plugin, Service } from '@anticrm/platform'
import type { Resource } from '@anticrm/status'
import { plugin } from '@anticrm/platform'

export interface Subscribe<T extends Doc> extends Doc {
  objectId: Ref<T>
  objectClass: Ref<Class<T>>
  clients: Array<Ref<Account>>
}

export interface Notification extends DerivedData {
  client: Ref<Account>
  tx: Ref<Tx>
}

export interface WithNotifications {
  notifications: Notification[]
}

export interface NotificationService extends Service {
  subscribe: <T extends Doc>(_class: Ref<Class<T>>, space: Ref<Space>, objectId: Ref<T>) => Promise<void>

  unsubscribe: <T extends Doc>(_class: Ref<Class<T>>, space: Ref<Space>, objectId: Ref<T>) => Promise<void>

  getSubscibeStatus: <T extends Doc>(_class: Ref<Class<T>>, space: Ref<Space>, objectId: Ref<T>) => Promise<boolean>
}

const PluginNotification = 'notification' as Plugin<NotificationService>

const notification = plugin(
  PluginNotification,
  {},
  {
    class: {
      Notification: '' as Ref<Class<Notification>>,
      Subscribe: '' as Ref<Class<Subscribe<Doc>>>
    },
    string: {
      Subscribe: '' as IntlString,
      Unsubscribe: '' as IntlString
    },
    mapper: {
      NotificationMapper: '' as Resource<DocumentMapper>
    }
  }
)

export default notification
