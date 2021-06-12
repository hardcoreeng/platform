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

import type { Component, StatusCode } from '@anticrm/status'
import { component } from '@anticrm/status'
import type { Class, Doc, Emb, Obj, Ref, Space, Account } from './classes'
import type { Tx, TxAddCollection, TxCreateDoc, TxUpdateCollection, TxUpdateDoc } from './tx'

const ComponentCore = 'core' as Component

export default component(ComponentCore, {
  class: {
    Obj: '' as Ref<Class<Obj>>,
    Doc: '' as Ref<Class<Doc>>,
    Class: '' as Ref<Class<Class<Obj>>>,
    Tx: '' as Ref<Class<Tx>>,
    TxCreateDoc: '' as Ref<Class<TxCreateDoc<Doc>>>,
    TxUpdateDoc: '' as Ref<Class<TxUpdateDoc<Doc>>>,
    TxAddCollection: '' as Ref<Class<TxAddCollection<Doc, Emb>>>,
    TxUpdateCollection: '' as Ref<Class<TxUpdateCollection<Doc, Emb>>>,
    Space: '' as Ref<Class<Space>>
  },
  space: {
    Tx: '' as Ref<Space>,
    Model: '' as Ref<Space>
  },
  account: {
    System: '' as Ref<Account>
  },
  status: {
    ObjectNotFound: '' as StatusCode<{ _id: Ref<Doc> }>,
    ItemNotFound: '' as StatusCode<{ _id: Ref<Doc>, _localId: string }>
  }
})
