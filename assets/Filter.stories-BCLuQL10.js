import{F as p}from"./Filter-D5v3145y.js";import{S as o}from"./storybook-BJU81olc.js";import{a as e}from"./Badges-D0ahzjay.js";import"./vue.esm-bundler-DwgwRRKm.js";import"./Search-NxSqUKGp.js";import"./Icon-DPPrtFKC.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Button-HqjrJPjf.js";import"./sizes-9jYRAigb.js";import"./lodash-DHyxJ22h.js";import"./_commonjsHelpers-Cpj98o6Y.js";const l=[{value:"Все",type:e.default},{value:"Удалено",type:e.pink},{value:"Просрочено",type:e.red},{value:"Покупатель",type:e.blue},{value:"Заказано",type:e.orange},{value:"Отгружено",type:e.green}],E={title:"Filter/Filter",component:p,argTypes:{title:{control:{type:o.text}},options:{control:{type:o.object}}},tags:["autodocs"]},i=s=>({components:{Filter:p},setup(){return{args:s}},template:`
    <div style="display: flex; flex-direction: row; gap: 12px; color: args.color">
      <Filter v-bind="args" />
    </div>
  `}),t=i.bind({});t.args={title:"Статус",options:l};var r,a,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
  components: {
    Filter
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="display: flex; flex-direction: row; gap: 12px; color: args.color">
      <Filter v-bind="args" />
    </div>
  \`
})`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const S=["Default"];export{t as Default,S as __namedExportsOrder,E as default};
