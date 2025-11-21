import{S as f}from"./storybook-BJU81olc.js";import{I as s,a as y}from"./Icon-bBHVBDiJ.js";import{j as J,r as Q,b as R,s as U,l as X,x as m,E as g,m as h,I as Y,u as v,F as Z,k as D}from"./vue.esm-bundler-lZQpEf4m.js";import{B as C,a as E}from"./Button-CiguzfZ3.js";import{u as M}from"./index-DHm5YGeX.js";import{_ as tt}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sizes-9jYRAigb.js";var i=(t=>(t.success="success",t.warning="warning",t.error="error",t.info="info",t))(i||{}),W=(t=>(t.success="Успешно",t.warning="Предупреждение",t.error="Ошибка",t.info="Уведомление",t))(W||{}),I=(t=>(t[t.success=s.checkbox]="success",t[t.warning=s.alertTriangle]="warning",t[t.error=s.exitCircle]="error",t[t.info=s.info]="info",t))(I||{});const et=["id","data-testid"],ot=["data-testid"],it=["data-testid"],at=["data-testid"],st=["data-testid"],L=J({__name:"Notification",props:{type:{default:i.info},title:{},pushKey:{},description:{default:""},timeout:{default:3},showPopover:{type:Boolean,default:!0},dataTestid:{default:"Notification"}},emits:["close"],setup(t,{expose:j,emit:z}){const e=t,O=z,a=Q(null);M(a,"toggle",()=>{e.timeout>0&&setTimeout(()=>{var o;return(o=a.value)==null?void 0:o.hidePopover()},e.timeout*1e3)});const A=()=>(O("close"),"hide"),H=()=>{var o;(o=a.value)==null||o.showPopover()},l=R({message:{icon:I[e.type],title:e.title||W[e.type],description:e.description}});return U(()=>{var o;e.showPopover&&((o=a.value)==null||o.showPopover())}),j({showPopover:H}),(o,rt)=>(D(),X("div",{popover:"manual",id:e.pushKey.toString(),class:Z(`push-notification-yui-kit push-notification-yui-kit_${e.type}`),"data-testid":e.dataTestid,ref_key:"popover",ref:a},[m("div",{class:"notification-yui-kit","data-testid":`${e.dataTestid}-Notification`},[m("div",{class:"notification-yui-kit__block","data-testid":`${e.dataTestid}-Notification-Block`},[g(y,{name:l.message.icon,class:"notification-yui-kit__block-icon","data-testid":`${e.dataTestid}-Notification-Icon`},null,8,["name","data-testid"]),m("h4",{class:"notification-yui-kit__block-title","data-testid":`${e.dataTestid}-Notification-Title`},h(l.message.title),9,at),m("span",{class:"notification-yui-kit__block-text","data-testid":`${e.dataTestid}-Notification-Description`},h(l.message.description),9,st)],8,it),g(C,{class:"notification-yui-kit__exit",type:v(E).ghost,popovertarget:e.pushKey.toString(),popovertargetaction:A,"data-testid":`${e.dataTestid}-Notification-Button`},{default:Y(()=>[g(y,{name:v(s).crossSmall,"data-testid":`${e.dataTestid}-Notification-Icon`},null,8,["name","data-testid"])]),_:1},8,["type","popovertarget","data-testid"])],8,ot)],10,et))}}),F=tt(L,[["__scopeId","data-v-51a00a13"]]);L.__docgenInfo={exportName:"default",displayName:"Notification",description:"",tags:{},expose:[{name:"showPopover"}],props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Notification'"}},{name:"type",required:!0,type:{name:"MessageTypeEnum"},defaultValue:{func:!1,value:"MessageTypeEnum.info"}},{name:"title",required:!1,type:{name:"string"}},{name:"pushKey",required:!0,type:{name:"number"}},{name:"description",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"timeout",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"3"}},{name:"showPopover",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],events:[{name:"close"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Notification/Notification.vue"]};const ft={title:"Notification/Notification",component:F,argTypes:{type:{control:{type:f.select},options:i},pushKey:{control:{type:f.number,min:1,max:10,step:1}},timeout:{control:{type:f.number,min:0,max:100,step:1}}},args:{description:"Уведомляем о операции",pushKey:1,timeout:3,showPopover:!1},tags:["autodocs"]},d=t=>({components:{Button:C,PushNotification:F},setup(){return{args:t}},template:`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  `}),r=d.bind({});r.args={type:i.info};const n=d.bind({});n.args={type:i.error,description:"Ошибка операции"};const p=d.bind({});p.args={type:i.warning,description:"Возможно, в следующий раз не сработает"};const c=d.bind({});c.args={type:i.success,description:"Файл успешно добавлен в архив"};const u=d.bind({});u.args={type:i.warning,description:"Вчера вечером, гуляя по тихим улочкам старого города, где каждый фонарь отбрасывал причудливые тени на мостовую, я неожиданно услышал отдалённые звуки скрипки, которые словно проникали в самое сердце; возможно, это был местный музыкант, который часами играл свои мелодии, наполняя окрестности чувством тоски и ностальгии."};var N,_,w;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`args => ({
  components: {
    Button,
    PushNotification
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  \`
})`,...(w=(_=r.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var P,x,k;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
  components: {
    Button,
    PushNotification
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  \`
})`,...(k=(x=n.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var B,K,b;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => ({
  components: {
    Button,
    PushNotification
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  \`
})`,...(b=(K=p.parameters)==null?void 0:K.docs)==null?void 0:b.source}}};var S,T,V;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
  components: {
    Button,
    PushNotification
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  \`
})`,...(V=(T=c.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var $,q,G;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  components: {
    Button,
    PushNotification
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  \`
})`,...(G=(q=u.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};const gt=["NotificationInfo","NotificationError","NotificationWarning","NotificationSuccess","NotificationWithVeryLongMessage"];export{n as NotificationError,r as NotificationInfo,c as NotificationSuccess,p as NotificationWarning,u as NotificationWithVeryLongMessage,gt as __namedExportsOrder,ft as default};
