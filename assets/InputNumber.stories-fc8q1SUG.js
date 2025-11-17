import{I as C}from"./InputNumber-B6ScVLll.js";import{S as d}from"./storybook-BJU81olc.js";import{S as M}from"./sizes-9jYRAigb.js";import"./vue.esm-bundler-lZQpEf4m.js";import"./Icon-0LxXR4XV.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";var s=(r=>(r.initial="initial",r.error="error",r.warning="warning",r.success="success",r.ordinary="ordinary",r.disabled="disabled",r.minor="minor",r))(s||{});const H={title:"InputNumber/InputNumber",component:C,argTypes:{class:{control:{type:d.select},options:s},required:{control:{type:d.boolean},defaultValue:!1},size:{control:{type:d.select},options:M}},args:{inputMessage:""},tags:["autodocs"]},e=r=>({components:{InputNumber:C},setup(){return{args:r}},template:`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />`}),n=e.bind({});n.args={class:s.initial};const a=e.bind({});a.args={class:s.disabled};const t=e.bind({});t.args={class:s.error};const o=e.bind({});o.args={class:s.warning};const c=e.bind({});c.args={class:s.success};const u=e.bind({});u.args={class:s.ordinary};const p=e.bind({});p.args={class:"active"};var i,m,l;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var b,g,I;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(I=(g=a.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var N,S,v;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(v=(S=t.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var f,y,D;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(D=(y=o.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var w,O,x;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(x=(O=c.parameters)==null?void 0:O.docs)==null?void 0:x.source}}};var z,A,W;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(W=(A=u.parameters)==null?void 0:A.docs)==null?void 0:W.source}}};var _,k,q;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(q=(k=p.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const J=["InputNumberDefault","InputDisabled","InputError","InputWarning","InputSuccess","InputOrdinary","InputActive"];export{p as InputActive,a as InputDisabled,t as InputError,n as InputNumberDefault,u as InputOrdinary,c as InputSuccess,o as InputWarning,J as __namedExportsOrder,H as default};
