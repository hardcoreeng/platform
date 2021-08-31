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

import type { CalendarService } from '@anticrm/calendar'
import plugin from '@anticrm/calendar'
import { setResource } from '@anticrm/platform'

import Workspace from './components/Workspace.svelte'
import CreateCalendar from './components/CreateCalendar.svelte'
import CreateEvent from './components/CreateEvent.svelte'

export default async (): Promise<CalendarService> => {
  setResource(plugin.component.Workspace, Workspace)
  setResource(plugin.component.CreateCalendar, CreateCalendar)
  setResource(plugin.component.CreateEvent, CreateEvent)

  return {}
}
