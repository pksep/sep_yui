import{f as q,a as Ne,J as B,z as $,r as t,d as ie,q as R,v as M,H as d,j as S,x as Re,k,n as ue,m as he}from"./vue.esm-bundler-BR4_nak_.js";import{S as fe,H as ye,T as w,a as p,_ as m}from"./SectionTableRow-BH7AHSSD.js";import{c as O}from"./change-style-properties-1EhjFsjc.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as ge}from"./index-CAp0N5ye.js";import{S as ve}from"./Search-TJ-8wWsV.js";import"./Icon-DaKYYYyB.js";import"./Button-9c9HnXMt.js";import"./sizes-9jYRAigb.js";const He=["id","data-testid"],_e=["data-testid"],Se=["data-testid"],de=q({name:"TableNew",__name:"TableNew",props:{tableId:{},search:{},tbodyId:{},theadId:{},columnCount:{},isError:{type:Boolean},onErrorHandler:{},errorLabel:{},dataTestid:{default:"Table"},isShowVerticalScroll:{type:Boolean,default:!1},isShowHorizontalScroll:{type:Boolean,default:!1}},emits:["unmount-scroll","unmount-paginate"],setup(a,{expose:T,emit:o}){var F;const l=a,C=o,u=ie({headHeight:0,maxColumnCount:0}),i=t(null),r=t(null),E=t(null),z=t(null),b=t(null),se=e=>{C("unmount-scroll",e)},x=()=>{if(!i.value||!b.value)return;const e=i.value.querySelector("thead");if(!e)return;const n=e.getBoundingClientRect().height;u.headHeight=n,O({"--scroll-track-margin-top":`${n}px`},b.value.$el)},re=()=>{b.value&&b.value.scrollToTop()},pe=()=>{if(b.value&&z.value){const e=getComputedStyle(b.value.$el),n=Number(e.minHeight.replace(/\D/g,""));if(n&&n>0)return;O({"min-height":`${u.headHeight+108}px`},b.value.$el)}},V=()=>{let e=1;if(r.value){for(let n=0;n<r.value.children.length;n++)e=Math.max(r.value.children[n].children.length,e);u.maxColumnCount=e}},me=new MutationObserver(()=>{V()}),ce=new ResizeObserver(()=>{x()});return T({scrollToTop:re,setHeightSlot:(F=b.value)==null?void 0:F.setHeightSlot,tbodyRef:E,tableRef:i,theadRef:r}),Ne(()=>{x(),V(),window.addEventListener("resize",x),i.value&&ce.observe(i.value),r.value&&me.observe(r.value,{childList:!0,subtree:!0}),pe()}),(e,n)=>(R(),B(fe,{ref_key:"scrollWrapperRef",ref:b,class:"table",onUnmountScroll:se,"is-show-vertical-scroll":l.isShowVerticalScroll,"is-show-horizontal-scroll":l.isShowHorizontalScroll,"data-testid":`${l.dataTestid}-ScrollWrapper`},{default:$(()=>[M("table",{ref_key:"tableRef",ref:i,id:l.tableId,class:"table__table","data-testid":`${l.dataTestid}`},[d(e.$slots,"default",{},()=>[M("colgroup",null,[d(e.$slots,"colspan",{},void 0,!0)]),e.$slots.head?(R(),S("thead",{key:0,ref_key:"theadRef",ref:r,class:"table__head","data-testid":`${l.dataTestid}-Thead`},[d(e.$slots,"head",{},void 0,!0),e.$slots.search?(R(),B(ye,{key:0,class:"table__search-tr",ref_key:"searchRowRef",ref:z,"data-testid":`${l.dataTestid}-Search-Row`},{default:$(()=>[Re(w,{colspan:u.maxColumnCount,class:"table__search-th","data-testid":`${l.dataTestid}-SearchRow-Search`},{default:$(()=>[d(e.$slots,"search",{},void 0,!0)]),_:3},8,["colspan","data-testid"])]),_:3},8,["data-testid"])):k("",!0)],8,_e)):k("",!0),d(e.$slots,"body-group",{},()=>[e.$slots.body?(R(),S("tbody",{key:0,ref_key:"tbodyRef",ref:E,class:"table__body","data-testid":`${l.dataTestid}-Tbody`},[d(e.$slots,"body",{},void 0,!0)],8,Se)):k("",!0)],!0)],!0)],8,He)]),_:3},8,["is-show-vertical-scroll","is-show-horizontal-scroll","data-testid"]))}}),s=I(de,[["__scopeId","data-v-828d32df"]]);de.__docgenInfo={name:"TableNew",exportName:"default",displayName:"TableNew",description:"",tags:{},expose:[{name:"scrollToTop"},{name:"setHeightSlot"},{name:"tbodyRef"},{name:"tableRef"},{name:"theadRef"}],props:[{name:"isShowHorizontalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowVerticalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Table'"}},{name:"tableId",required:!1,type:{name:"string"}},{name:"search",required:!1,type:{name:`{
    rowId?: string;
    headId?: string;
}`}},{name:"tbodyId",required:!1,type:{name:"string"}},{name:"theadId",required:!1,type:{name:"string"}},{name:"columnCount",required:!1,type:{name:"number"}},{name:"isError",required:!1,type:{name:"boolean"}},{name:"onErrorHandler",required:!1,type:{name:"TSFunctionType"}},{name:"errorLabel",required:!1,type:{name:"string"}}],events:[{name:"unmount-scroll",type:{names:["Event"]}},{name:"unmount-paginate",type:{names:["boolean"]}}],slots:[{name:"default"},{name:"colspan"},{name:"head"},{name:"search"},{name:"body-group"},{name:"body"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/TableNew.vue"]};const xe=["data-testid"],te=q({name:"HeadTableRow",__name:"HeadTableRowNew",props:{dataTestid:{default:"TableRow"}},setup(a){const T=a;return(o,l)=>(R(),S("tr",{class:"head-table-row","data-testid":T.dataTestid},[d(o.$slots,"default",{},void 0,!0)],8,xe))}}),c=I(te,[["__scopeId","data-v-f74d38aa"]]);te.__docgenInfo={name:"HeadTableRow",exportName:"default",displayName:"HeadTableRowNew",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'TableRow'"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/HeadTableRowNew.vue"]};const $e=["data-testid"],we=q({name:"TableRow",__name:"TableRowNew",props:{type:{default:"default"},isObserved:{type:Boolean},observer:{},scrolledElement:{},dataTestid:{},colspan:{default:1},rowspan:{}},setup(a){const T=a,o=he(()=>[{"table-row_active":T.type==="selected"}]);return(l,C)=>(R(),S("tr",{class:ue(["table-row",o.value]),"data-testid":T.dataTestid},[d(l.$slots,"default",{},void 0,!0)],10,$e))}}),N=I(we,[["__scopeId","data-v-7dc4f5d0"]]);we.__docgenInfo={name:"TableRow",exportName:"default",displayName:"TableRowNew",description:"",tags:{},props:[{name:"rowspan",required:!1,type:{name:"union",elements:[{name:"number"},{name:"string"}]}},{name:"colspan",required:!1,type:{name:"union",elements:[{name:"number"},{name:"string"}]},defaultValue:{func:!1,value:"1"}},{name:"dataTestid",required:!1,type:{name:"string"}},{name:"type",required:!1,type:{name:"TTableRow"},defaultValue:{func:!1,value:"'default'"}},{name:"isObserved",required:!1,type:{name:"boolean"}},{name:"observer",required:!1,type:{name:"union",elements:[{name:"IntersectionObserver"},{name:"undefined"},{name:"null"}]}},{name:"scrolledElement",required:!1,type:{name:"union",elements:[{name:"HTMLElement"},{name:"undefined"},{name:"null"}]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/TableRowNew.vue"]};const Je={title:"TableNew/TableNew",component:s,args:{onClick:ge()},tags:["autodocs"]},ke=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew >

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`}),h=ke.bind({}),qe=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew >

  <template #colspan>
    <col style="width: 50vw"/>
    <col style="width: 50vw"/>
  </template>

    <template #head>
      <HeadTableRowNew>
        <TableTh >Заголовок 1</TableTh>
        <TableTh >Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`}),f=qe.bind({}),Ie=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew style="height: 400px">

  <template #colspan>
    <col style="width: 50vw"/>
    <col style="width: 50vw"/>
  </template>

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`}),y=Ie.bind({}),Ce=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`}),g=Ce.bind({}),Ee=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){const T=t([["Значение 1","Значение 2"]]);return{args:a,rows:T,addRow:()=>{T.value.push([`Новое значение ${T.value.length+1}-1`,`Новое значение ${T.value.length+1}-2`])}}},template:`
  <div>
    <TableNew style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="addRow">Добавить</button>
  </div>
  
  `}),v=Ee.bind({}),ze=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p,Search:ve},setup(){return{args:a}},template:`<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh colspan='2'>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh colspan=3>Заголовок 1</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
        <TableTh>Заголовок 3</TableTh>
      </HeadTableRowNew>
    </template>

    <template #search>
      <Search />
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>
      

    </template>

  </TableNew>`}),H=ze.bind({}),Ve=a=>({components:{TableNew:s,HeadTableRowNew:c,TableTh:w,TableTd:m,TableRowNew:N,SectionTableRow:p},setup(){const T=t(),o=t([["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"]]);return{args:a,rows:o,scrollTop:()=>{T.value&&T.value.scrollToTop()},tableRef:T}},template:`
  <div>
    <TableNew ref="tableRef" style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="scrollTop">Скролл наверх</button>
  </div>
  
  `}),_=Ve.bind({});var D,W,L;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return {
      args
    };
  },
  template: \`<TableNew >

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>\`
})`,...(L=(W=h.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};var A,j,J;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return {
      args
    };
  },
  template: \`<TableNew >

  <template #colspan>
    <col style="width: 50vw"/>
    <col style="width: 50vw"/>
  </template>

    <template #head>
      <HeadTableRowNew>
        <TableTh >Заголовок 1</TableTh>
        <TableTh >Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>\`
})`,...(J=(j=f.parameters)==null?void 0:j.docs)==null?void 0:J.source}}};var P,U,G;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return {
      args
    };
  },
  template: \`<TableNew style="height: 400px">

  <template #colspan>
    <col style="width: 50vw"/>
    <col style="width: 50vw"/>
  </template>

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>\`
})`,...(G=(U=y.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var K,Q,X;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return {
      args
    };
  },
  template: \`<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>\`
})`,...(X=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    const rows = ref<[string, string][]>([['Значение 1', 'Значение 2']]);
    const addRow = () => {
      rows.value.push([\`Новое значение \${rows.value.length + 1}-1\`, \`Новое значение \${rows.value.length + 1}-2\`]);
    };
    return {
      args,
      rows,
      addRow
    };
  },
  template: \`
  <div>
    <TableNew style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="addRow">Добавить</button>
  </div>
  
  \`
})`,...(ee=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,Te,le;H.parameters={...H.parameters,docs:{...(ae=H.parameters)==null?void 0:ae.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow,
    Search
  },
  setup() {
    return {
      args
    };
  },
  template: \`<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh colspan='2'>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh colspan=3>Заголовок 1</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
        <TableTh>Заголовок 3</TableTh>
      </HeadTableRowNew>
    </template>

    <template #search>
      <Search />
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>
      

    </template>

  </TableNew>\`
})`,...(le=(Te=H.parameters)==null?void 0:Te.docs)==null?void 0:le.source}}};var ne,be,oe;_.parameters={..._.parameters,docs:{...(ne=_.parameters)==null?void 0:ne.docs,source:{originalSource:`args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    const tableRef = ref<InstanceType<typeof TableNew> | null>();
    const rows = ref<[string, string][]>([['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2'], ['Значение 1', 'Значение 2']]);
    const scrollTop = () => {
      if (tableRef.value) {
        tableRef.value.scrollToTop();
      }
    };
    return {
      args,
      rows,
      scrollTop,
      tableRef
    };
  },
  template: \`
  <div>
    <TableNew ref="tableRef" style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="scrollTop">Скролл наверх</button>
  </div>
  
  \`
})`,...(oe=(be=_.parameters)==null?void 0:be.docs)==null?void 0:oe.source}}};const Pe=["Default","Horizont","FullScroll","EmptyItems","AddedWithMaxHeightItems","DifficultTable","ScrollFunction"];export{v as AddedWithMaxHeightItems,h as Default,H as DifficultTable,g as EmptyItems,y as FullScroll,f as Horizont,_ as ScrollFunction,Pe as __namedExportsOrder,Je as default};
