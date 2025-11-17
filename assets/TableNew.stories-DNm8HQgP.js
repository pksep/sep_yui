import{j as I,b as Re,r as t,s as ie,k as m,H as M,I as $,x as B,n as o,l as S,E as me,p as k,f as ue,F as he}from"./vue.esm-bundler-lZQpEf4m.js";import{H as fe,T as w,S as ye,_ as c,b as p}from"./SectionTableRow-CkQwh7Qj.js";import{c as D}from"./change-style-properties-1EhjFsjc.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as ge}from"./index-CGbn3E6N.js";import{S as ve}from"./Search-DfRa4hRl.js";import"./Icon-0LxXR4XV.js";import"./Button-CiguzfZ3.js";import"./sizes-9jYRAigb.js";const He=["id","data-testid"],_e=["data-testid"],Se=["data-testid"],oe=I({name:"TableNew",__name:"TableNew",props:{tableId:{},search:{},tbodyId:{},theadId:{},columnCount:{},dataTestid:{default:"Table"},isShowVerticalScroll:{type:Boolean,default:!1},isShowHorizontalScroll:{type:Boolean,default:!1}},emits:["unmount-scroll","unmount-paginate"],setup(a,{expose:T,emit:d}){var E;const l=a,q=d,u=Re({headHeight:0,maxColumnCount:0}),i=t(null),r=t(null),z=t(null),V=t(null),n=t(null),se=e=>{q("unmount-scroll",e)},x=()=>{if(!i.value||!n.value)return;const e=i.value.querySelector("thead");if(!e)return;const b=e.getBoundingClientRect().height;u.headHeight=b,D({"--scroll-track-margin-top":`${b}px`},n.value.$el)},re=()=>{n.value&&n.value.scrollToTop()},ce=()=>{if(n.value&&V.value){const e=getComputedStyle(n.value.$el),b=Number(e.minHeight.replace(/\D/g,""));if(b&&b>0)return;D({"min-height":`${u.headHeight+108}px`},n.value.$el)}},F=()=>{let e=1;if(r.value){for(let b=0;b<r.value.children.length;b++)e=Math.max(r.value.children[b].children.length,e);u.maxColumnCount=e}},pe=new MutationObserver(()=>{F()}),Ne=new ResizeObserver(()=>{x()});return T({scrollToTop:re,setHeightSlot:(E=n.value)==null?void 0:E.setHeightSlot,tbodyRef:z,tableRef:i,theadRef:r}),ie(()=>{x(),F(),window.addEventListener("resize",x),i.value&&Ne.observe(i.value),r.value&&pe.observe(r.value,{childList:!0,subtree:!0}),ce()}),(e,b)=>(m(),M(ye,{ref_key:"scrollWrapperRef",ref:n,class:"table",onUnmountScroll:se,"is-show-vertical-scroll":l.isShowVerticalScroll,"is-show-horizontal-scroll":l.isShowHorizontalScroll,"data-testid":`${l.dataTestid}-ScrollWrapper`},{default:$(()=>[B("table",{ref_key:"tableRef",ref:i,id:l.tableId,class:"table__table","data-testid":`${l.dataTestid}`},[o(e.$slots,"default",{},()=>[B("colgroup",null,[o(e.$slots,"colspan",{},void 0,!0)]),e.$slots.head?(m(),S("thead",{key:0,ref_key:"theadRef",ref:r,class:"table__head","data-testid":`${l.dataTestid}-Thead`},[o(e.$slots,"head",{},void 0,!0),e.$slots.search?(m(),M(fe,{key:0,class:"table__search-tr",ref_key:"searchRowRef",ref:V,"data-testid":`${l.dataTestid}-Search-Row`},{default:$(()=>[me(w,{colspan:u.maxColumnCount,class:"table__search-th","data-testid":`${l.dataTestid}-SearchRow-Search`},{default:$(()=>[o(e.$slots,"search",{},void 0,!0)]),_:3},8,["colspan","data-testid"])]),_:3},8,["data-testid"])):k("",!0)],8,_e)):k("",!0),o(e.$slots,"body-group",{},()=>[e.$slots.body?(m(),S("tbody",{key:0,ref_key:"tbodyRef",ref:z,class:"table__body","data-testid":`${l.dataTestid}-Tbody`},[o(e.$slots,"body",{},void 0,!0)],8,Se)):k("",!0)],!0)],!0)],8,He)]),_:3},8,["is-show-vertical-scroll","is-show-horizontal-scroll","data-testid"]))}}),s=C(oe,[["__scopeId","data-v-7bc532c5"]]);oe.__docgenInfo={name:"TableNew",exportName:"default",displayName:"TableNew",description:"",tags:{},expose:[{name:"scrollToTop"},{name:"setHeightSlot"},{name:"tbodyRef"},{name:"tableRef"},{name:"theadRef"}],props:[{name:"isShowHorizontalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowVerticalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Table'"}},{name:"tableId",required:!1,type:{name:"string"}},{name:"search",required:!1,type:{name:`{
    rowId?: string;
    headId?: string;
}`}},{name:"tbodyId",required:!1,type:{name:"string"}},{name:"theadId",required:!1,type:{name:"string"}},{name:"columnCount",required:!1,type:{name:"number"}}],events:[{name:"unmount-scroll",type:{names:["Event"]}},{name:"unmount-paginate",type:{names:["boolean"]}}],slots:[{name:"default"},{name:"colspan"},{name:"head"},{name:"search"},{name:"body-group"},{name:"body"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/TableNew.vue"]};const xe=["data-testid"],te=I({name:"HeadTableRow",__name:"HeadTableRowNew",props:{dataTestid:{default:"TableRow"}},setup(a){const T=a;return(d,l)=>(m(),S("tr",{class:"head-table-row","data-testid":T.dataTestid},[o(d.$slots,"default",{},void 0,!0)],8,xe))}}),N=C(te,[["__scopeId","data-v-9e5765d8"]]);te.__docgenInfo={name:"HeadTableRow",exportName:"default",displayName:"HeadTableRowNew",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'TableRow'"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/HeadTableRowNew.vue"]};const $e=["data-testid"],we=I({name:"TableRow",__name:"TableRowNew",props:{type:{default:"default"},dataTestid:{}},setup(a){const T=a,d=ue(()=>[{"table-row_active":T.type==="selected"}]);return(l,q)=>(m(),S("tr",{class:he(["table-row",d.value]),"data-testid":T.dataTestid},[o(l.$slots,"default",{},void 0,!0)],10,$e))}}),R=C(we,[["__scopeId","data-v-a1577458"]]);we.__docgenInfo={name:"TableRow",exportName:"default",displayName:"TableRowNew",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"}},{name:"type",required:!1,type:{name:"TTableRow"},defaultValue:{func:!1,value:"'default'"}},{name:"colspan",defaultValue:{func:!1,value:"1"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/TableRowNew.vue"]};const Pe={title:"TableNew/TableNew",component:s,args:{onClick:ge()},tags:["autodocs"]},ke=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew >

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

  </TableNew>`}),h=ke.bind({}),Ie=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew >

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

  </TableNew>`}),f=Ie.bind({}),Ce=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew style="height: 400px">

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

  </TableNew>`}),y=Ce.bind({}),qe=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){return{args:a}},template:`<TableNew style="height: 400px">

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

  </TableNew>`}),g=qe.bind({}),ze=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){const T=t([["Значение 1","Значение 2"]]);return{args:a,rows:T,addRow:()=>{T.value.push([`Новое значение ${T.value.length+1}-1`,`Новое значение ${T.value.length+1}-2`])}}},template:`
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
  
  `}),v=ze.bind({}),Ve=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p,Search:ve},setup(){return{args:a}},template:`<TableNew style="height: 400px">

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

  </TableNew>`}),H=Ve.bind({}),Fe=a=>({components:{TableNew:s,HeadTableRowNew:N,TableTh:w,TableTd:c,TableRowNew:R,SectionTableRow:p},setup(){const T=t(),d=t([["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"],["Значение 1","Значение 2"]]);return{args:a,rows:d,scrollTop:()=>{T.value&&T.value.scrollToTop()},tableRef:T}},template:`
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
  
  `}),_=Fe.bind({});var W,O,A;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`args => ({
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
})`,...(A=(O=h.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var L,j,P;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`args => ({
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
})`,...(P=(j=f.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var U,G,J;y.parameters={...y.parameters,docs:{...(U=y.parameters)==null?void 0:U.docs,source:{originalSource:`args => ({
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
})`,...(J=(G=y.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`args => ({
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
})`,...(le=(Te=H.parameters)==null?void 0:Te.docs)==null?void 0:le.source}}};var be,ne,de;_.parameters={..._.parameters,docs:{...(be=_.parameters)==null?void 0:be.docs,source:{originalSource:`args => ({
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
})`,...(de=(ne=_.parameters)==null?void 0:ne.docs)==null?void 0:de.source}}};const Ue=["Default","Horizont","FullScroll","EmptyItems","AddedWithMaxHeightItems","DifficultTable","ScrollFunction"];export{v as AddedWithMaxHeightItems,h as Default,H as DifficultTable,g as EmptyItems,y as FullScroll,f as Horizont,_ as ScrollFunction,Ue as __namedExportsOrder,Pe as default};
