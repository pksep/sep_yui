import{S as p}from"./storybook-BJU81olc.js";import{P as x,M as t}from"./Notification-CXPhdCYJ.js";import{B as S}from"./Button-xRmCTYUs.js";import"./vue.esm-bundler-BHGztBRP.js";import"./Icon-BPMvW5pS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-BXt-ztV4.js";import"./sizes-9jYRAigb.js";const L={title:"Notification/Notification",component:x,argTypes:{type:{control:{type:p.select},options:t},pushKey:{control:{type:p.number,min:1,max:10,step:1}},timeout:{control:{type:p.number,min:0,max:100,step:1}}},args:{description:"Уведомляем о операции",pushKey:1,timeout:3,showPopover:!1},tags:["autodocs"]},a=K=>({components:{Button:S,PushNotification:x},setup(){return{args:K}},template:`
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
        <PushNotification :pushKey="i" :type="args.type" :description="args.description" :timeout="args.timeout" :showPopover="args.showPopover" :style="{ width: '305px', 'margin-top': (i*20+75*(i-1))+'px' }" />
    </template>
  `}),o=a.bind({});o.args={type:t.info};const e=a.bind({});e.args={type:t.error,description:"Ошибка операции"};const i=a.bind({});i.args={type:t.warning,description:"Возможно, в следующий раз не сработает"};const r=a.bind({});r.args={type:t.success,description:"Файл успешно добавлен в архив"};const s=a.bind({});s.args={type:t.warning,description:"Вчера вечером, гуляя по тихим улочкам старого города, где каждый фонарь отбрасывал причудливые тени на мостовую, я неожиданно услышал отдалённые звуки скрипки, которые словно проникали в самое сердце; возможно, это был местный музыкант, который часами играл свои мелодии, наполняя окрестности чувством тоски и ностальгии."};var n,c,u;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`args => ({
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
})`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var m,g,h;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
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
})`,...(h=(g=e.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,d,f;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(f=(d=i.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var l,P,v;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(v=(P=r.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};var N,w,B;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => ({
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
})`,...(B=(w=s.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const V=["NotificationInfo","NotificationError","NotificationWarning","NotificationSuccess","NotificationWithVeryLongMessage"];export{e as NotificationError,o as NotificationInfo,r as NotificationSuccess,i as NotificationWarning,s as NotificationWithVeryLongMessage,V as __namedExportsOrder,L as default};
