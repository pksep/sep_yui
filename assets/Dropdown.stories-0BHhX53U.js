import{D as p}from"./Dropdown-DcXHtKje.js";import{S as e}from"./storybook-BJU81olc.js";import{f as i}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-DoruS_V8.js";import"./SelectList--fUsn_Tl.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-CLdhIAn3.js";import"./change-style-properties-1EhjFsjc.js";import"./Icon-DSmn-dBw.js";const s=["MainOptionMainOptionMainOption","Option1MainOptionMainOption","Option2MainOptionMainOption","Option3","Option4"],w={title:"Select/Dropdown",component:p,argTypes:{optionsItems:{type:e.object,defaultValue:s,onClick:{action:"clicked"}}},tags:["autodocs"],args:{onClick:i()}},m=a=>({components:{Dropdown:p},setup(){return{args:a}},template:`
    <Dropdown class="storybook__dropdown" v-bind="args" />
  `}),o=m.bind({});o.args={options:s};var t,n,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => ({
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
})`,...(r=(n=o.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const M=["Default"];export{o as Default,M as __namedExportsOrder,w as default};
