import{a,I as s}from"./Icon-B-azytQy.js";import{S as t}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-CCGp2uGQ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const u={title:"Icon/Icon",component:a,argTypes:{height:{control:{type:t.number},defaultValue:24},width:{control:{type:t.number},defaultValue:24},name:{control:{type:t.select},options:s},color:{control:{type:t.color}}},tags:["autodocs"]},o=c=>({components:{Icon:a},setup(){return{args:c}},template:`
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  `});o.args={name:s.notification};var n,e,r;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`args => ({
  components: {
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  \`
})`,...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const d=["Default"];export{o as Default,d as __namedExportsOrder,u as default};
