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

import type { TxOperations } from '@anticrm/core'
import core, { createClient, withOperations } from '@anticrm/core'
import { LiveQuery } from '@anticrm/query'
import type { CoreService, Client } from '@anticrm/plugin-core'

import { connect } from './connection'

/*!
 * Anticrm Platform™ Workbench Plugin
 * © 2020 Anticrm Platform Contributors. All Rights Reserved.
 * Licensed under the Eclipse Public License, Version 2.0
 */
export default async (): Promise<CoreService> => {
  let client: (Client & TxOperations) | undefined

  async function getClient (): Promise<Client & TxOperations> {
    if (client === undefined) {
      const storage = await createClient(connect)
      client = withOperations(core.account.System, new LiveQuery(storage))
    }
    return client
  }

  return {
    getClient
  }
}
