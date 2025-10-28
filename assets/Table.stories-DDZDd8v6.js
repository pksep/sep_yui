import{j as P,b as L,r as d,s as U,k as b,H as v,I as u,x as S,n as T,l as _,E as j,p}from"./vue.esm-bundler-DC1UwcWE.js";import{H as k,T as x,S as F,_ as A,a as G,b as J}from"./SectionTableRow-BO-xy6jY.js";import{c as H}from"./change-style-properties-1EhjFsjc.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as Q}from"./index-CGbn3E6N.js";const X=["id","data-testid"],Y=["id","data-testid"],Z=["id","data-testid"],q=P({name:"TableNew",__name:"Table",props:{tableId:{},search:{},tbodyId:{},theadId:{},columnCount:{},dataTestid:{default:"Table"},isShowVerticalScroll:{type:Boolean,default:!1},isShowHorizontalScroll:{type:Boolean,default:!1}},emits:["unmount-scroll","unmount-paginate"],setup(c,{expose:z,emit:N}){var f;const a=c,m=N,s=L({headHeight:0,maxColumnCount:0}),n=d(null),o=d(null),h=d(null),w=d(null),t=d(null),B=e=>{m("unmount-scroll",e)},M=e=>m("unmount-paginate",e),i=()=>{if(!n.value||!t.value)return;const e=n.value.querySelector("thead");if(!e)return;const l=e.getBoundingClientRect().height;s.headHeight=l,H({"--scroll-track-margin-top":`${l}px`},t.value.$el)},E=()=>{t.value&&t.value.scrollToTop()},O=()=>{if(t.value&&w.value){const e=getComputedStyle(t.value.$el),l=Number(e.minHeight.replace(/\D/g,""));if(l&&l>0)return;H({"min-height":`${s.headHeight+108}px`},t.value.$el)}},R=()=>{let e=1;if(o.value){for(let l=0;l<o.value.children.length;l++)e=Math.max(o.value.children[l].children.length,e);s.maxColumnCount=e}},W=new MutationObserver(()=>{R()}),D=new ResizeObserver(()=>{i()});return z({scrollToTop:E,setHeightSlot:(f=t.value)==null?void 0:f.setHeightSlot,tbodyRef:h,tableRef:n,theadRef:o}),U(()=>{i(),R(),window.addEventListener("resize",i),n.value&&D.observe(n.value),o.value&&W.observe(o.value,{childList:!0,subtree:!0}),O()}),(e,l)=>(b(),v(F,{ref_key:"scrollWrapperRef",ref:t,class:"table",onUnmountScroll:B,onUnmountPaginate:M,"is-show-vertical-scroll":a.isShowVerticalScroll,"is-show-horizontal-scroll":a.isShowHorizontalScroll,"data-testid":`${a.dataTestid}-ScrollWrapper`},{default:u(()=>[S("table",{ref_key:"tableRef",ref:n,id:a.tableId,class:"table__table","data-testid":`${a.dataTestid}`},[T(e.$slots,"default",{},()=>{var y;return[S("colgroup",null,[T(e.$slots,"colspan",{},void 0,!0)]),e.$slots.head?(b(),_("thead",{key:0,ref_key:"theadRef",ref:o,id:a.theadId,class:"table__head","data-testid":`${a.dataTestid}-Thead`},[T(e.$slots,"head",{},void 0,!0),e.$slots.search?(b(),v(k,{key:0,class:"table__search-tr",id:(y=a.search)==null?void 0:y.rowId,ref_key:"searchRowRef",ref:w,"data-testid":`${a.dataTestid}-Search-Row`},{default:u(()=>{var g;return[j(x,{colspan:a.columnCount||s.maxColumnCount,class:"table__search-th",id:(g=a.search)==null?void 0:g.headId,"data-testid":`${a.dataTestid}-SearchRow-Search`},{default:u(()=>[T(e.$slots,"search",{},void 0,!0)]),_:3},8,["colspan","id","data-testid"])]}),_:3},8,["id","data-testid"])):p("",!0)],8,Y)):p("",!0),T(e.$slots,"body-group",{},()=>[e.$slots.body?(b(),_("tbody",{key:0,id:a.tbodyId,ref_key:"tbodyRef",ref:h,class:"table__body","data-testid":`${a.dataTestid}-Tbody`},[T(e.$slots,"body",{},void 0,!0)],8,Z)):p("",!0)],!0)]},!0)],8,X)]),_:3},8,["is-show-vertical-scroll","is-show-horizontal-scroll","data-testid"]))}}),V=K(q,[["__scopeId","data-v-58c866b5"]]);q.__docgenInfo={name:"TableNew",exportName:"default",displayName:"Table",description:"",tags:{},expose:[{name:"scrollToTop"},{name:"setHeightSlot"},{name:"tbodyRef"},{name:"tableRef"},{name:"theadRef"}],props:[{name:"isShowHorizontalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowVerticalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Table'"}},{name:"tableId",required:!1,type:{name:"string"}},{name:"search",required:!1,type:{name:`{
    rowId?: string;
    headId?: string;
}`}},{name:"tbodyId",required:!1,type:{name:"string"}},{name:"theadId",required:!1,type:{name:"string"}},{name:"columnCount",required:!1,type:{name:"number"}}],events:[{name:"unmount-scroll",type:{names:["Event"]}},{name:"unmount-paginate",type:{names:["boolean"]}}],slots:[{name:"default"},{name:"colspan"},{name:"head"},{name:"search"},{name:"body-group"},{name:"body"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/Table.vue"]};const Te={title:"Table/Table",component:V,args:{onClick:Q()},tags:["autodocs"]},ee=c=>({components:{Table:V,HeadTableRow:k,TableTh:x,TableTd:A,TableRow:G,SectionTableRow:J},setup(){return{args:c}},template:`<Table style="--table-body-max-height:150px;">


    <template #head>
      <HeadTableRow>
        <TableTh colspan="2">Заголовок</TableTh>
      
      </HeadTableRow>

      <HeadTableRow>
        <TableTh>Подзаголовок</TableTh>
        <TableTh>Подзаголовок 2</TableTh>
      </HeadTableRow>
    </template>
    
    <template #body>
      <TableRow>
        <TableTd>Значние 1</TableTd>
        <TableTd>Подзначение 1</TableTd>
      </TableRow>

      <SectionTableRow colspan="2">Разделительный заголовок</SectionTableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>
    </template>
  </Table>`}),r=ee.bind({});var $,C,I;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  components: {
    Table,
    HeadTableRow,
    TableTh,
    TableTd,
    TableRow,
    SectionTableRow
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Table style="--table-body-max-height:150px;">


    <template #head>
      <HeadTableRow>
        <TableTh colspan="2">Заголовок</TableTh>
      
      </HeadTableRow>

      <HeadTableRow>
        <TableTh>Подзаголовок</TableTh>
        <TableTh>Подзаголовок 2</TableTh>
      </HeadTableRow>
    </template>
    
    <template #body>
      <TableRow>
        <TableTd>Значние 1</TableTd>
        <TableTd>Подзначение 1</TableTd>
      </TableRow>

      <SectionTableRow colspan="2">Разделительный заголовок</SectionTableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>
    </template>
  </Table>\`
})`,...(I=(C=r.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const de=["Default"];export{r as Default,de as __namedExportsOrder,Te as default};
