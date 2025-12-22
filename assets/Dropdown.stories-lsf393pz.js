import{D as p}from"./Dropdown-Bf6B53at.js";import{S as e}from"./storybook-BJU81olc.js";import{f as i}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./SelectList-Dp9vj95N.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-DtW3Gt5I.js";import"./Icon-tNVdE72s.js";const s=["MainOptionMainOptionMainOption","Option1MainOptionMainOption","Option2MainOptionMainOption","Option3","Option4"],b={title:"Select/Dropdown",component:p,argTypes:{optionsItems:{type:e.object,defaultValue:s,onClick:{action:"clicked"}}},tags:["autodocs"],args:{onClick:i()}},m=a=>({components:{Dropdown:p},setup(){return{args:a}},template:`
    <Dropdown class="storybook__dropdown" v-bind="args" />
  `}),o=m.bind({});o.args={options:s};var n,t,r;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`args => ({
  components: {
    Dropdown
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Dropdown class="storybook__dropdown" v-bind="args" />
  \`
})`,...(r=(t=o.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const w=["Default"];export{o as Default,w as __namedExportsOrder,b as default};
