import core, { Class, Doc, Ref, ShortRef } from '@anticrm/core'
import { PresentationClient } from '@anticrm/presentation'
import { ApplicationRouter } from '@anticrm/router'
import { DocumentSelection, showSideDocument, WorkbenchRoute } from '@anticrm/workbench'

function docRef (doc: DocumentSelection): string {
  return btoa(doc.document._id + '~' + doc.document._class)
}

export async function updateCurrentDocument (
  selectedDocument: DocumentSelection | undefined | null,
  client: PresentationClient,
  browse?: string
): Promise<void> {
  if (browse === undefined) {
    // No document selection is required.
    showSideDocument()
    return
  }
  // Check if we need update document on side
  if (selectedDocument != null && (selectedDocument.shortId === browse || docRef(selectedDocument) === browse)) {
    // Same document already selected.
    return
  }

  // New document selection

  // Check if we have short id reference.
  const shortIds = (
    await client.findAll<ShortRef>(core.class.ShortRef, { _id: browse as Ref<ShortRef> }, { limit: 1 })
  ).shift()
  let shortId: string | undefined
  let objectClass: Ref<Class<Doc>> | undefined
  let objectId: Ref<Doc> | undefined
  if (shortIds !== undefined) {
    shortId = shortIds._id as string
    objectClass = shortIds.objectClass
    objectId = shortIds.objectId
  } else {
    // Try extract information from browse
    try {
      const dref = atob(browse).split('~')
      if (dref.length === 2) {
        objectId = dref[0] as Ref<Doc>
        objectClass = dref[1] as Ref<Class<Doc>>
      }
    } catch (e) {
      console.log('could not decode browse', browse)
      // Ignore
    }
  }
  if (objectClass !== undefined && objectId !== undefined) {
    showSideDocument({ _id: objectId, _class: objectClass }, shortId)
  } else {
    showSideDocument()
  }
}

export async function handleCurrentDocumentChange (
  client: PresentationClient,
  value: DocumentSelection | undefined | null,
  router: ApplicationRouter<WorkbenchRoute>,
  currentRoute: WorkbenchRoute
): Promise<void> {
  if (value === null) {
    router.navigate({ browse: undefined })
    return
  }
  if (value === undefined) {
    return
  }

  // Handle document store updates, we need to update browse
  if (value.shortId != null && currentRoute.browse !== value.shortId) {
    router.navigate({ browse: value.shortId as unknown as string })
    return
  } else {
    if (value.shortId !== undefined && currentRoute.browse === value.shortId) {
      // Already selected
      return
    }
  }

  if (value.shortId === undefined) {
    // try find short Id
    const refs = await client.findAll<ShortRef>(
      core.class.Title,
      {
        objectId: value.document._id,
        objectClass: value.document._class
      },
      { limit: 1 }
    )

    if (refs.length > 0) {
      if (currentRoute.browse !== refs[0]._id) {
        value.shortId = refs[0]._id
        router.navigate({ browse: refs[0]._id })
      }
      return
    }
  }
  value.shortId = null
  // Construct class, objectId ref.
  const ref = docRef(value)
  if (currentRoute.browse !== ref) {
    router.navigate({ browse: ref })
  }
}
