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

import type { ChunterService } from '@anticrm/chunter'
import { setResource } from '@anticrm/platform'

import CreateChannel from './components/CreateChannel.svelte'
import ChannelView from './components/ChannelView.svelte'
import ThreadsView from './components/ThreadsView.svelte'
import chunter from './plugin'

export default async (): Promise<ChunterService> => {
  setResource(chunter.component.CreateChannel, CreateChannel)
  setResource(chunter.component.ChannelView, ChannelView)
  setResource(chunter.component.ThreadsView, ThreadsView)

  return {}
}
