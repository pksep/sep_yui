import{B as d,a as t}from"./Button-CiguzfZ3.js";import{I as K,a as L}from"./Icon-bBHVBDiJ.js";import{S as M}from"./sizes-9jYRAigb.js";import{C as Q}from"./colors-BMxzW9Sg.js";import{S as e}from"./storybook-BJU81olc.js";import{f as U}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-lZQpEf4m.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const rt={title:"Button/Button",component:d,argTypes:{disabled:{control:{type:e.boolean},defaultValue:!1},pill:{control:{type:e.boolean},defaultValue:!1},size:{control:{type:e.radio},options:M},type:{control:{type:e.select},options:t},content:{control:{type:e.text},description:"Кастомный контент кнопки",defaultValue:{summary:"Button"}},iconName:{control:{type:e.select},description:"Имя иконки",options:K},iconPosition:{control:{type:e.radio},options:["left","right"],description:"Позиция иконки",defaultValue:"left"},iconColor:{control:{type:e.select},description:"Цвет иконки",options:Q}},tags:["autodocs"],args:{onClick:U()}},o=u=>({components:{Button:d,Icon:L},setup(){return{args:u}},template:`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  `}),m=u=>({components:{Button:d},setup(){return{args:u}},template:'<Button v-bind="args">{{ args.content || "Button" }}</Button>'}),r=o.bind({});r.args={type:t.primary};const a=o.bind({});a.args={type:t.secondary};const i=o.bind({});i.args={type:t.outline};const n=o.bind({});n.args={type:t.ghost};const g=o.bind({});n.args={type:t.reject};const s=o.bind({});s.args={type:t.primary,iconName:"plus",iconPosition:"left",content:"Button with Icon"};const c=o.bind({});c.args={type:t.outline,iconName:"upload-cloud",iconPosition:"left",content:"Button with CloudIcon"};const l=o.bind({});l.args={type:t.primary,iconName:"archive",iconPosition:"left",content:"Button with archive"};const p=o.bind({});p.args={type:t.primary,iconName:"editing",iconPosition:"left",content:"Button with editing"};var f,v,h;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: '<Button v-bind="args">{{ args.content || "Button" }}</Button>'
})`,...(h=(v=m.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var B,y,I;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(I=(y=r.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var x,P,N;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(N=(P=a.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var b,w,C;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(C=(w=i.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,E,W;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(W=(E=n.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var V,j,O;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(O=(j=g.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var T,k,z;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(z=(k=s.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var A,D,G;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(G=(D=c.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var R,_,q;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(q=(_=l.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var F,H,J;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    Button,
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
    </div>
  \`
})`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const at=["Default","Primary","Secondary","Outline","Ghost","Reject","BtnWithIcon","BtnWithCloudIcon","BtnWithArchiveIcon","BtnWithEditingIcon"];export{l as BtnWithArchiveIcon,c as BtnWithCloudIcon,p as BtnWithEditingIcon,s as BtnWithIcon,m as Default,n as Ghost,i as Outline,r as Primary,g as Reject,a as Secondary,at as __namedExportsOrder,rt as default};
