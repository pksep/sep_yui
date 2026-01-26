import{C as r}from"./Combobox-BI4IYM_W.js";import{S as a}from"./storybook-BJU81olc.js";import{f as p}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-BHGztBRP.js";import"./SelectList-KZ_FBp6l.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-D5_7ZNz9.js";import"./change-style-properties-1EhjFsjc.js";const s=["MainOptionMainOptionMainOption","Option1MainOptionMainOption","Option2MainOptionMainOption","Option3","Option4"],f={title:"Select/Combobox",component:r,argTypes:{optionsItems:{type:a.object,onClick:{action:"clicked"}}},tags:["autodocs"],args:{onClick:p()}},m=i=>({components:{Combobox:r},setup(){return{args:i}},template:`
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
})`,...(e=(n=o.parameters)==null?void 0:n.docs)==null?void 0:e.source}}};const x=["Default"];export{o as Default,x as __namedExportsOrder,f as default};
