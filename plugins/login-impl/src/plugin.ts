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

import type { StatusCode, IntlString } from '@anticrm/status'
import { mergeIds } from '@anticrm/status'

import login from '@anticrm/login'

export default mergeIds(login, {
  status: {
    RequiredField: '' as StatusCode<{ field: string }>,
    ConnectingToServer: '' as StatusCode
  },
  string: {
    Email: '' as IntlString,
    Password: '' as IntlString,
    Password2: '' as IntlString,
    Workspace: '' as IntlString,
    LogIn: '' as IntlString,
    HaveAccount: '' as IntlString,
    SignUp: '' as IntlString,
    FirstName: '' as IntlString,
    LastName: '' as IntlString,
    PasswordMismatch: '' as IntlString
  }
})
