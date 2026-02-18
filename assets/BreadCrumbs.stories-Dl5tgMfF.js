import{B as l}from"./BreadCrumbs-B6bwqdjR.js";import{S as n}from"./storybook-BJU81olc.js";import{r as o}from"./vue.esm-bundler-DoruS_V8.js";import"./Icon-DSmn-dBw.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const e=o([{path:"/assembly",title:"Главная"},{path:"",title:"База деталей"},{path:"/assembly3",title:"Редактор Детали "},{path:"/assembly4",title:"База материалов"},{path:"/assembly6",title:"База оборудования"},{path:"/assembly7",title:"База инструментов"},{path:"/story/breadcrumbs",title:"База покупателей awef awe wef we "},{path:"",title:"Несуществующая База"},{path:"/assembly9",title:"База продавцов awef awe wef we "}]),i=s=>{e.value=e.value.slice(0,s.inx)},g={title:"BreadCrumbs/BreadCrumbs",component:l,argTypes:{items:{type:n.object,defaultValue:e}},args:{onClick:{path:"path",title:"name"}},tags:["autodocs"]},p=s=>({components:{BreadCrumbs:l},setup(){return{args:s,crumbsItems:e,breadCrumbsSelect:i}},template:`<div style="margin-top: 100px"><BreadCrumbs v-bind="args" :items="crumbsItems"       :key="crumbsItems.length"
      @click="breadCrumbsSelect"/>
  </div>`}),t=p.bind({});t.args={key:e.value.length,items:e};var a,r,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    BreadCrumbs
  },
  setup() {
    return {
      args,
      crumbsItems,
      breadCrumbsSelect
    };
  },
  template: \`<div style="margin-top: 100px"><BreadCrumbs v-bind="args" :items="crumbsItems"       :key="crumbsItems.length"
      @click="breadCrumbsSelect"/>
  </div>\`
})`,...(m=(r=t.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};const h=["Default"];export{t as Default,h as __namedExportsOrder,g as default};
