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

import type { Account, Class, Ref, Space, DocumentPresenter, Timestamp, DocumentMapper, Doc, DerivedData, DerivedDataDescriptor, FullRefString } from '@anticrm/core'
import type { Person } from '@anticrm/contact'
import type { FSM, FSMItem, WithFSM } from '@anticrm/fsm'
import { Action as ActionDef } from '@anticrm/action'
import type { Action } from '@anticrm/action-plugin'
import type { Plugin, Service } from '@anticrm/platform'
import { plugin } from '@anticrm/platform'
import type { AnyComponent, Asset, IntlString, Resource } from '@anticrm/status'
import { Application } from '@anticrm/workbench'
import type { CommentRef } from '@anticrm/chunter'
import type { Attachment } from '@anticrm/attachment'
import { ActivityDefinition, DocumentAssociationMapper } from '@anticrm/activity'

export enum CandidateStatus {
  Employed = 'employed',
  AvailableForHire = 'available-for-hire'
}

export interface Candidate extends Person {
  status: CandidateStatus
  title: string
  salaryExpectation?: number
  applicants: Array<Ref<Applicant>>
  attachments: Array<Ref<Attachment>>
  comments: CommentRef[]
  socialLinks: SocialLink[]
  workPreference: WorkPreference
  // Derived value, updated by any comment add/modification.
  lastModified?: Timestamp
}

export interface WorkPreference {
  onsite?: boolean
  remote?: boolean
}

export interface SocialLink {
  type: SocialLinkType
  link: string
  // label?: IntlString
  // icon?: UIComponent
}

export type SocialLinkType = 'Discord' | 'Email'| 'Facebook'| 'Github'| 'Instagram' | 'Linkedin' | 'Phone' | 'Telegram' | 'Twitter' | 'Vk' | 'Whatsapp' | 'Youtube'

export const allSocialLinks: SocialLinkType[] = ['Discord', 'Email', 'Facebook', 'Github', 'Instagram', 'Linkedin', 'Phone', 'Telegram', 'Twitter', 'Vk', 'Whatsapp', 'Youtube']

export interface Applicant extends FSMItem {
  recruiter: Ref<Account>
  comments: CommentRef[]
  attachments: Array<Ref<Attachment>>
  candidate: FullRefString
  candidateData: ShortCandidate
  // Derived value, updated by any comment add/modification.
  lastModified?: Timestamp
}

export interface ShortCandidate {
  firstName: string
  lastName: string
  title?: string
  avatar?: string
  location?: string
}

export interface CandidatePoolSpace extends Space {}

export interface Vacancy {
  company: string
  location: string
  dueDate?: Timestamp
}
export interface VacancySpace extends WithFSM, Vacancy {}

export interface FeedbackRequest extends Doc {
  parent: Ref<Doc>
  targetSpace: Ref<Space>
}

export interface Feedback extends Doc {
  parent: Ref<Doc>
  request: Ref<FeedbackRequest>
  feedback: string
}

export interface DerivedFeedback extends Feedback, DerivedData {}

export interface RecruitingService extends Service {}

const PluginRecruiting = 'recruiting' as Plugin<RecruitingService>

