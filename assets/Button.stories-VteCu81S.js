import{B as u,a as o}from"./Button-CkelqJH3.js";import{a as L,I as M}from"./Icon-DaKYYYyB.js";import{S as Q}from"./sizes-9jYRAigb.js";import{S as n}from"./storybook-BJU81olc.js";import{f as U}from"./index-CAp0N5ye.js";import"./vue.esm-bundler-BR4_nak_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var K=(t=>(t.primary="primary",t.secondary="secondary",t.red="red",t.green="green",t.yellow="yellow",t.blue="blue",t.white="white",t.black="black",t))(K||{});const nt={title:"Button/Button",component:u,argTypes:{disabled:{control:{type:n.boolean},defaultValue:!1},pill:{control:{type:n.boolean},defaultValue:!1},size:{control:{type:n.radio},options:Q},type:{control:{type:n.select},options:o},content:{control:{type:n.text},description:"Кастомный контент кнопки",defaultValue:{summary:"Button"}},iconName:{control:{type:n.select},description:"Имя иконки",options:L},iconPosition:{control:{type:n.radio},options:["left","right"],description:"Позиция иконки",defaultValue:"left"},iconColor:{control:{type:n.select},description:"Цвет иконки",options:K}},tags:["autodocs"],args:{onClick:U()}},e=t=>({components:{Button:u,Icon:M},setup(){return{args:t}},template:`
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
  `}),g=t=>({components:{Button:u},setup(){return{args:t}},template:'<Button v-bind="args">{{ args.content || "Button" }}</Button>'}),a=e.bind({});a.args={type:o.primary};const i=e.bind({});i.args={type:o.secondary};const s=e.bind({});s.args={type:o.outline};const r=e.bind({});r.args={type:o.ghost};const d=e.bind({});r.args={type:o.reject};const c=e.bind({});c.args={type:o.primary,iconName:"plus",iconPosition:"left",content:"Button with Icon"};const l=e.bind({});l.args={type:o.outline,iconName:"upload-cloud",iconPosition:"left",content:"Button with CloudIcon"};const p=e.bind({});p.args={type:o.primary,iconName:"archive",iconPosition:"left",content:"Button with archive"};const m=e.bind({});m.args={type:o.primary,iconName:"editing",iconPosition:"left",content:"Button with editing"};var f,v,h;g.parameters={...g.parameters,docs:{...(f=g.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: '<Button v-bind="args">{{ args.content || "Button" }}</Button>'
})`,...(h=(v=g.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var B,y,I;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`args => ({
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
})`,...(I=(y=a.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var x,b,w;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
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
})`,...(w=(b=i.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var P,N,S;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
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
})`,...(S=(N=s.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var C,W,k;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
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
})`,...(k=(W=r.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var V,j,O;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
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
})`,...(O=(j=d.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var T,z,A;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
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
})`,...(A=(z=c.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var D,G,R;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
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
})`,...(R=(G=l.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var _,q,E;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(E=(q=p.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var F,H,J;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
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
})`,...(J=(H=m.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const rt=["Default","Primary","Secondary","Outline","Ghost","Reject","BtnWithIcon","BtnWithCloudIcon","BtnWithArchiveIcon","BtnWithEditingIcon"];export{p as BtnWithArchiveIcon,l as BtnWithCloudIcon,m as BtnWithEditingIcon,c as BtnWithIcon,g as Default,r as Ghost,s as Outline,a as Primary,d as Reject,i as Secondary,rt as __namedExportsOrder,nt as default};
