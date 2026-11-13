import{P as p}from"./Popover-__RCyo2G.js";import{S as t}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-Ch_hEHxo.js";import"./Icon-aDUjpYAZ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-_7sF6k0B.js";import"./index-C4tPga3g.js";import"./Tooltip-Be0N7SgI.js";import"./change-style-properties-1EhjFsjc.js";const s=[{value:"value1",function:()=>console.log("function1")},{value:"value2 value2 value2",function:()=>console.log("function2")}],y={title:"Popover/Popover",component:p,argTypes:{title:{control:{type:t.text}},options:{control:{type:t.object}}},tags:["autodocs"]},i=a=>({components:{Popover:p},setup(){return{args:a}},template:`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Popover v-bind="args" />
    </div>
  `}),o=i.bind({});o.args={options:s};var e,r,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`args => ({
  components: {
    Popover
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Popover v-bind="args" />
    </div>
  \`
})`,...(n=(r=o.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const P=["Default"];export{o as Default,P as __namedExportsOrder,y as default};
