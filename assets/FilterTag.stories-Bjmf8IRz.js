import{F as l}from"./FilterTag-BXnw3v6U.js";import{S as r}from"./storybook-BJU81olc.js";import{a as t}from"./Badges-Cug6Y6La.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./Icon-CqsT1NC-.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-DtW3Gt5I.js";const p=[{value:"value1",type:t.pink,label:"Удалено"},{value:"value2",type:t.red,label:"Просрочено"},{value:"value3",type:t.blue,label:"Покупатель"}],b={title:"Filter/FilterTag",component:l,argTypes:{title:{control:{type:r.text}},options:{control:{type:r.object}}},tags:["autodocs"]},i=s=>({components:{FilterTag:l},setup(){return{args:s}},template:`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <FilterTag v-bind="args" />
    </div>
  `}),e=i.bind({});e.args={title:"Статус",options:p};var a,o,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    FilterTag
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <FilterTag v-bind="args" />
    </div>
  \`
})`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,b as default};
