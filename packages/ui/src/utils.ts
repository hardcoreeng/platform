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

import type { Metadata } from '@anticrm/platform'
import type { AnyComponent } from '@anticrm/status'

// R O U T E R  M E T A D A T A  K E Y S

export function applicationShortcutKey (shortcut: string): Metadata<AnyComponent> {
  return ('shortcut:ui.' + shortcut) as Metadata<AnyComponent>
}
export function defaultApplicationShortcutKey (): Metadata<string> {
  return 'shortcut:default.ui' as Metadata<string>
}
