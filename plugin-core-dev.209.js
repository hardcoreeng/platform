/*! For license information please see plugin-core-dev.209.js.LICENSE.txt */
"use strict";(self.webpackChunkprod=self.webpackChunkprod||[]).push([[209],{61669:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(31612),c=a(69882),l=a(8445),o=a(76572),n=a(53975),r=a(69089),d=a(76111),i=a(27707),u=a(89058),f=new s.Builder;c.createModel(f),l.createModel(f),o.createModel(f),n.createModel(f),i.createModel(f),r.createModel(f),d.createModel(f),u.createModel(f),t.default=f},89058:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.TDerivedEvent=t.TEvent=t.TCalendar=void 0;const c=a(31612),l=a(69882),o=a(41350),n=a(8445),r=a(6904),d="calendar";let i=class extends l.TSpace{};i=s([c.Model(r.default.class.Calendar,l.default.class.Space,o.DOMAIN_MODEL)],i),t.TCalendar=i;let u=class extends l.TDoc{};u=s([c.Model(r.default.class.Event,l.default.class.Doc,d)],u),t.TEvent=u;let f=class extends l.TDerivedData{};f=s([c.Model(r.default.class.DerivedEvent,l.default.class.DerivedData,d)],f),t.TDerivedEvent=f,t.createModel=function(e){e.createModel(i,u,f),e.createDoc(n.default.class.Application,{label:r.default.string.App,icon:r.default.icon.Calendar,navigatorModel:{spaces:[{label:r.default.string.Calendar,spaceIcon:r.default.icon.Calendar,spaceClass:r.default.class.Calendar,addSpaceLabel:r.default.string.AddCalendar,createComponent:r.default.component.CreateCalendar}],createComponent:r.default.component.CreateEvent,spaceView:r.default.component.Workspace}}),e.createDoc(l.default.class.DerivedDataDescriptor,{targetClass:r.default.class.DerivedEvent,sourceClass:r.default.class.Event,mapper:r.default.mapper.defaultMapper})}},76572:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.TComment=t.TMessage=t.TChannel=void 0;const c=a(31612),l=a(69882),o=a(8445),n=a(41245),r="chunter";let d=class extends l.TSpace{};d=s([c.Model(n.default.class.Channel,l.default.class.Space)],d),t.TChannel=d;let i=class extends l.TDoc{};i=s([c.Model(n.default.class.Message,l.default.class.Doc,r)],i),t.TMessage=i;let u=class extends l.TDoc{};u=s([c.Model(n.default.class.Comment,l.default.class.Doc,r)],u),t.TComment=u,t.createModel=function(e){e.createModel(d,i,u),e.createDoc(o.default.class.Application,{label:n.default.string.ApplicationLabelChunter,icon:n.default.icon.Chunter,navigatorModel:{specials:[{label:n.default.string.MessagesSpecial,component:n.default.component.CreateMessage,icon:n.default.icon.Chunter},{label:n.default.string.ThreadsSpecial,component:n.default.component.ThreadsView,icon:n.default.icon.Hashtag}],spaces:[{label:n.default.string.Starred,hideIfEmpty:!0,spaceIcon:n.default.icon.Hashtag,spaceClass:n.default.class.Channel,spaceQuery:{"account.starred":!0},addSpaceLabel:n.default.string.CreateChannel,spaceItem:n.default.component.SpaceItem,spaceHeader:n.default.component.SpaceHeader},{label:n.default.string.Channels,spaceIcon:n.default.icon.Hashtag,spaceClass:n.default.class.Channel,spaceQuery:{direct:!1,"account.starred":{$ne:!0}},addSpaceLabel:n.default.string.CreateChannel,createComponent:n.default.component.CreateChannel,spaceItem:n.default.component.SpaceItem,spaceHeader:n.default.component.SpaceHeader},{label:n.default.string.DirectMessages,spaceIcon:n.default.icon.Hashtag,spaceClass:n.default.class.Channel,spaceQuery:{direct:!0,"account.starred":{$ne:!0}},addSpaceLabel:n.default.string.CreateDirectMessage,spaceItem:n.default.component.SpaceItem,spaceHeader:n.default.component.SpaceHeader}],spaceView:n.default.component.ChannelView,editComponent:n.default.component.ThreadsView}},n.default.app.Chunter),e.createDoc(n.default.class.Channel,{name:"general",description:"General Channel",private:!1,members:[],direct:!1},n.default.channel.General),e.createDoc(n.default.class.Channel,{name:"random",description:"Random Talks",private:!1,members:[],direct:!1},n.default.channel.Random),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:n.default.class.Message,targetClass:l.default.class.Reference,rules:[{sourceField:"message",targetField:"link",pattern:{pattern:l.MARKDOWN_REFERENCE_PATTERN.source,multDoc:!0}}]},n.default.dd.MessageReferences),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:n.default.class.Comment,targetClass:l.default.class.Reference,rules:[{sourceField:"message",targetField:"link",pattern:{pattern:l.MARKDOWN_REFERENCE_PATTERN.source,multDoc:!0}}]},n.default.dd.CommentReferences),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:n.default.class.Comment,targetClass:n.default.class.Message,collections:[{sourceField:"replyOf",targetField:"comments",rules:[{sourceField:"modifiedBy",targetField:"userId"}]}]},n.default.dd.ReplyOf)}},41245:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(56892),c=a(98097);t.default=c.mergeIds(s.default,{component:{CreateChannel:"",CreateMessage:"",ChannelView:"",ThreadsView:"",AllThreadsView:"",SpaceItem:"",SpaceHeader:""},string:{ApplicationLabelChunter:""},channel:{General:"",Random:""},dd:{MessageReferences:"",CommentReferences:"",ReplyOf:""}})},35909:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(31612),c=a(98097);t.default=c.mergeIds(s.default,{class:{Mixin:""}})},7463:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.TMixin=t.TClass=t.TDoc=t.TObj=void 0;const c=a(41350),l=a(31612),o=a(35909);let n=class{};n=s([l.Model(o.default.class.Obj,o.default.class.Obj)],n),t.TObj=n;let r=class extends n{};r=s([l.Model(o.default.class.Doc,o.default.class.Obj)],r),t.TDoc=r;let d=class extends r{};d=s([l.Model(o.default.class.Class,o.default.class.Doc,c.DOMAIN_MODEL)],d),t.TClass=d;let i=class extends d{};i=s([l.Model(o.default.class.Mixin,o.default.class.Class)],i),t.TMixin=i},58612:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.TShortRef=t.TReference=t.MARKDOWN_REFERENCE_PATTERN=t.TTitle=t.TDerivedDataDescriptor=t.TDerivedData=void 0;const c=a(41350),l=a(31612),o=a(35909),n=a(7463),r="title";let d=class extends n.TDoc{};d=s([l.Model(o.default.class.DerivedData,o.default.class.Doc)],d),t.TDerivedData=d;let i=class extends n.TDoc{};i=s([l.Model(o.default.class.DerivedDataDescriptor,o.default.class.Doc,c.DOMAIN_MODEL)],i),t.TDerivedDataDescriptor=i;let u=class extends d{};u=s([l.Model(o.default.class.Title,o.default.class.DerivedData,r)],u),t.TTitle=u,t.MARKDOWN_REFERENCE_PATTERN=/\[([a-zA-Z-\d]+)\]\(ref:\/\/([a-zA-Z.]+)#([a-zA-Z\d]+)\)/g;let f=class extends d{};f=s([l.Model(o.default.class.Reference,o.default.class.DerivedData,c.DOMAIN_REFERENCES)],f),t.TReference=f;let p=class extends u{};p=s([l.Model(o.default.class.ShortRef,o.default.class.Title,r)],p),t.TShortRef=p},69882:function(e,t,a){var s=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),c=this&&this.__exportStar||function(e,t){for(var a in e)"default"===a||Object.prototype.hasOwnProperty.call(t,a)||s(t,e,a)};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.default=void 0;const l=a(35909);t.default=l.default;const o=a(7463),n=a(58612),r=a(59275),d=a(66660);c(a(7463),t),c(a(59275),t),c(a(66660),t),c(a(58612),t),t.createModel=function(e){e.createModel(o.TObj,o.TDoc,o.TClass,o.TMixin,d.TTx,d.TTxCreateDoc,d.TTxUpdateDoc,d.TTxRemoveDoc,r.TSpace,r.TAccount,n.TDerivedData,n.TDerivedDataDescriptor,n.TTitle,n.TReference,n.TShortRef)}},59275:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.TAccount=t.TSpace=void 0;const c=a(41350),l=a(31612),o=a(35909),n=a(7463);let r=class extends n.TDoc{};r=s([l.Model(o.default.class.Space,o.default.class.Doc,c.DOMAIN_MODEL)],r),t.TSpace=r;let d=class extends n.TDoc{};d=s([l.Model(o.default.class.Account,o.default.class.Doc,c.DOMAIN_MODEL)],d),t.TAccount=d},66660:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.TTxRemoveDoc=t.TTxUpdateDoc=t.TTxCreateDoc=t.TTx=void 0;const c=a(41350),l=a(31612),o=a(35909),n=a(7463);let r=class extends n.TDoc{};r=s([l.Model(o.default.class.Tx,o.default.class.Doc,c.DOMAIN_TX)],r),t.TTx=r;let d=class extends r{};d=s([l.Model(o.default.class.TxCreateDoc,o.default.class.Tx)],d),t.TTxCreateDoc=d;let i=class extends r{};i=s([l.Model(o.default.class.TxUpdateDoc,o.default.class.Tx)],i),t.TTxUpdateDoc=i;let u=class extends r{};u=s([l.Model(o.default.class.TxRemoveDoc,o.default.class.Tx)],u),t.TTxRemoveDoc=u},33636:function(e,t,a){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.demoAccount=t.accountIds=void 0;const c=s(a(41350)),l=s(a(77776));t.accountIds=[],t.demoAccount=function(e){e.createDoc(c.default.class.Account,{email:"system",name:"System user",avatar:l.default.image.avatar()},c.default.account.System);for(let a=0;a<11;a++){const s=`demo_account_id${a}`;e.createDoc(c.default.class.Account,{email:l.default.internet.email(),name:l.default.internet.userName(),avatar:l.default.image.avatar()},s),t.accountIds.push(s)}}},25831:function(e,t,a){var s=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),c=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&s(t,e,a);return c(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.demoChunter=void 0;const n=o(a(56892)),r=l(a(41350)),d=a(98097),i=o(a(77776)),u=a(33636),f=d.component("demo-task",{project:{DemoChannel:""}});t.demoChunter=function(e){const t=[r.default.account.System,...u.accountIds];e.createDoc(n.default.class.Channel,{name:"PL-CHANNEL",description:"Demo Channel",members:t,direct:!1,private:!1},f.project.DemoChannel);for(let a=0;a<7;a++){let s=i.default.random.arrayElements(t,i.default.datatype.number(t.length)+1);s.includes(r.default.account.System)||(s=[r.default.account.System,...s]),e.createDoc(n.default.class.Channel,{name:"direct-message",description:"My direct mesage",members:s,direct:!0,private:!0},`dmc-${a}`)}const a=[2,0,4,7,20,30,1,2,3,1];let s=0;for(let t=0;t<10;t++){const c=`mid-${t}`,l=[],o=a[t];for(let t=0;t<o;t++){const t=i.default.random.arrayElement(u.accountIds),a="cid-"+s++;l.push({_id:a,userId:t}),e.createDoc(n.default.class.Comment,{replyOf:r.getFullRef(c,n.default.class.Message),message:i.default.lorem.paragraphs(2)},a,{space:f.project.DemoChannel,modifiedOn:Date.now(),createOn:Date.now(),modifiedBy:t})}e.createDoc(n.default.class.Message,{message:i.default.lorem.paragraphs(3),comments:l},c,{space:f.project.DemoChannel,modifiedBy:i.default.random.arrayElement(u.accountIds),modifiedOn:Date.now(),createOn:Date.now()})}}},99198:function(e,t,a){var s=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),c=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&s(t,e,a);return c(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.demoTask=void 0;const n=o(a(56892)),r=l(a(41350)),d=a(98097),i=l(a(1808)),u=o(a(77776)),f=a(33636),p=d.component("demo-task",{project:{DemoProject:""}});t.demoTask=function(e){const t=[r.default.account.System,...f.accountIds];e.createDoc(i.default.class.Project,{name:"PL-DEMO",description:"Demo Task project",members:t,private:!1},p.project.DemoProject);const a=[1,4,2,0,10,1,5],s=[2,5,1,0,2,0,3];let c=0;for(let l=0;l<7;l++){const o=`tid-${l}`,d=`TSK-${l}`;e.createDoc(r.default.class.ShortRef,{title:`TSK-${l}`,objectClass:i.default.class.Task,objectId:o,descriptorId:"#shortRef",namespace:"TSK",counter:l},d,{space:p.project.DemoProject,modifiedOn:Date.now(),createOn:Date.now()});const m=[];for(let e=0;e<a[l];e++)m.push({description:`do ${u.default.commerce.productDescription()}`,done:u.default.datatype.boolean()});const h=[];for(let t=0;t<s[l];t++){const t="t-cid-"+c++;e.createDoc(n.default.class.Comment,{message:u.default.lorem.paragraphs(3),replyOf:r.getFullRef(o,i.default.class.Task)},t,{space:p.project.DemoProject,modifiedBy:u.default.random.arrayElement(f.accountIds),modifiedOn:Date.now(),createOn:Date.now()}),h.push(t)}e.createDoc(i.default.class.Task,{name:`Do ${u.default.commerce.productName()}`,description:`do ${u.default.commerce.productDescription()}`,status:u.default.random.arrayElement([i.TaskStatuses.Open,i.TaskStatuses.InProgress,i.TaskStatuses.Closed]),shortRefId:d,checkItems:m,assignee:u.default.random.arrayElement(t),comments:h,dueTo:u.default.date.soon()},o,{space:p.project.DemoProject})}}},21705:function(e,t,a){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=s(a(61669)),l=a(33636),o=a(25831),n=a(99198);l.demoAccount(c.default),o.demoChunter(c.default),n.demoTask(c.default),t.default=c.default},53975:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.templateFSM=t.FSMBuilder=t.createModel=t.TWithFSM=t.TTransition=t.TState=t.TFSMItem=t.TFSM=void 0;const c=a(31612),l=a(30248),o=a(69882),n=a(41350);let r=class extends o.TDoc{};r=s([c.Model(l.default.class.FSM,o.default.class.Doc,n.DOMAIN_MODEL)],r),t.TFSM=r;let d=class extends o.TDoc{};d=s([c.Model(l.default.class.FSMItem,o.default.class.Doc,"fsm")],d),t.TFSMItem=d;let i=class extends o.TDoc{};i=s([c.Model(l.default.class.State,o.default.class.Doc,n.DOMAIN_MODEL)],i),t.TState=i;let u=class extends o.TDoc{};u=s([c.Model(l.default.class.Transition,o.default.class.Doc,n.DOMAIN_MODEL)],u),t.TTransition=u;let f=class extends o.TSpace{};f=s([c.Model(l.default.class.WithFSM,o.default.class.Space)],f),t.TWithFSM=f,t.createModel=function(e){e.createModel(r,i,u,d,f)};class p{constructor(e,t){this.states=new Map,this.transitions=[],this.genColor=function*(){for(;;)yield*["var(--primary-color-pink)","var(--primary-color-purple-01)","var(--primary-color-orange-01)","var(--primary-color-skyblue)","var(--primary-color-purple-02)","var(--primary-color-orange-02)","var(--primary-color-purple-03)"]}(),this.name=e,this.clazz=t}getState(e){return this.states.has(e.name)||this.states.set(e.name,e),this.states.get(e.name)}_transition(e,t){const a=this.getState(e),s=this.getState(t);return null==a||null==s||this.transitions.push([a.name,s.name]),this}transition(e,t){return(Array.isArray(t)?t:[t]).forEach((t=>this._transition(e,t))),this}build(e){const t=n.generateId();e.createDoc(l.default.class.FSM,{name:this.name,clazz:this.clazz,isTemplate:!0},t);const a=new Map;this.states.forEach((s=>{var c;const o=null!==(c=s.color)&&void 0!==c?c:this.genColor.next().value,r=n.generateId();e.createDoc(l.default.class.State,{...s,color:o,fsm:t},r),a.set(s.name,r)}));const s=[];return this.transitions.forEach((([c,o])=>{const r=a.get(c),d=a.get(o);if(null==r||null==d)return;const i=n.generateId();e.createDoc(l.default.class.Transition,{from:r,to:d,fsm:t},i),s.push(i)})),t}}t.FSMBuilder=p,t.templateFSM=(e,t)=>new p(e,t)},76111:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.TRoom=void 0;const c=a(31612),l=a(69882),o=a(8445),n=a(33468);let r=class extends l.TSpace{};r=s([c.Model(n.default.class.RoomSpace,l.default.class.Space)],r),t.TRoom=r,t.createModel=function(e){e.createModel(r),e.createDoc(o.default.class.Application,{label:n.default.string.ApplicationLabelMeeting,icon:n.default.icon.Meeting,navigatorModel:{spaces:[{label:n.default.string.Rooms,spaceIcon:n.default.icon.Hashtag,spaceClass:n.default.class.RoomSpace,addSpaceLabel:n.default.string.CreateChannel,createComponent:n.default.component.CreateChannel}],spaceView:n.default.component.WorkspaceComponent}},n.default.app.Meeting),e.createDoc(n.default.class.RoomSpace,{name:"Kitchen",description:"Kitchen Talks",private:!1,members:[]},n.default.room.Kitchen)}},33468:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(31379),c=a(98097);t.default=c.mergeIds(s.default,{string:{ApplicationLabelMeeting:"",CreateChannel:""},component:{CreateChannel:"",WorkspaceComponent:""},app:{Meeting:""},room:{Kitchen:""}})},27707:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=void 0;const c=a(31612),l=a(69882),o=a(8445),n=a(53975),r=a(30248),d=a(26705),i="recruiting";let u=class extends l.TDoc{};u=s([c.Model(d.default.class.Candidate,l.default.class.Doc,i)],u);let f=class extends l.TSpace{};f=s([c.Model(d.default.class.CandidatePoolSpace,l.default.class.Space)],f);let p=class extends l.TDoc{};p=s([c.Model(d.default.class.Resume,l.default.class.Doc,i)],p);let m=class extends n.TFSMItem{};m=s([c.Model(d.default.class.Applicant,r.default.class.FSMItem)],m);let h=class extends n.TWithFSM{};h=s([c.Model(d.default.class.VacancySpace,r.default.class.WithFSM)],h),t.createModel=function(e){e.createModel(m,p,u,f,h),e.createDoc(o.default.class.Application,{label:d.default.string.App,icon:d.default.icon.Recruiting,navigatorModel:{spaces:[{label:d.default.string.Vacancies,spaceIcon:d.default.icon.Recruiting,spaceClass:d.default.class.VacancySpace,addSpaceLabel:d.default.string.AddVacancy,createComponent:d.default.component.CreateVacancy},{label:d.default.string.Candidates,spaceIcon:d.default.icon.Recruiting,spaceClass:d.default.class.CandidatePoolSpace,addSpaceLabel:d.default.string.AddPoolSpace,createComponent:d.default.component.CreatePool}],spaceView:d.default.component.WorkspaceComponent,createComponent:d.default.component.CreateVacancy}},d.default.app.Recrutting);const t={rejected:{name:"Rejected"},applied:{name:"Applied"},hrInterview:{name:"HR interview"},testTask:{name:"Test Task"},techInterview:{name:"Technical interview"},offer:{name:"Offer"},contract:{name:"Contract signing"}};n.templateFSM("Default developer vacancy",d.default.class.VacancySpace).transition(t.applied,[t.hrInterview,t.rejected]).transition(t.hrInterview,[t.testTask,t.rejected]).transition(t.testTask,[t.techInterview,t.rejected]).transition(t.techInterview,[t.offer,t.rejected]).transition(t.offer,[t.contract,t.rejected]).transition(t.offer,t.rejected).build(e),n.templateFSM("Another default vacancy",d.default.class.VacancySpace).transition(t.applied,[t.techInterview,t.rejected]).transition(t.techInterview,[t.offer,t.rejected]).transition(t.offer,t.rejected).build(e)}},26705:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(91331),c=a(98097);t.default=c.mergeIds(s.default,{string:{ApplicationLabelMeeting:"",CreateChannel:""},component:{CreatePool:"",CreateVacancy:"",WorkspaceComponent:""},app:{Recrutting:""}})},69089:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.TTask=t.TProject=void 0;const c=a(31612),l=a(69882),o=a(56892),n=a(8445),r=a(76335);let d=class extends l.TSpace{};d=s([c.Model(r.default.class.Project,l.default.class.Space)],d),t.TProject=d;let i=class extends l.TDoc{};i=s([c.Model(r.default.class.Task,l.default.class.Doc,"task")],i),t.TTask=i,t.createModel=function(e){e.createModel(d,i),e.createDoc(n.default.class.Application,{label:r.default.string.ApplicationLabelTask,icon:r.default.icon.Task,navigatorModel:{specials:[{label:r.default.string.MyTasks,component:r.default.component.MyTasksView,icon:r.default.icon.Task},{label:r.default.string.Favorite,component:r.default.component.FavoriteView,icon:r.default.icon.Star}],spaces:[{label:r.default.string.Projects,spaceIcon:r.default.icon.Task,spaceClass:r.default.class.Project,addSpaceLabel:r.default.string.CreateProject,createComponent:r.default.component.CreateProject}],spaceView:r.default.component.ProjectView,createComponent:r.default.component.CreateTask,editComponent:r.default.component.EditTask}},r.default.ids.Application),e.createDoc(r.default.class.Project,{name:"default",description:"Default Project",private:!1,members:[]},r.default.space.Default),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:r.default.class.Task,targetClass:l.default.class.Title,rules:[{sourceField:"name",targetField:"title"}]},r.default.dd.NameTitleIndex),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:r.default.class.Task,targetClass:l.default.class.Reference,rules:[{sourceField:"description",targetField:"link",pattern:{pattern:l.MARKDOWN_REFERENCE_PATTERN.source,multDoc:!0}}]},r.default.dd.ReferencesIndex),e.createDoc(l.default.class.DerivedDataDescriptor,{sourceClass:o.default.class.Comment,targetClass:r.default.class.Task,collections:[{sourceField:"replyOf",targetField:"comments"}]},r.default.dd.ReplyOf)}},76335:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(1808),c=a(98097);t.default=c.mergeIds(s.default,{component:{CreateProject:"",ProjectView:"",MyTasksView:"",FavoriteView:"",CreateTask:"",EditTask:""},ids:{Application:""},space:{Default:""},dd:{NameTitleIndex:"",ReferencesIndex:"",ReplyOf:""}})},8445:function(e,t,a){var s=this&&this.__decorate||function(e,t,a,s){var c,l=arguments.length,o=l<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,s);else for(var n=e.length-1;n>=0;n--)(c=e[n])&&(o=(l<3?c(o):l>3?c(t,a,o):c(t,a))||o);return l>3&&o&&Object.defineProperty(t,a,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.createModel=t.TApplication=void 0;const c=a(41350),l=a(31612),o=a(69882),n=a(7356);let r=class extends o.TDoc{};r=s([l.Model(n.default.class.Application,o.default.class.Doc,c.DOMAIN_MODEL)],r),t.TApplication=r,t.createModel=function(e){e.createModel(r)},t.default=n.default},7356:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(35107);t.default=s.default},80428:function(e,t,a){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const c=s(a(41350)),l=a(98097);t.default=l.mergeIds(c.default,{class:{TypeString:""}})},43895:function(e,t,a){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TypeString=t.Builder=t.Model=t.Prop=void 0;const c=a(41350),l=s(a(73993)),o=s(a(80428)),n=new Map;function r(e){const t=n.get(e);if(void 0===t){const t={txes:[]};return n.set(e,t),t}return t}function d(e,t){return t.map((t=>({_id:c.generateId(),objectId:e,...t})))}function i(e,t,a,s,l){var n,r,d,i;return{_id:c.generateId(),_class:o.default.class.TxCreateDoc,space:o.default.space.Tx,modifiedBy:null!==(n=null==l?void 0:l.modifiedBy)&&void 0!==n?n:o.default.account.System,modifiedOn:null!==(r=null==l?void 0:l.modifiedOn)&&void 0!==r?r:0,createOn:null!==(d=null==l?void 0:l.createOn)&&void 0!==d?d:0,objectId:null!=s?s:c.generateId(),objectClass:e,objectSpace:null!==(i=null==l?void 0:l.space)&&void 0!==i?i:o.default.space.Model,attributes:a}}t.Prop=function(e){return function(t,a){const s=r(t),c={_class:o.default.class.TxCreateDoc,space:o.default.space.Tx,modifiedBy:o.default.account.System,modifiedOn:0,createOn:0,objectSpace:o.default.space.Model,objectClass:o.default.class.Attribute,attributes:{type:e,name:a,attributeOf:s._id}};s.txes.push(c)}},t.Model=function(e,t,a){return function(s){const c=r(s.prototype);c._id=e,c.extends=e!==o.default.class.Obj?t:void 0,c.domain=a}},t.Builder=class{constructor(){this.txes=[],this.hierarchy=new c.Hierarchy}createModel(...e){const t=e.map((e=>r(e.prototype))),a=new Map;t.forEach((e=>{a.set(e._id,e)}));const s=this.generateTransactions(t,a);for(const e of s)this.txes.push(e),this.hierarchy.tx(e)}generateTransactions(e,t){const a=this.createGraph(e);return l.default(a).reverse().map((e=>t.get(e))).flatMap((e=>null!=e?function(e){const t=e._id;return[i(o.default.class.Class,c.DOMAIN_MODEL,{domain:e.domain,kind:c.ClassifierKind.CLASS,extends:e.extends},t),...d(t,e.txes)]}(e):[]))}createGraph(e){return e.map((e=>[e._id,e.extends]))}createDoc(e,t,a,s){this.txes.push(i(e,this.hierarchy.getDomain(e),t,a,s))}getTxes(){return this.txes}},t.TypeString=function(){return{_class:o.default.class.TypeString}}},31612:function(e,t,a){var s=this&&this.__createBinding||(Object.create?function(e,t,a,s){void 0===s&&(s=a),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[a]}})}:function(e,t,a,s){void 0===s&&(s=a),e[s]=t[a]}),c=this&&this.__exportStar||function(e,t){for(var a in e)"default"===a||Object.prototype.hasOwnProperty.call(t,a)||s(t,e,a)},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,c(a(43895),t);var o=a(80428);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l(o).default}})},66866:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LiveQuery=void 0;const s=a(41350),c=a(47715);class l extends s.TxProcessor{constructor(e){super(),this.client=e,this.queries=new Map,this.qid=s.generateId()}isDerived(e,t){return this.client.isDerived(e,t)}match(e,t){if(!this.isDerived(t._class,e._class))return!1;for(const a in e.query){const c=e.query[a];if(0===s.findProperty([t],a,c).length)return!1}return!0}async findAll(e,t,a){return await this.client.findAll(e,t,a)}query(e,t,a,l){const o=this.client.findAll(e,t,l),n={_id:s.generateId(),_class:e,query:t,result:o,total:0,options:l,callback:a};return this.queries.set(n._id,n),o.then((e=>{n.result=c.default(e),n.total=e.total,n.callback(e)})).catch((e=>{console.log("failed to update Live Query: ",e)})),()=>{this.queries.delete(n._id)}}matchQuery(e,t){if(!this.isDerived(e._class,t.objectClass))return!1;for(const a in e.query){const c=e.query[a];if(1===s.findProperty([t.operations],a,c).length)return!0}return!1}async txUpdateDoc(e){for(const t of this.queries.values()){t.result instanceof Promise&&(t.result=c.default(await t.result));const a=t.result.findIndex((t=>t._id===e.objectId));if(-1!==a){const s=t.result[a],c=this.doUpdateDoc(s,e);this.match(t,c)?t.result[a]=c:(t.result.splice(a,1),t.total--),this.sort(t,e),await this.callback(c,t)}else this.matchQuery(t,e)&&await this.refresh(t)}}async txCreateDoc(e){var t,a,l,o;const n=s.TxProcessor.createDoc2Doc(e);for(const e of this.queries.values())this.match(e,n)&&(e.result instanceof Promise&&(e.result=c.default(await e.result)),e.result.push(n),e.total++,void 0!==(null===(t=e.options)||void 0===t?void 0:t.sort)&&s.resultSort(e.result,null===(a=e.options)||void 0===a?void 0:a.sort),void 0!==(null===(l=e.options)||void 0===l?void 0:l.limit)&&e.result.length>e.options.limit?(null===(o=e.result.pop())||void 0===o?void 0:o._id)!==n._id&&e.callback(Object.assign(e.result,{total:e.total})):e.callback(Object.assign(e.result,{total:e.total})))}async txRemoveDoc(e){var t;for(const a of this.queries.values()){a.result instanceof Promise&&(a.result=c.default(await a.result));const s=a.result.findIndex((t=>t._id===e.objectId));if(void 0!==(null===(t=a.options)||void 0===t?void 0:t.limit)&&a.options.limit===a.result.length&&this.isDerived(a._class,e.objectClass))return await this.refresh(a);s>-1&&(a.result.splice(s,1),a.callback(Object.assign(a.result,{total:--a.total})))}}async tx(e){await this.client.tx(e)}async notifyTx(e){await super.tx(e)}doUpdateDoc(e,t){const a=c.default(e),l=t.operations;for(const e in l)e.startsWith("$")?s.getOperator(e)(a,l[e]):a[e]=l[e];return a.modifiedBy=t.modifiedBy,a.modifiedOn=t.modifiedOn,a}async refresh(e){const t=await this.client.findAll(e._class,e.query,e.options);e.result=c.default(t),e.total=t.total,e.callback(t)}sort(e,t){var a;const c=null===(a=e.options)||void 0===a?void 0:a.sort;if(void 0===c)return;let l=void 0!==c.modifiedBy||void 0!==c.modifiedOn;l||(l=this.checkNeedSort(c,t)),l&&s.resultSort(e.result,c)}checkNeedSort(e,t){const a=t.operations;for(const t in a)if(t.startsWith("$")){for(const s in a[t])if(s in e)return!0}else if(t in e)return!0;return!1}async callback(e,t){var a,s;if(t.result=t.result,void 0!==(null===(a=t.options)||void 0===a?void 0:a.limit)&&t.total>t.options.limit&&(null===(s=t.result.pop())||void 0===s?void 0:s._id)===e._id)return await this.refresh(t);t.callback(Object.assign(t.result,{total:t.total}))}}t.LiveQuery=l},89419:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ClientImpl=void 0;const s=a(41350),c=a(21705),l=a(47715),o=a(41350);class n extends s.TxProcessor{constructor(e,t,a){super(),this.hierarchy=e,this.model=t,this.transactions=a,this.handler=()=>{}}isDerived(e,t){return this.hierarchy.isDerived(e,t)}static createDerivedDataStorage(e,t){return{findAll:async(t,a)=>await e.findAll(t,a),tx:async a=>{await e.tx(a),t(a)}}}static async create(){const e=c.default.getTxes(),t=new s.Hierarchy;e.forEach((e=>t.tx(e)));const a=new s.TxDb(t),l=new s.ModelDb(t);for(const t of e)await a.tx(t);for(const t of e)await l.tx(t);return"undefined"!=typeof window&&console.info("Model Build complete",l),new n(t,l,a)}async findAll(e,t){return this.hierarchy.getClass(e).domain===s.DOMAIN_TX?await this.transactions.findAll(e,t):l.default(await this.model.findAll(e,t))}async tx(e){o.isModelTx(e)&&this.hierarchy.tx(e),await this.transactions.tx(e),"undefined"!=typeof window&&console.info("Model updated",this.model),this.handler(e)}async accountId(){return s.default.account.System}}t.ClientImpl=n},11271:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=a(41350),c=a(66866),l=a(89419);t.default=async()=>{let e;return{getClient:async function(){if(void 0===e){let t;const a=await l.ClientImpl.create(),o=await s.createClient((async e=>(a.handler=e,a)),(e=>{a.model.tx(e),null==t||t.notifyTx(e).catch((e=>console.error(e)))}));t=new c.LiveQuery(o),e=s.withOperations(s.default.account.System,t)}return e},disconnect:async()=>await Promise.resolve()}}}}]);