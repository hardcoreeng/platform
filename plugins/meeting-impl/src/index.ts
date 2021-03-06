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

import type { MeetingService } from '@anticrm/meeting'
import { getMetadata, setResource } from '@anticrm/platform'
import { Client, Peer as RawPeer } from '@anticrm/webrtc'
import meeting from '@anticrm/meeting'

import CreateRoom from './components/CreateRoom.svelte'
import App from './components/App.svelte'

import { RoomMgr } from './room/room.mgr'

export interface Peer extends RawPeer {
  peer: RTCPeerConnection
  media: MediaStream
  isMediaReady: boolean
  owner?: string
}

export default async (): Promise<MeetingService> => {
  setResource(meeting.component.CreateRoom, CreateRoom)
  setResource(meeting.component.WorkspaceComponent, App)

  return {}
}

export const createRoomMgr = (): RoomMgr => {
  const token: string = getMetadata(meeting.metadata.Token) ?? ''
  const meetingUrl: string = getMetadata(meeting.metadata.ClientUrl) ?? 'localhost:18081'
  return new RoomMgr(new Client(`wss://${meetingUrl}/${token}`))
}