export default plugin(PluginRecruiting, {}, {
  app: {
    Recruiting: '' as Ref<Application>
  },
  icon: {
    Recruiting: '' as Asset
  },
  class: {
    Candidate: '' as Ref<Class<Candidate>>,
    CandidatePoolSpace: '' as Ref<Class<CandidatePoolSpace>>,
    Applicant: '' as Ref<Class<Applicant>>,
    VacancySpace: '' as Ref<Class<VacancySpace>>,
    FeedbackRequest: '' as Ref<Class<FeedbackRequest>>,
    Feedback: '' as Ref<Class<Feedback>>,
    DerivedFeedback: '' as Ref<Class<DerivedFeedback>>
  },
  component: {
    CreatePool: '' as AnyComponent,
    CreateVacancy: '' as AnyComponent,
    CreateApplication: '' as AnyComponent,
    CreateCandidate: '' as AnyComponent,
    WorkspaceComponent: '' as AnyComponent,
    EditCandidate: '' as AnyComponent,
    Applications: '' as AnyComponent,
    Feedback: '' as AnyComponent,
    CandidatePoolProperties: '' as AnyComponent,
    VacancyProperties: '' as AnyComponent,

    CandidateActivity: '' as AnyComponent,
    ApplicantActivity: '' as AnyComponent
  },
  string: {
    App: '' as IntlString,
    Candidate: '' as IntlString,
    Candidates: '' as IntlString,
    Vacancies: '' as IntlString,
    Name: '' as IntlString,

    GeneralInformation: '' as IntlString,
    Details: '' as IntlString,
    VacancyTitle: '' as IntlString,
    Description: '' as IntlString,
    MakePrivate: '' as IntlString,
    MakePrivateDescription: '' as IntlString,
    Due: '' as IntlString,
    NoDue: '' as IntlString,
    VacancyType: '' as IntlString,
    VacancyNotes: '' as IntlString,
    VacancyDetails: '' as IntlString,
    Summary: '' as IntlString,
    Qualification: '' as IntlString,
    VacationExperience: '' as IntlString,
    Flow: '' as IntlString,
    Location: '' as IntlString,

    PersonalInformation: '' as IntlString,
    FirstName: '' as IntlString,
    LastName: '' as IntlString,
    Email: '' as IntlString,
    Phone: '' as IntlString,
    SalaryExpectation: '' as IntlString,
    Position: '' as IntlString,
    Experience: '' as IntlString,
    EmploymentStatus: '' as IntlString,
    Address: '' as IntlString,
    Street: '' as IntlString,
    City: '' as IntlString,
    Zip: '' as IntlString,
    Country: '' as IntlString,
    ApplicationInfo: '' as IntlString,
    CreateApplication: '' as IntlString,
    Unassign: '' as IntlString,

    Recruiter: '' as IntlString,
    SelectCandidate: '' as IntlString,
    AssignRecruiter: '' as IntlString,

    AddPoolSpace: '' as IntlString,

    AddVacancy: '' as IntlString,
    Company: '' as IntlString,

    AddCandidate: '' as IntlString,
    Bio: '' as IntlString,

    ScheduleInterview: '' as IntlString,

    Applications: '' as IntlString,
    Interviews: '' as IntlString,
    SubmitFeedback: '' as IntlString,
    Save: '' as IntlString,
    State: '' as IntlString,

    Comments: '' as IntlString,
    AddSocialLinks: '' as IntlString,
    SocialLinks: '' as IntlString,
    CreateCandidate: '' as IntlString,
    WorkPreference: '' as IntlString,
    WorkPreferences: '' as IntlString,
    Title: '' as IntlString,
    EditSocialLinks: '' as IntlString,
    Onsite: '' as IntlString,
    Remote: '' as IntlString,
    CandidatePool: '' as IntlString,
    CandidatePools: '' as IntlString,
    Vacancy: '' as IntlString,
    Activity: '' as IntlString,
    General: '' as IntlString,
    Members: '' as IntlString,
    FolderName: '' as IntlString,
    FolderDescription: '' as IntlString
  },
  presenter: {
    FeedbackRequestPresenter: '' as Ref<DocumentPresenter<Doc>>
  },
  fsm: {
    DefaultVacancy: '' as Ref<FSM>
  },
  action: {
    Interview: '' as Resource<ActionDef>
  },
  actionRef: {
    Interview: '' as Ref<Action>
  },
  dd: {
    Feedback: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    ReplyOf: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    CandidateReplyOf: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    CandidateAttachTo: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    CandidateApplicant: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    ApplicantCandidate: '' as Ref<DerivedDataDescriptor<Doc, Doc>>,
    ApplicantAttachTo: '' as Ref<DerivedDataDescriptor<Doc, Doc>>
  },
  mapper: {
    Feedback: '' as Resource<DocumentMapper>,
    ApplicantCandidate: '' as Resource<DocumentMapper>
  },
  activity: {
    CandidateActivity: '' as Ref<ActivityDefinition>,
    CandidateActivityMapper: '' as Resource<DocumentAssociationMapper>,
    ApplicantActivity: '' as Ref<ActivityDefinition>,
    ApplicantActivityMapper: '' as Resource<DocumentAssociationMapper>
  }
})
