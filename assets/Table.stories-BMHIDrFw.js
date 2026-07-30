import{f as Y,a as j,J as h,z as i,r as c,d as J,q as r,v as d,H as s,j as f,x as w,k as b,u as R,B as A,t as G}from"./vue.esm-bundler-BR4_nak_.js";import{S as K,H as z,T as V,a as Q,b as X,_ as Z}from"./SectionTableRow-CCq6hQSb.js";import{c as C}from"./change-style-properties-1EhjFsjc.js";import{a as k,I}from"./Icon-DaeP1geO.js";import{B as ee}from"./Button-DCnLp8OX.js";import{S as ae}from"./sizes-9jYRAigb.js";import{_ as le}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as te}from"./index-CAp0N5ye.js";const oe=["id","data-testid"],ne=["id","data-testid"],se=["id","data-testid"],Te={key:0,class:"table__error-wrapper"},re={class:"table__error-content"},de={class:"table__wrapper"},B=Y({name:"YTable",__name:"Table",props:{tableId:{},search:{},tbodyId:{},theadId:{},columnCount:{},isError:{type:Boolean,default:!1},onErrorHandler:{},errorLabel:{default:"Обновить таблицу"},dataTestid:{default:"Table"},isShowVerticalScroll:{type:Boolean,default:!1},isShowHorizontalScroll:{type:Boolean,default:!1}},emits:["unmount-scroll","unmount-paginate"],setup(o,{expose:M,emit:L}){var S;const a=o,y=L,u=J({headHeight:0,maxColumnCount:0}),T=c(null),n=c(null),g=c(null),v=c(null),t=c(null),O=e=>{a.isError||y("unmount-scroll",e)},W=e=>{a.isError||y("unmount-paginate",e)},p=()=>{if(!T.value||!t.value)return;const e=T.value.querySelector("thead");if(!e)return;const l=e.getBoundingClientRect().height;u.headHeight=l,C({"--scroll-track-margin-top":`${l}px`},t.value.$el)},D=()=>{t.value&&t.value.scrollToTop()},P=()=>{if(t.value&&v.value){const e=getComputedStyle(t.value.$el),l=Number(e.minHeight.replace(/\D/g,""));if(l&&l>0)return;C({"min-height":`${u.headHeight+108}px`},t.value.$el)}},_=()=>{let e=1;if(n.value){for(let l=0;l<n.value.children.length;l++)e=Math.max(n.value.children[l].children.length,e);u.maxColumnCount=e}},F=new MutationObserver(()=>{_()}),U=new ResizeObserver(()=>{p()});return M({scrollToTop:D,setHeightSlot:(S=t.value)==null?void 0:S.setHeightSlot,scrollWrapperRef:t,tbodyRef:g,tableRef:T,theadRef:n}),j(()=>{p(),_(),window.addEventListener("resize",p),T.value&&U.observe(T.value),n.value&&F.observe(n.value,{childList:!0,subtree:!0}),P()}),(e,l)=>(r(),h(K,{ref_key:"scrollWrapperRef",ref:t,class:"table",onUnmountScroll:O,onUnmountPaginate:W,"is-show-vertical-scroll":a.isShowVerticalScroll,"is-show-horizontal-scroll":a.isShowHorizontalScroll,"data-testid":`${a.dataTestid}-ScrollWrapper`},{default:i(()=>[d("table",{ref_key:"tableRef",ref:T,id:a.tableId,class:"table__table","data-testid":`${a.dataTestid}`},[s(e.$slots,"default",{},()=>{var H;return[d("colgroup",null,[s(e.$slots,"colspan",{},void 0,!0)]),e.$slots.head?(r(),f("thead",{key:0,ref_key:"theadRef",ref:n,id:a.theadId,class:"table__head","data-testid":`${a.dataTestid}-Thead`},[s(e.$slots,"head",{},void 0,!0),e.$slots.search?(r(),h(z,{key:0,class:"table__search-tr",id:(H=a.search)==null?void 0:H.rowId,ref_key:"searchRowRef",ref:v,"data-testid":`${a.dataTestid}-Search-Row`},{default:i(()=>{var $;return[w(V,{colspan:a.columnCount||u.maxColumnCount,class:"table__search-th",id:($=a.search)==null?void 0:$.headId,"data-testid":`${a.dataTestid}-SearchRow-Search`},{default:i(()=>[s(e.$slots,"search",{},void 0,!0)]),_:3},8,["colspan","id","data-testid"])]}),_:3},8,["id","data-testid"])):b("",!0)],8,ne)):b("",!0),o.isError?b("",!0):s(e.$slots,"body-group",{key:1},()=>[e.$slots.body?(r(),f("tbody",{key:0,id:a.tbodyId,ref_key:"tbodyRef",ref:g,class:"table__body","data-testid":`${a.dataTestid}-Tbody`},[s(e.$slots,"body",{},void 0,!0)],8,se)):b("",!0)],!0)]},!0)],8,oe),a.isError?(r(),f("div",Te,[d("div",re,[w(k,{class:"table__error-icon",width:112,height:100,name:R(I).tableError},null,8,["name"]),l[0]||(l[0]=d("div",{class:"table__error-header"},"Таблица не загрузилась",-1)),l[1]||(l[1]=d("div",{class:"table__error-text"}," Не удалось получить данные. Проверьте соединение с интернетом или попробуйте обновить таблицу ",-1))]),s(e.$slots,"error-button",{},()=>[o.onErrorHandler?(r(),h(ee,{key:0,class:"table__error-button",size:R(ae).small,onClick:o.onErrorHandler},{"left-icon":i(()=>[d("div",de,[w(k,{name:R(I).rearrange,width:16,height:16},null,8,["name"])])]),default:i(()=>[A(G(o.errorLabel),1)]),_:1},8,["size","onClick"])):b("",!0)],!0)])):b("",!0)]),_:3},8,["is-show-vertical-scroll","is-show-horizontal-scroll","data-testid"]))}}),N=le(B,[["__scopeId","data-v-c6700a97"]]);B.__docgenInfo={name:"YTable",exportName:"default",displayName:"Table",description:"",tags:{},expose:[{name:"scrollToTop"},{name:"setHeightSlot"},{name:"scrollWrapperRef"},{name:"tbodyRef"},{name:"tableRef"},{name:"theadRef"}],props:[{name:"isShowHorizontalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowVerticalScroll",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Table'"}},{name:"tableId",required:!1,type:{name:"string"}},{name:"search",required:!1,type:{name:`{
    rowId?: string;
    headId?: string;
}`}},{name:"tbodyId",required:!1,type:{name:"string"}},{name:"theadId",required:!1,type:{name:"string"}},{name:"columnCount",required:!1,type:{name:"number"}},{name:"isError",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"onErrorHandler",required:!1,type:{name:"TSFunctionType"}},{name:"errorLabel",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Обновить таблицу'"}}],events:[{name:"unmount-scroll",type:{names:["Event"]}},{name:"unmount-paginate",type:{names:["boolean"]}}],slots:[{name:"default"},{name:"colspan"},{name:"head"},{name:"search"},{name:"body-group"},{name:"body"},{name:"error-button"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Table/Table.vue"]};const Re={title:"Table/Table",component:N,args:{onClick:te()},tags:["autodocs"]},be=o=>({components:{Table:N,HeadTableRow:z,TableTh:V,TableTd:Z,TableRow:X,SectionTableRow:Q},setup(){return{args:o}},template:`<Table style="--table-body-max-height:150px;">


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
  </Table>`}),m=be.bind({});var E,x,q;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`args => ({
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
})`,...(q=(x=m.parameters)==null?void 0:x.docs)==null?void 0:q.source}}};const ye=["Default"];export{m as Default,ye as __namedExportsOrder,Re as default};
