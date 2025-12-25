import{S as u}from"./storybook-BJU81olc.js";import{I as s,T as C}from"./enum-D-JvIl_F.js";import{I as q}from"./Input-C7kextzw.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./Icon-CqsT1NC-.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Button-Bk9jAkTK.js";import"./sizes-9jYRAigb.js";const J={title:"Input/Input",component:q,argTypes:{class:{control:{type:u.select},options:s},required:{control:{type:u.boolean},defaultValue:!1}},args:{placeholder:"Введите текст",type:C.text,inputMessage:"Текст"},tags:["autodocs"]},n=w=>({components:{Input:q},setup(){return{args:w}},template:`<Input v-bind="args" :disabled="args.class === 'disabled'" />`}),r=n.bind({});r.args={class:s.initial};const a=n.bind({});a.args={class:s.disabled};const e=n.bind({});e.args={class:s.error};const t=n.bind({});t.args={class:s.warning};const o=n.bind({});o.args={class:s.success};const p=n.bind({});p.args={class:s.ordinary};const c=n.bind({});c.args={class:s.minor};var d,i,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,g,b;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(b=(g=a.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var I,S,y;e.parameters={...e.parameters,docs:{...(I=e.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(y=(S=e.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var f,v,E;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(E=(v=t.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};var T,x,D;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(D=(x=o.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};var M,O,W;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(W=(O=p.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var _,h,k;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(k=(h=c.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};const K=["InputDefault","InputDisabled","InputError","InputWarning","InputSuccess","InputOrdinary","InputMinor"];export{r as InputDefault,a as InputDisabled,e as InputError,c as InputMinor,p as InputOrdinary,o as InputSuccess,t as InputWarning,K as __namedExportsOrder,J as default};
