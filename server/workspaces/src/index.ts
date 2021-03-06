import core, { DOMAIN_TX, generateModelDiff, Tx, txObjectClass, withSID } from '@anticrm/core'
import { getMongoClient, mongoEscape, mongoUnescape } from '@anticrm/mongo'

/**
 * Workspace connection options.
 * @public
 */
export interface WorkspaceOptions {
  mongoDBUri: string // Mongo DB URI.
  mongoOptions?: any // Any other mongo options, should be compatible with @{link MongoClientOptions}
  txes: Tx[] // An initial set of transactions to initialize/upgrade workspace
}

/**
 * Create workspace and put all model transactions inside it.
 * @public
 */
export async function createWorkspace (workspaceId: string, options: WorkspaceOptions): Promise<void> {
  const client = await getMongoClient(options.mongoDBUri, options.mongoOptions)

  const db = client.db('ws-' + workspaceId)
  const collections = await db.collections()
  if (collections.length > 0) {
    throw Error('workspace already exists')
  }

  const sidTx = withSID(undefined, -1)
  const txes = db.collection(DOMAIN_TX as string)
  for (const tx of options.txes) {
    await txes.insertOne(mongoEscape(await sidTx(tx)))
  }
}

/**
 * Upgrade workspace and put all model transactions into it.
 * @public
 */
export async function upgradeWorkspace (workspaceId: string, options: WorkspaceOptions): Promise<void> {
  const client = await getMongoClient(options.mongoDBUri, options.mongoOptions)

  const db = client.db('ws-' + workspaceId)
  const txes = db.collection(DOMAIN_TX as string)

  // Find all system transactions.
  const existingTxes = await txes.find({ objectSpace: core.space.Model, modifiedBy: core.account.System }).toArray()

  const lastSID = (await txes.find<Tx>({}, { limit: 1, sort: { sid: -1 } }).toArray())[0]?.sid ?? -1
  const sidTx = withSID(undefined, lastSID)

  const { diffTx, dropTx } = await generateModelDiff(
    existingTxes.map((t) => mongoUnescape(t)),
    options.txes
  )

  // Drop broken transactions.
  for (const dtx of dropTx) {
    await txes.deleteOne({ _id: dtx._id })
  }

  for (const tx of diffTx) {
    console.info('updating:', txObjectClass(tx) ?? tx.objectId, JSON.stringify(tx, undefined, 2))
    await txes.insertOne(mongoEscape(await sidTx(tx)))
  }
}

/**
 * Completely remove workspace from DB.
 * @public
 */
export async function deleteWorkspace (workspaceId: string, options: WorkspaceOptions): Promise<void> {
  const client = await getMongoClient(options.mongoDBUri, options.mongoOptions)

  const db = client.db('ws-' + workspaceId)
  await db.dropDatabase().catch((err) => console.error(err))
}

// This need this export to not hang on jest tests
// @public
export { shutdown } from '@anticrm/mongo'
