import attachment, { Attachment, nameToFormat } from '@anticrm/attachment'
import { DemoBuilder } from '.'
import { Ref, Doc, Class, getFullRef } from '@anticrm/core'
import mime from 'mime'
import faker from 'faker'

let attachmentIds = 0

const fileURIs = [
  'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_500kB.jpg',
  'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
  'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'
]

export async function createAttachment (
  objectId: Ref<Doc>,
  objcetClass: Ref<Class<Doc>>,
  builder: DemoBuilder,
  index?: number
): Promise<Attachment> {
  const url = index !== undefined ? fileURIs[index % fileURIs.length] : faker.random.arrayElement(fileURIs)
  const fileName = url.split('/').pop() ?? url

  const attachmentId: Ref<Attachment> = `attachment-${attachmentIds++}` as Ref<Attachment>
  const result = await builder.createDoc(
    attachment.class.Attachment,
    {
      attachTo: getFullRef(objectId, objcetClass),
      url: url,
      name: fileName,
      format: nameToFormat(fileName),
      mime: mime.getType(fileName) ?? '',
      size: faker.datatype.number({ min: 1000, max: 1500000000 })
    },
    attachmentId
  )
  return result
}
