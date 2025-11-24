import{j as h,b as y,w as $,k as n,l as s,A as k,F as i,D as c,C as A,n as b,p as I}from"./vue.esm-bundler-CiAvViym.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as B}from"./Card-4RN64dIl.js";const q=["data-testid"],w=["data-testid"],D=["onClick","data-testid"],F=["data-testid"],T=h({name:"Tabs",__name:"Tabs",props:{defaultActiveTabId:{},tabCount:{},dataTestid:{default:"Tabs"}},emits:["unmount-tab"],setup(d,{emit:v}){const e=d,f=v,o=y({activeTab:1}),m=a=>Array.from({length:a},(C,t)=>t+1);$(()=>e.defaultActiveTabId,()=>{e.defaultActiveTabId&&(o.activeTab=e.defaultActiveTabId)},{immediate:!0});const g=a=>{o.activeTab=a,f("unmount-tab",a)};return(a,C)=>(n(),s("div",{"data-testid":e.dataTestid,class:"tabs"},[k("nav",{class:"tabs__navigation","data-testid":`${e.dataTestid}-Navigation`},[(n(!0),s(i,null,c(m(e.tabCount),t=>(n(),s("button",{key:t,onClick:V=>g(t),class:A(["tabs__navigation-button",{active:o.activeTab===t}]),"data-testid":`${e.dataTestid}-Navigation-Button`},[b(a.$slots,`header${t}`,{},void 0,!0)],10,D))),128))],8,w),(n(!0),s(i,null,c(m(e.tabCount),t=>(n(),s(i,{key:t},[o.activeTab===t?(n(),s("article",{key:0,"data-testid":`${e.dataTestid}-Content`,class:"tabs__navigation-content"},[b(a.$slots,`tab${t}`,{},void 0,!0)],8,F)):I("",!0)],64))),128))],8,q))}}),_=N(T,[["__scopeId","data-v-0e453d9a"]]);T.__docgenInfo={name:"Tabs",exportName:"default",displayName:"Tabs",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Tabs'"}},{name:"defaultActiveTabId",required:!1,type:{name:"number"}},{name:"tabCount",required:!0,type:{name:"number"}}],events:[{name:"unmount-tab",type:{names:["number"]}}],slots:[{name:"`header${index}`",scoped:!0,bindings:[{name:"name",title:"binding"}]},{name:"`tab${index}`",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Tabs/Tabs.vue"]};const L={title:"Tabs/Tabs",component:_,argTypes:{},tags:["autodocs"]},S=d=>({components:{Tabs:_,Card:B},setup(){return{args:d}},template:`
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
  `}),r=S.bind({});r.args={tabCount:2};var l,u,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const O=["Default"];export{r as Default,O as __namedExportsOrder,L as default};
