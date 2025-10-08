import{j as W,b as L,r as d,q as j,k as b,v,y as u,D as g,n as T,l as S,x as F,p}from"./vue.esm-bundler-DJ2C_uUp.js";import{H as k,T as I,S as P,_ as U,a as A,b as G}from"./SectionTableRow-JhkVnghl.js";import{c as _}from"./change-style-properties-1EhjFsjc.js";import{_ as J}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as K}from"./index-CGbn3E6N.js";const Q=["id","data-testid"],X=["id","data-testid"],Y=["id","data-testid"],x=W({name:"TableNew",__name:"Table",props:{tableId:{},search:{},tbodyId:{},theadId:{},columnCount:{},dataTestid:{default:"Table"},isShowVerticalScroll:{type:Boolean,default:!1},isShowHorizontalScroll:{type:Boolean,default:!1}},emits:["unmount-scroll","unmount-intersection"],setup(c,{expose:V,emit:z}){var R;const a=c,N=z,s=L({headHeight:0,maxColumnCount:0}),n=d(null),o=d(null),m=d(null),h=d(null),t=d(null),B=e=>{N("unmount-scroll",e)},i=()=>{if(!n.value||!t.value)return;const e=n.value.querySelector("thead");if(!e)return;const l=e.getBoundingClientRect().height;s.headHeight=l,_({"--scroll-track-margin-top":`${l}px`},t.value.$el)},M=()=>{t.value&&t.value.scrollToTop()},O=()=>{if(t.value&&h.value){const e=getComputedStyle(t.value.$el),l=Number(e.minHeight.replace(/\D/g,""));if(l&&l>0)return;_({"min-height":`${s.headHeight+108}px`},t.value.$el)}},w=()=>{let e=1;if(o.value){for(let l=0;l<o.value.children.length;l++)e=Math.max(o.value.children[l].children.length,e);s.maxColumnCount=e}},D=new MutationObserver(()=>{w()}),E=new ResizeObserver(()=>{i()});return V({scrollToTop:M,setHeightSlot:(R=t.value)==null?void 0:R.setHeightSlot,tbodyRef:m,tableRef:n,theadRef:o}),j(()=>{i(),w(),window.addEventListener("resize",i),n.value&&E.observe(n.value),o.value&&D.observe(o.value,{childList:!0,subtree:!0}),O()}),(e,l)=>(b(),v(P,{ref_key:"scrollWrapperRef",ref:t,class:"table",onUnmountScroll:B,"is-show-vertical-scroll":a.isShowVerticalScroll,"is-show-horizontal-scroll":a.isShowHorizontalScroll,"data-testid":`${a.dataTestid}-ScrollWrapper`},{default:u(()=>[g("table",{ref_key:"tableRef",ref:n,id:a.tableId,class:"table__table","data-testid":`${a.dataTestid}`},[T(e.$slots,"default",{},()=>{var f;return[g("colgroup",null,[T(e.$slots,"colspan",{},void 0,!0)]),e.$slots.head?(b(),S("thead",{key:0,ref_key:"theadRef",ref:o,id:a.theadId,class:"table__head","data-testid":`${a.dataTestid}-Thead`},[T(e.$slots,"head",{},void 0,!0),e.$slots.search?(b(),v(k,{key:0,class:"table__search-tr",id:(f=a.search)==null?void 0:f.rowId,ref_key:"searchRowRef",ref:h,"data-testid":`${a.dataTestid}-Search-Row`},{default:u(()=>{var y;return[F(I,{colspan:a.columnCount||s.maxColumnCount,class:"table__search-th",id:(y=a.search)==null?void 0:y.headId,"data-testid":`${a.dataTestid}-SearchRow-Search`},{default:u(()=>[T(e.$slots,"search",{},void 0,!0)]),_:3},8,["colspan","id","data-testid"])]}),_:3},8,["id","data-testid"])):p("",!0)],8,X)):p("",!0),T(e.$slots,"body-group",{},()=>[e.$slots.body?(b(),S("tbody",{key:0,id:a.tbodyId,ref_key:"tbodyRef",ref:m,class:"table__body","data-testid":`${a.dataTestid}-Tbody`},[T(e.$slots,"body",{},void 0,!0)],8,Y)):p("",!0)],!0)]},!0)],8,Q)]),_:3},8,["is-show-vertical-scroll","is-show-horizontal-scroll","data-testid"]))}}),q=J(x,[["__scopeId","data-v-5f4638a2"]]);x.__docgenInfo={name:"TableNew",exportName:"default",displayName:"Table",description:"",tags:{},expose:[{name:"scrollToTop"},{name:"setHeightSlot"},{name:"tbodyRef"},{name:"tableRef"},{name:"theadRef"}],props:[{name:"isShowHorizontalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowVerticalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Table'"}},{name:"tableId",required:!1,type:{name:"string"}},{name:"search",required:!1,type:{name:`{
    rowId?: string;
    headId?: string;
}`}},{name:"tbodyId",required:!1,type:{name:"string"}},{name:"theadId",required:!1,type:{name:"string"}},{name:"columnCount",required:!1,type:{name:"number"}}],events:[{name:"unmount-scroll",type:{names:["Event"]}},{name:"unmount-intersection"}],slots:[{name:"default"},{name:"colspan"},{name:"head"},{name:"search"},{name:"body-group"},{name:"body"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/Table.vue"]};const ne={title:"Table/Table",component:q,args:{onClick:K()},tags:["autodocs"]},Z=c=>({components:{Table:q,HeadTableRow:k,TableTh:I,TableTd:U,TableRow:A,SectionTableRow:G},setup(){return{args:c}},template:`<Table style="--table-body-max-height:150px;">


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
  </Table>`}),r=Z.bind({});var H,$,C;r.parameters={...r.parameters,docs:{...(H=r.parameters)==null?void 0:H.docs,source:{originalSource:`args => ({
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
})`,...(C=($=r.parameters)==null?void 0:$.docs)==null?void 0:C.source}}};const Te=["Default"];export{r as Default,Te as __namedExportsOrder,ne as default};
