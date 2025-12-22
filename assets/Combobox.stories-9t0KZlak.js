import{C as r}from"./Combobox-BLCvDK4x.js";import{S as i}from"./storybook-BJU81olc.js";import{f as p}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./SelectList-Dp9vj95N.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-DtW3Gt5I.js";const s=["MainOptionMainOptionMainOption","Option1MainOptionMainOption","Option2MainOptionMainOption","Option3","Option4"],C={title:"Select/Combobox",component:r,argTypes:{optionsItems:{type:i.object,onClick:{action:"clicked"}}},tags:["autodocs"],args:{onClick:p()}},m=a=>({components:{Combobox:r},setup(){return{args:a}},template:`
    <Combobox v-bind="args" />
  `}),o=m.bind({});o.args={options:s};var t,n,e;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => ({
  components: {
    Combobox
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Combobox v-bind="args" />
  \`
})`,...(e=(n=o.parameters)==null?void 0:n.docs)==null?void 0:e.source}}};const f=["Default"];export{o as Default,f as __namedExportsOrder,C as default};
