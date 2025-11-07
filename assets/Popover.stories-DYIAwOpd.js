import{P as p}from"./Popover-C9_1IOLB.js";import{S as e}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-C1Jsocv3.js";import"./Icon-BXqy_Axv.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-CdR1VJ3j.js";import"./Tooltip-DndxgQTX.js";import"./change-style-properties-1EhjFsjc.js";const s=[{value:"value1",function:()=>console.log("function1")},{value:"value2 value2 value2",function:()=>console.log("function2")}],x={title:"Popover/Popover",component:p,argTypes:{title:{control:{type:e.text}},options:{control:{type:e.object}}},tags:["autodocs"]},i=a=>({components:{Popover:p},setup(){return{args:a}},template:`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Popover v-bind="args" />
    </div>
  `}),o=i.bind({});o.args={options:s};var t,n,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => ({
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
})`,...(r=(n=o.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const y=["Default"];export{o as Default,y as __namedExportsOrder,x as default};
