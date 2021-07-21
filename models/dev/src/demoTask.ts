import core, { Account, DerivedDataDescriptor, Doc, generateId, Ref, ShortRef, Space } from '@anticrm/core'
import { Builder } from '@anticrm/model'
import { component, Component } from '@anticrm/status'
import { Project, CheckListItem, Task, TaskStatuses } from '@anticrm/task'
import task from '@anticrm/task-impl/src/plugin'
import chunter from '@anticrm/chunter-impl/src/plugin'
import faker from 'faker'

const demoIds = component('demo-task' as Component, {
  project: {
    DemoProject: '' as Ref<Project>
  }
})

export function demoTask (builder: Builder): void {
  const members: Ref<Account>[] = []
  for (let i = 0; i < 2 + faker.datatype.number(8); i++) {
    const accountId: Ref<Account> = generateId()
    builder.createDoc(
      core.class.Account,
      {
        name: faker.internet.exampleEmail() as Ref<Account>,
        avatar: faker.image.avatar()
      },
      accountId
    )
    members.push(accountId)
  }

  builder.createDoc(
    task.class.Project,
    {
      name: 'PL-DEMO',
      description: 'Demo Task project',
      members: members,
      private: false
    },
    demoIds.project.DemoProject
  )

  const taskCount = faker.datatype.number(20) + 10
  const DESCRIPTOR_SHORTREF = '#shortRef' as Ref<DerivedDataDescriptor<Doc, ShortRef>>
  for (let i = 0; i < taskCount; i++) {
    const id: Ref<Task> = generateId()
    const shortRefId: Ref<ShortRef> = `TSK-${i}` as Ref<ShortRef>
    // Create short references
    builder.createDoc(
      core.class.ShortRef,
      {
        title: `TSK-${i}`,
        objectClass: task.class.Task,
        objectId: id,
        descriptorId: DESCRIPTOR_SHORTREF,
        namespace: 'TSK',
        counter: i
      },
      shortRefId,
      { space: demoIds.project.DemoProject }
    )

    const checkItems: CheckListItem[] = []
    for (let i = 0; i < faker.datatype.number(10); i++) {
      checkItems.push({
        description: `do ${faker.commerce.productDescription()}`,
        done: faker.datatype.boolean()
      })
    }

    const commentSpaceId: Ref<Space> = generateId()
    builder.createDoc(
      core.class.Space,
      {
        name: `${shortRefId} comments`,
        description: `${shortRefId} comments`,
        members: members,
        private: false
      },
      commentSpaceId
    )

    for (let i = 0; i < faker.datatype.number(10); i++) {
      builder.createDoc(
        chunter.class.Message,
        {
          message: faker.lorem.paragraphs(3)
        },
        undefined,
        {
          space: commentSpaceId,
          modifiedBy: faker.random.arrayElement(members)
        }
      )
    }

    builder.createDoc(
      task.class.Task,
      {
        name: `Do ${faker.commerce.productName()}`,
        description: `do ${faker.commerce.productDescription()}`,
        status: faker.random.arrayElement([TaskStatuses.Open, TaskStatuses.InProgress, TaskStatuses.Closed]),
        shortRefId: shortRefId,
        checkItems: checkItems,
        commentSpace: commentSpaceId,
        assignee: faker.random.arrayElement(members)
      },
      id,
      { space: demoIds.project.DemoProject }
    )
  }
}
