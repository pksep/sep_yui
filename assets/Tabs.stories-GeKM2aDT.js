import{j as h,b as y,k as n,l as s,D as $,F as i,B as c,z as k,n as b,p as N}from"./vue.esm-bundler-DJ2C_uUp.js";import{_ as B}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as D}from"./Card-MrUD6NKM.js";const F=["data-testid"],S=["data-testid"],V=["onClick","data-testid"],q=["data-testid"],T=h({name:"Tabs",__name:"Tabs",props:{tabCount:{},dataTestid:{default:"Tabs"}},emits:["unmount-tab"],setup(o,{emit:g}){const a=o,v=g,d=y({activeTab:1}),m=e=>Array.from({length:e},(f,t)=>t+1),C=e=>{d.activeTab=e,v("unmount-tab",e)};return(e,f)=>(n(),s("div",{"data-testid":a.dataTestid,class:"tabs"},[$("nav",{class:"tabs__navigation","data-testid":`${a.dataTestid}-Navigation`},[(n(!0),s(i,null,c(m(a.tabCount),t=>(n(),s("button",{key:t,onClick:A=>C(t),class:k(["tabs__navigation-button",{active:d.activeTab===t}]),"data-testid":`${a.dataTestid}-Navigation-Button`},[b(e.$slots,`header${t}`,{},void 0,!0)],10,V))),128))],8,S),(n(!0),s(i,null,c(m(a.tabCount),t=>(n(),s(i,{key:t},[d.activeTab===t?(n(),s("article",{key:0,"data-testid":`${a.dataTestid}-Content`,class:"tabs__navigation-content"},[b(e.$slots,`tab${t}`,{},void 0,!0)],8,q)):N("",!0)],64))),128))],8,F))}}),_=B(T,[["__scopeId","data-v-7f7d6755"]]);T.__docgenInfo={name:"Tabs",exportName:"default",displayName:"Tabs",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Tabs'"}},{name:"tabCount",required:!0,type:{name:"number"}}],events:[{name:"unmount-tab",type:{names:["number"]}}],slots:[{name:"`header${index}`",scoped:!0,bindings:[{name:"name",title:"binding"}]},{name:"`tab${index}`",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Tabs/Tabs.vue"]};const w={title:"Tabs/Tabs",component:_,argTypes:{},tags:["autodocs"]},z=o=>({components:{Tabs:_,Card:D},setup(){return{args:o}},template:`
  <Tabs v-bind="args">
  <template #header1>
   Tab 1
  </template>
  <template #header2>
     Tab 2
  </template>
  <template #tab1>
    <Card>
      Tab 1 test content
    </Card>
    </template>
    <template #tab2>
      <Card>
        Tab 2 test content
      </Card>
      </template>
  </Tabs>
  `}),r=z.bind({});r.args={tabCount:2};var l,p,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  components: {
    Tabs,
    Card
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <Tabs v-bind="args">
  <template #header1>
   Tab 1
  </template>
  <template #header2>
     Tab 2
  </template>
  <template #tab1>
    <Card>
      Tab 1 test content
    </Card>
    </template>
    <template #tab2>
      <Card>
        Tab 2 test content
      </Card>
      </template>
  </Tabs>
  \`
})`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const L=["Default"];export{r as Default,L as __namedExportsOrder,w as default};
