import{f as h,w as y,j as n,v as $,F as i,A as c,q as s,n as k,H as b,k as A,d as I}from"./vue.esm-bundler-BR4_nak_.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as q}from"./Card-DpHc3HP2.js";const B=["data-testid"],w=["data-testid"],F=["onClick","data-testid"],S=["data-testid"],T=h({name:"Tabs",__name:"Tabs",props:{defaultActiveTabId:{},tabCount:{},dataTestid:{default:"Tabs"}},emits:["unmount-tab"],setup(d,{emit:_}){const e=d,f=_,r=I({activeTab:1}),m=a=>Array.from({length:a},(C,t)=>t+1);y(()=>e.defaultActiveTabId,()=>{e.defaultActiveTabId&&(r.activeTab=e.defaultActiveTabId)},{immediate:!0});const g=a=>{r.activeTab=a,f("unmount-tab",a)};return(a,C)=>(s(),n("div",{"data-testid":e.dataTestid,class:"tabs"},[$("nav",{class:"tabs__navigation","data-testid":`${e.dataTestid}-Navigation`},[(s(!0),n(i,null,c(m(e.tabCount),t=>(s(),n("button",{key:t,onClick:D=>g(t),class:k(["tabs__navigation-button",{active:r.activeTab===t}]),"data-testid":`${e.dataTestid}-Navigation-Button`},[b(a.$slots,`header${t}`,{active:r.activeTab===t},void 0,!0)],10,F))),128))],8,w),(s(!0),n(i,null,c(m(e.tabCount),t=>(s(),n(i,{key:t},[r.activeTab===t?(s(),n("article",{key:0,"data-testid":`${e.dataTestid}-Content`,class:"tabs__navigation-content"},[b(a.$slots,`tab${t}`,{},void 0,!0)],8,S)):A("",!0)],64))),128))],8,B))}}),v=N(T,[["__scopeId","data-v-e5802f92"]]);T.__docgenInfo={name:"Tabs",exportName:"default",displayName:"Tabs",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Tabs'"}},{name:"defaultActiveTabId",required:!1,type:{name:"number"}},{name:"tabCount",required:!0,type:{name:"number"}}],events:[{name:"unmount-tab",type:{names:["number"]}}],slots:[{name:"`header${index}`",scoped:!0,bindings:[{name:"name",title:"binding"},{name:"active",title:"binding"}]},{name:"`tab${index}`",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Tabs/Tabs.vue"]};const H={title:"Tabs/Tabs",component:v,argTypes:{},tags:["autodocs"]},V=d=>({components:{Tabs:v,Card:q},setup(){return{args:d}},template:`
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
  `}),o=V.bind({});o.args={tabCount:2};var l,u,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const L=["Default"];export{o as Default,L as __namedExportsOrder,H as default};
