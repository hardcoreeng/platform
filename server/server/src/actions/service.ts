import {
  Account,
  Class,
  Doc,
  DocumentQuery,
  FindOptions,
  FindResult,
  generateId,
  Ref,
  Space,
  Tx,
  TxCreateDoc,
  TxUpdateDoc
} from '@anticrm/core'
import core from '@anticrm/core'
import { TxCallback, TxFilter } from '@anticrm/action'
import plugin, { ActionInstance, ExecutionContext as CompleteExecutionContext } from '@anticrm/action-plugin'

type ExecutionContext = Omit<CompleteExecutionContext, keyof Doc>
export const updateTx = <T extends Doc>(data: {
  id: Ref<T>
  clazz: Ref<Class<T>>
  space: Ref<Space>
  ops: TxUpdateDoc<T>['operations']
  account?: Ref<Account>
}): TxUpdateDoc<T> => {
  const date = Date.now()

  return {
    sid: 0,
    _id: generateId(),
    _class: core.class.TxUpdateDoc,
    modifiedBy: data.account ?? core.account.System,
    modifiedOn: date,
    createOn: date,
    space: core.space.Tx,
    objectId: data.id,
    objectSpace: data.space,
    objectClass: data.clazz,
    operations: data.ops
  }
}

const createTx = <T extends Doc>(data: {
  id?: Ref<T>
  clazz: Ref<Class<T>>
  space: Ref<Space>
  attributes: TxCreateDoc<T>['attributes']
  account?: Ref<Account>
}): TxCreateDoc<T> => {
  const date = Date.now()

  return {
    sid: 0,
    _id: generateId(),
    _class: core.class.TxCreateDoc,
    modifiedBy: data.account ?? core.account.System,
    modifiedOn: date,
    createOn: date,
    space: core.space.Tx,
    objectId: data.id ?? generateId(),
    objectSpace: data.space,
    objectClass: data.clazz,
    attributes: data.attributes
  }
}

export type PureActionInst = Omit<ActionInstance, keyof Doc>
export class Service {
  private txQueue: Tx[] = []

  constructor (
    private readonly tx: (tx: Tx<Doc>) => Promise<void>,
    private readonly space: Ref<Space>,
    public readonly findAll: <T extends Doc>(
      _class: Ref<Class<T>>,
      query: DocumentQuery<T>,
      options?: FindOptions<T>
    ) => Promise<FindResult<T>>,
    public readonly subscribe: (filter: TxFilter, cb: TxCallback) => () => void,
    private readonly stateID: Ref<CompleteExecutionContext>
  ) {}

  create<T extends Doc>(data: {
    id?: Ref<T>
    clazz: Ref<Class<T>>
    space: Ref<Space>
    attributes: TxCreateDoc<T>['attributes']
    account?: Ref<Account>
  }): void {
    this.txQueue.push(createTx(data))
  }

  update<T extends Doc>(data: {
    id: Ref<T>
    clazz: Ref<Class<T>>
    space: Ref<Space>
    ops: TxUpdateDoc<T>['operations']
    account?: Ref<Account>
  }): void {
    this.txQueue.push(updateTx(data))
  }

  async commit (): Promise<void> {
    try {
      for (const tx of this.txQueue) {
        await this.tx(tx)
      }
    } finally {
      this.txQueue = []
    }
  }

  async saveContext (ctx: ExecutionContext): Promise<void> {
    await this.tx(
      updateTx({
        id: this.stateID,
        space: this.space,
        clazz: plugin.class.ExecutionContext,
        ops: {
          stack: ctx.stack,
          counter: ctx.counter
        }
      })
    )
  }
}
