import{S as f}from"./storybook-BJU81olc.js";import{f as k,j as u,v as h,H as o,x as d,u as c,q as _,U as A}from"./vue.esm-bundler-BR4_nak_.js";import{I as r,a as n}from"./Icon-6CJLfYFP.js";import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T=["data-testid"],g=["data-testid"],y=k({__name:"Accordion",props:{dataTestid:{default:"Accordion"}},setup(e){const t=e;return(s,I)=>(_(),u("details",{class:"accordion-yui-kit","data-testid":t.dataTestid},[h("summary",{class:"accordion-yui-kit__summary","data-testid":`${t.dataTestid}-Summary`},[o(s.$slots,"summary",{},void 0,!0),d(r,{name:c(n).chevronUp,class:"chevron-up","stroke-width":"2","data-testid":`${t.dataTestid}-ChevronUp`},null,8,["name","data-testid"]),d(r,{name:c(n).chevronDown,class:"chevron-down","stroke-width":"2","data-testid":`${t.dataTestid}-ChevronDown`},null,8,["name","data-testid"])],8,g),o(s.$slots,"default",{},void 0,!0)],8,T))}}),b=p(y,[["__scopeId","data-v-b9b27643"]]);y.__docgenInfo={exportName:"default",displayName:"Accordion",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Accordion'"}}],slots:[{name:"summary"},{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Accordion/Accordion.vue"]};const v={},x={class:"table-yui-kit__border"};function E(e,t){return _(),u("div",x,[...t[0]||(t[0]=[A('<table class="table-yui-kit" data-v-4659c464><thead data-v-4659c464><tr class="table-yui-kit__tr" data-v-4659c464><th class="table-yui-kit__th" data-v-4659c464>№</th><th class="table-yui-kit__th" data-v-4659c464>Lorem ipsum</th><th class="table-yui-kit__th" data-v-4659c464>Lorem ipsum</th></tr></thead><tbody data-v-4659c464><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>1</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>2</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr><tr class="table-yui-kit__tr" data-v-4659c464><td class="table-yui-kit__td" data-v-4659c464>3</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td><td class="table-yui-kit__td" data-v-4659c464>Lorem ipsum</td></tr></tbody></table>',1)])])}const L=p(v,[["render",E],["__scopeId","data-v-4659c464"]]);v.__docgenInfo={displayName:"ExampleTable",description:"",tags:{},sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Accordion/ExampleTable.vue"]};const C={title:"Accordion/Accordion",component:b,argTypes:{pressed:{control:{type:f.boolean},defaultValue:!1}},tags:["autodocs"]},w=e=>({components:{Accordion:b,ExampleTable:L},setup(){return{args:e}},template:`
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
})`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const D=["Default"];export{a as Default,D as __namedExportsOrder,C as default};
