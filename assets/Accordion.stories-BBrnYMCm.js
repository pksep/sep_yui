import{S as k}from"./storybook-BJU81olc.js";import{j as f,k as u,l as _,D as h,n as o,x as d,u as c,U as A}from"./vue.esm-bundler-DJ2C_uUp.js";import{I as r,a as n}from"./Icon-CdZCiVYH.js";import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T=["data-testid"],g=["data-testid"],y=f({__name:"Accordion",props:{dataTestid:{default:"Accordion"}},setup(e){const t=e;return(s,I)=>(u(),_("details",{class:"accordion-yui-kit","data-testid":t.dataTestid},[h("summary",{class:"accordion-yui-kit__summary","data-testid":`${t.dataTestid}-Summary`},[o(s.$slots,"summary",{},void 0,!0),d(n,{name:c(r).chevronUp,class:"chevron-up","stroke-width":"2","data-testid":`${t.dataTestid}-ChevronUp`},null,8,["name","data-testid"]),d(n,{name:c(r).chevronDown,class:"chevron-down","stroke-width":"2","data-testid":`${t.dataTestid}-ChevronDown`},null,8,["name","data-testid"])],8,g),o(s.$slots,"default",{},void 0,!0)],8,T))}}),v=p(y,[["__scopeId","data-v-0e900f78"]]);y.__docgenInfo={exportName:"default",displayName:"Accordion",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Accordion'"}}],slots:[{name:"summary"},{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Accordion/Accordion.vue"]};const b={},x={class:"table-yui-kit__border"};function E(e,t){return u(),_("div",x,[...t[0]||(t[0]=[A('<table class="table-yui-kit" data-v-4659c464><thead data-v-4659c464><tr class="table-yui-kit__tr" data-v-4659c464><th class="table-yui-kit__th" data-v-4659c464>№</th><th class="table-yui-kit__th" data-v-4659c464>Lorem ipsum</th><th class="table-yui-kit__th" data-v-4659c464>Lorem ipsum</th></tr></thead><tbody data-v-4659c464><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>1</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>2</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>3</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr></tbody></table>',1)])])}const L=p(b,[["render",E],["__scopeId","data-v-4659c464"]]);b.__docgenInfo={displayName:"ExampleTable",description:"",tags:{},sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Accordion/ExampleTable.vue"]};const V={title:"Accordion/Accordion",component:v,argTypes:{pressed:{control:{type:k.boolean},defaultValue:!1}},tags:["autodocs"]},w=e=>({components:{Accordion:v,ExampleTable:L},setup(){return{args:e}},template:`
    <Accordion>
    <template #summary>
        Откройте для детальной информации
    </template>
            <ExampleTable />
    </Accordion>
  `}),a=w.bind({});a.args={};var i,l,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    Accordion,
    ExampleTable
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Accordion>
    <template #summary>
        Откройте для детальной информации
    </template>
            <ExampleTable />
    </Accordion>
  \`
})`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const C=["Default"];export{a as Default,C as __namedExportsOrder,V as default};
