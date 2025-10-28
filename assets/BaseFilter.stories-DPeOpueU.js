import{j as ie,k as u,l as f,K as Se,L as Me,E as d,u as y,Q as R,b as we,r as h,R as Fe,w as H,f as l,s as $e,G as Ve,H as U,I as M,x as w,m as j,F as D,D as I,p as T,A as Pe,B as Ae,P as He,Y as z}from"./vue.esm-bundler-DC1UwcWE.js";import{a as x,B as le}from"./Badges-BCOYhDn_.js";import{I as re,a as ue}from"./Icon-CVpBHwEh.js";import{S as Ie}from"./Search-D5XHpe3g.js";import{a as xe,O as Le,S as qe,b as k}from"./SelectList-gUknga8t.js";import{_ as de}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{T as Ee}from"./Tooltip-C8NwqHvv.js";import{l as r}from"./lodash-DHyxJ22h.js";import"./Button-BcbnAUXm.js";import"./sizes-9jYRAigb.js";import"./index-BqoPcbcE.js";import"./change-style-properties-1EhjFsjc.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Ne=["data-testid"],We=["data-testid"],me=ie({name:"ChoosenMiniOptions",__name:"ChoosenMiniOptions",props:{options:{},dataTestid:{default:"ChoosenMiniOptions"}},emits:["remove"],setup(o,{emit:m}){const e=o,g=m,v=_=>{g("remove",_)};return(_,O)=>(u(),f("div",{class:"choosen-mini-options","data-testid":e.dataTestid},[(u(!0),f(Se,null,Me(o.options,(a,i)=>(u(),f("div",{key:a.key,class:"choosen-mini-options__option","data-testid":`${e.dataTestid}-Option-Item${i}`},[d(le,{"data-testid":`${e.dataTestid}-Badge${i}`,type:y(x).blue,text:y(xe)(a)?a.hint:a.value,class:"choosen-mini-options__badges",disabled:""},null,8,["data-testid","type","text"]),d(ue,{"data-testid":`${e.dataTestid}-Icon${i}`,name:y(re).crossLarge,width:10,height:10,class:"choosen-mini-options__cross",onClick:p=>v(a.key)},null,8,["data-testid","name","onClick"])],8,We))),128))],8,Ne))}}),G=de(me,[["__scopeId","data-v-b99473c0"]]);me.__docgenInfo={name:"ChoosenMiniOptions",exportName:"default",displayName:"ChoosenMiniOptions",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'ChoosenMiniOptions'"}},{name:"options",required:!0,type:{name:"union",elements:[{name:"Array",elements:[{name:"OptionsObject"}]},{name:"Array",elements:[{name:"IOptionsObjectWithHint"}]}]}}],events:[{name:"remove",type:{names:["string"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Select/ChoosenMiniOptions.vue"]};const Re=["data-testid"],Ue=["data-testid"],je=["data-testid"],De=["data-testid"],ze=["data-testid"],Ge=["data-testid"],pe=ie({name:"BaseFilter",__name:"BaseFilter",props:R({options:{},title:{},isSearch:{type:Boolean,default:!1},isPosibleToClear:{type:Boolean,default:!1},isShowMiniOptions:{type:Boolean,default:!1},isOpened:{type:Boolean,default:!1},tooltipPosition:{default:"top-center"},onUnmountPagination:{},defaultOption:{default:"Выберите значение"},class:{},disabled:{type:Boolean},dataTestid:{default:"BaseFilter"}},{modelValue:{},modelModifiers:{}}),emits:R(["change","unmount-open","unmount-search","unmount-search-enter","unmount-pagination"],["update:modelValue"]),setup(o,{emit:m}){const e=o,g=we({isHovered:!1}),v=m,_=h(null),O=h(null),a=Fe(o,"modelValue"),i=h(e.isOpened);H(i,()=>v("unmount-open",i.value)),H(()=>e.isOpened,()=>{i.value=e.isOpened}),H(()=>e.onUnmountPagination,()=>{E()});const p=h(""),ye=l(()=>{let s=[];return p.value?(k(e.options)?s=e.options.filter(t=>{var n;return t.value.toLowerCase().includes(p.value.toLowerCase())||((n=t==null?void 0:t.hint)==null?void 0:n.toLowerCase().includes(p.value.toLowerCase()))}):s=e.options.filter(t=>t.value.toLowerCase().includes(p.value.toLowerCase())),s):(k(e.options),s=e.options,s)}),c=l(()=>{var t;return((t=e.options.find(n=>r.isArray(a.value)?a.value.includes(n.key):n.key===String(a.value)))==null?void 0:t.value)||e.defaultOption}),ge=l(()=>e.options.filter(s=>r.isArray(a.value)?a.value.includes(s.key)&&s.value!==c.value:s.key===String(a.value))),_e=l(()=>e.options.filter(s=>r.isArray(a.value)?a.value.includes(s.key)&&s.value===c.value:s.key===String(a.value))),q=l(()=>{var n,N,W;const s=e.options;let t;return r.isArray(a.value)?k(s)?t=(n=s.find(b=>b.value===c.value))==null?void 0:n.hint:t=(N=s.find(b=>b.value===c.value))==null?void 0:N.value:t=(W=s.find(b=>b.key===String(a.value)))==null?void 0:W.value,t||""}),Oe=()=>{g.isHovered=!0},be=()=>{g.isHovered=!1},Te=l(()=>{var s;return k(e.options)?g.isHovered&&!!q.value:((s=_.value)==null?void 0:s.isSpanOverflow)||!1}),ke=l(()=>r.isArray(a.value)?e.isPosibleToClear&&a.value.length>0:e.isPosibleToClear&&a.value),$=l(()=>r.isArray(a.value)&&a.value.length>1),V=l(()=>r.isArray(a.value)?a.value.length:null),P=async s=>{if(r.isArray(a.value))a.value.includes(s)?a.value=a.value.filter(t=>t!==s):a.value=[...a.value,s];else{let t=e.options.find(n=>n.key===s);!t&&k(e.options)&&(t=e.options.find(n=>n.hint===s)),a.value=(t==null?void 0:t.key)||"",i.value=!1}await z(),v("change",String(a.value))},Ce=s=>{i.value=s},Be=async()=>{r.isArray(a.value)?a.value=[]:a.value="",await z(),v("change",a.value)},A=new IntersectionObserver(s=>{s.forEach(t=>{t.isIntersecting&&v("unmount-pagination")})}),E=()=>{O.value&&e.onUnmountPagination&&(A.unobserve(O.value),A.observe(O.value))};return $e(()=>{E()}),Ve(()=>{A.disconnect()}),(s,t)=>(u(),U(qe,{onChange:Ce,"is-opened":i.value,class:D(e.class),"header-classes":"filter__header","options-classes":"filter__options","data-testid":e.dataTestid},{header:M(()=>[w("span",{class:D(["filter__header-title",{"filter__header-title__active":i.value}]),"data-testid":`${e.dataTestid}-Title`},j(o.title),11,Re),d(Ee,{position:o.tooltipPosition,type:"blue","is-can-show":Te.value&&!($.value&&o.isShowMiniOptions),hint:q.value,"hint-gap":28,class:"filter__header-tooltip","data-testid":`${e.dataTestid}-Tooltip`},{default:M(()=>[d(le,{ref_key:"badgesRef",ref:_,type:c.value===e.defaultOption?y(x).default:y(x).blue,class:"filter__options-badge","data-testid":`${e.dataTestid}-Badge`,text:c.value,onMouseenter:Oe,onMouseleave:be,disabled:""},null,8,["type","data-testid","text"]),$.value&&o.isShowMiniOptions?(u(),f("div",{key:0,class:"filter__values","data-testid":`${e.dataTestid}-Filter-Value`},[d(G,{"data-testid":`${e.dataTestid}-Filter-Value-MiniOptions`,onClick:t[0]||(t[0]=I(()=>{},["stop"])),options:_e.value,onRemove:P},null,8,["data-testid","options"])],8,Ue)):T("",!0)]),_:1},8,["position","is-can-show","hint","data-testid"]),V.value&&V.value>1?(u(),f("span",{key:0,class:"filter__count","data-testid":`${e.dataTestid}-Filter-Count`},[Pe(" +"+j(V.value-1)+" ",1),$.value?(u(),f("div",{key:0,class:"filter__values","data-testid":`${e.dataTestid}-Filter-Values`},[d(G,{onClick:t[1]||(t[1]=I(()=>{},["stop"])),options:ge.value,onRemove:P,"data-testid":`${e.dataTestid}-MiniOptions`},null,8,["options","data-testid"])],8,De)):T("",!0)],8,je)):T("",!0),ke.value?(u(),f("span",{key:1,class:"filter__cross",onClick:I(Be,["stop"]),"data-testid":`${e.dataTestid}-Filter-Cross`},[d(ue,{name:y(re).crossLarge,width:16,height:16},null,8,["name"])],8,ze)):T("",!0)]),options:M(()=>[o.isSearch?(u(),U(Ie,{key:0,modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=n=>p.value=n),"show-history":!1,"data-testid":`${e.dataTestid}-Search`,onInput:t[3]||(t[3]=n=>s.$emit("unmount-search",n)),onEnter:t[4]||(t[4]=n=>s.$emit("unmount-search-enter",n))},null,8,["modelValue","data-testid"])):T("",!0),d(Le,{"data-testid":`${e.dataTestid}-Options`,class:"filter__options-option",options:ye.value,"default-option":c.value,onChange:P},{default:M(()=>[w("li",{class:"filter__options-underline","data-testid":`${e.dataTestid}-Underline`},[...t[5]||(t[5]=[w("hr",{class:"filter__options-underline-hr"},null,-1)])],8,Ge)]),_:1},8,["data-testid","options","default-option"]),Ae(w("div",{ref_key:"lastOptionRef",ref:O,class:"filter__last-option"},null,512),[[He,o.onUnmountPagination]])]),_:1},8,["is-opened","class","data-testid"]))}}),L=de(pe,[["__scopeId","data-v-0b671aa1"]]);pe.__docgenInfo={name:"BaseFilter",exportName:"default",displayName:"BaseFilter",description:"",tags:{},props:[{name:"options",required:!0,type:{name:"union",elements:[{name:"Array",elements:[{name:"OptionsObject"}]},{name:"Array",elements:[{name:"IOptionsObjectWithHint"}]}]}},{name:"title",required:!0,type:{name:"string"}},{name:"isSearch",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isPosibleToClear",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isShowMiniOptions",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isOpened",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"tooltipPosition",required:!1,type:{name:"TTooltipPosition"},defaultValue:{func:!1,value:"'top-center'"}},{name:"onUnmountPagination",required:!1,type:{name:"TSFunctionType"}},{name:"defaultOption",defaultValue:{func:!1,value:"'Выберите значение'"}},{name:"dataTestid",defaultValue:{func:!1,value:"'BaseFilter'"}}],events:[{name:"unmount-search",type:{names:["string"]}},{name:"unmount-search-enter",type:{names:["string"]}},{name:"change",type:{names:["union"],elements:[{name:"string"},{name:"Array",elements:[{name:"string"}]}]}},{name:"unmount-open",type:{names:["boolean"]}},{name:"unmount-pagination"}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Select/BaseFilter.vue"]};const ce=[{key:"1",value:"Прямая"},{key:"2",value:"Косвенная"},{key:"3",value:"Очень ответственная "}],fe=[{key:"1",value:"Петров Д.А",hint:"Петров Давид Алексеевич"},{key:"2",value:"Евгений Н.Н",hint:"Евгений Невский Николаевич"},{key:"3",value:"Ольга С.А",hint:"Ольга Сергеевна Александровна"},{key:"4",value:"Ольга Сергеевна Александровна",hint:"Ольга Сергеевна Александровна"}],lt={title:"Select/BaseFilter",component:L,tags:["autodocs"],args:{title:"Операция",options:ce}},ve=o=>({components:{BaseFilter:L},setup(){const m=h(null);return{args:o,model:m}},template:`
    <BaseFilter v-model="model" v-bind="args" />
  `}),he=o=>({components:{BaseFilter:L},setup(){const m=h([]);return{args:o,model:m}},template:`
    <BaseFilter v-model="model" v-bind="args" />
  `}),F=ve.bind({}),C=ve.bind({});C.args={options:fe,isSearch:!0,isPosibleToClear:!0};const B=he.bind({});B.args={options:ce,isSearch:!0,isPosibleToClear:!0};const S=he.bind({});S.args={options:fe,isSearch:!1,isPosibleToClear:!0,isShoMiniOptions:!0};var K,Q,Y;F.parameters={...F.parameters,docs:{...(K=F.parameters)==null?void 0:K.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref(null);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(Y=(Q=F.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var J,X,Z;C.parameters={...C.parameters,docs:{...(J=C.parameters)==null?void 0:J.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref(null);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(Z=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ae;B.parameters={...B.parameters,docs:{...(ee=B.parameters)==null?void 0:ee.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref([]);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(ae=(te=B.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var se,ne,oe;S.parameters={...S.parameters,docs:{...(se=S.parameters)==null?void 0:se.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref([]);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(oe=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};const rt=["Default","WithHints","Multiple","MultipleWithHints"];export{F as Default,B as Multiple,S as MultipleWithHints,C as WithHints,rt as __namedExportsOrder,lt as default};
