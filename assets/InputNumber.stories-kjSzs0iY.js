import{j as oe,b as me,w as I,r as pe,q as ce,l as N,C as fe,m as be,p as q,H as ge,O as Ee,D as g,G as M,x as $,u as T,z as Ie,k as y}from"./vue.esm-bundler-DJ2C_uUp.js";import{a as D,I as B}from"./Icon-CdZCiVYH.js";import{S as ne}from"./sizes-9jYRAigb.js";import{_ as Ne}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{S as _}from"./storybook-BJU81olc.js";const ye=["data-testid"],_e=["data-testid"],ve=["data-testid"],Ve=["required","data-testid"],he=["data-testid"],xe=["data-testid","disabled"],Se=["data-testid","disabled"],ae=oe({__name:"InputNumber",props:{inputMessage:{},modelValue:{default:0},required:{type:Boolean},isInteger:{type:Boolean,default:!1},min:{default:0},max:{default:1/0},size:{default:ne.medium},modelModifiers:{default:()=>({})},dataTestid:{default:"InputNumber"}},emits:["update:modelValue","focused"],setup(s,{emit:re}){const i=re,t=s,e=me({isPressed:!1,inputElement:t.modelValue||(t.min>0?t.min:0),prevValue:""});I(()=>t.isInteger,()=>{t.isInteger&&(e.inputElement=V(e.inputElement.toString()),h(e.inputElement))}),I([()=>t.min,()=>t.max],()=>{S(),x()}),I(()=>t.modelValue,a=>{e.inputElement=a});const v=/^-?\d{0,10}(\.\d{0,7})?$/,E=pe(null),ie=a=>{const n=a.target.value,b=V(n);h(b),!isNaN(+e.inputElement)&&Number(e.inputElement)<=t.max&&Number(e.inputElement)>=t.min&&i("update:modelValue",e.inputElement)},V=a=>{let n=a.replace(",",".");return t.isInteger&&n.includes(".")&&(n=n.replace(".","")),n==="."?n="0"+n:n==="-."&&(n="-0."+n.slice(2)),/[^\d.]/.test(n)&&(n=n.replace(t.min>=0?/[^0-9.]/g:/[^0-9.-]/g,"")),n.includes("-")&&(n=(n.startsWith("-")?"-":"")+n.replace(/-/g,"")),n.startsWith("0")&&n.length>1&&!n.startsWith("0.")&&(n=n.replace(/^0+/,"")),n.startsWith("-0")&&n.length>2&&!n.startsWith("-0.")&&(n="-"+n.slice(2).replace(/^0+/,"")),(n.match(/\./g)||[]).length>1&&(n=n.slice(0,n.lastIndexOf("."))+n.slice(n.lastIndexOf(".")+1)),n},h=a=>{Number(a)>t.max?e.inputElement=t.max:e.inputElement=a,e.inputElement!==""&&!v.test(`${e.inputElement}`)&&(e.inputElement=e.prevValue)},x=()=>{Number(e.inputElement)<t.min&&(e.inputElement=t.min,i("update:modelValue",+e.inputElement))},S=()=>{Number(e.inputElement)>t.max&&(e.inputElement=t.max,i("update:modelValue",+e.inputElement))},ue=a=>{e.prevValue=e.inputElement,a.key==="ArrowUp"&&k(),a.key==="ArrowDown"&&w()},le=a=>{e.isPressed=!0,i("focused",a)},de=()=>{(e.inputElement===""||e.inputElement===null||isNaN(+e.inputElement))&&(e.inputElement=t.min>0?t.min:0),isNaN(+e.inputElement)&&(e.inputElement=Math.max(t.min,0)),Number(e.inputElement)>t.max?e.inputElement=t.max:Number(e.inputElement)<t.min&&(e.inputElement=t.min),e.inputElement=`${e.inputElement}`.replace(/(\.\d*?[1-9])0+$/,"$1").replace(/\.0+$/,""),i("update:modelValue",e.inputElement),e.isPressed=!1},k=()=>{var a;+e.inputElement+1<t.max?e.inputElement=+e.inputElement+1:t.max!==1/0?e.inputElement=t.max:e.inputElement=0,v.test(`${e.inputElement}`)?i("update:modelValue",e.inputElement):e.inputElement=e.prevValue,(a=E.value)==null||a.focus()},w=()=>{var a;+e.inputElement-1>t.min?e.inputElement=+e.inputElement-1:t.min!==-1/0?e.inputElement=t.min:e.inputElement=0,i("update:modelValue",+e.inputElement),(a=E.value)==null||a.focus()};return ce(()=>{S(),x()}),(a,n)=>(y(),N("fieldset",{class:Ie(["input-yui-kit input-yui-kit_number initial",{pressed:e.isPressed,[t.size]:!0}]),"data-testid":t.dataTestid,onFocusout:de},[t.inputMessage?(y(),N("legend",{key:0,class:"input-yui-kit__legend","data-testid":`${t.dataTestid}-Legend`},[fe(be(t.inputMessage),1),t.required?(y(),N("sup",{key:0,class:"input-yui-kit__star","data-testid":`${t.dataTestid}-Star`},"*",8,ve)):q("",!0)],8,_e)):q("",!0),ge(g("input",{ref_key:"inputNumberRef",ref:E,"onUpdate:modelValue":n[0]||(n[0]=b=>e.inputElement=b),onFocus:le,onInput:ie,onKeydown:ue,class:"input-yui-kit__input",required:t.required,"data-testid":`${t.dataTestid}-Input`,type:"text"},null,40,Ve),[[Ee,e.inputElement]]),g("div",{class:"input-yui-kit__buttons","data-testid":`${t.dataTestid}-Buttons`},[g("button",{class:"input-yui-kit__button-up","data-testid":`${t.dataTestid}-UpButton`,onMousedown:M(k,["prevent"]),disabled:+e.inputElement>=t.max},[$(D,{name:T(B).chevronUp,"data-testid":`${t.dataTestid}-Icon`},null,8,["name","data-testid"])],40,xe),g("button",{class:"input-yui-kit__button-down","data-testid":`${t.dataTestid}-DownButton`,onMousedown:M(w,["prevent"]),disabled:+e.inputElement<=t.min},[$(D,{name:T(B).chevronDown,"data-testid":`${t.dataTestid}-Icon`},null,8,["name","data-testid"])],40,Se)],8,he)],42,ye))}}),se=Ne(ae,[["__scopeId","data-v-a9beef6e"]]);ae.__docgenInfo={exportName:"default",displayName:"InputNumber",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'InputNumber'"}},{name:"inputMessage",required:!0,type:{name:"string"}},{name:"modelValue",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"required",required:!1,type:{name:"boolean"}},{name:"isInteger",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"min",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"max",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"Infinity"}},{name:"size",required:!1,type:{name:"union",elements:[{name:"TSTypeReference"},{name:"TSTypeReference"}]},defaultValue:{func:!1,value:"SizesEnum.medium"}},{name:"modelModifiers",required:!1,type:{name:"object"},defaultValue:{func:!1,value:"() => ({})"}}],events:[{name:"update:modelValue",type:{names:["union"],elements:[{name:"number"},{name:"string"}]}},{name:"focused",type:{names:["FocusEvent"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/InputNumber/InputNumber.vue"]};var r=(s=>(s.initial="initial",s.error="error",s.warning="warning",s.success="success",s.ordinary="ordinary",s.disabled="disabled",s.minor="minor",s))(r||{});const Te={title:"InputNumber/InputNumber",component:se,argTypes:{class:{control:{type:_.select},options:r},required:{control:{type:_.boolean},defaultValue:!1},size:{control:{type:_.select},options:ne}},args:{inputMessage:""},tags:["autodocs"]},u=s=>({components:{InputNumber:se},setup(){return{args:s}},template:`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />`}),l=u.bind({});l.args={class:r.initial};const d=u.bind({});d.args={class:r.disabled};const o=u.bind({});o.args={class:r.error};const m=u.bind({});m.args={class:r.warning};const p=u.bind({});p.args={class:r.success};const c=u.bind({});c.args={class:r.ordinary};const f=u.bind({});f.args={class:"active"};var z,C,W;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(W=(C=l.parameters)==null?void 0:C.docs)==null?void 0:W.source}}};var A,F,O;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(O=(F=d.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var P,R,U;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(U=(R=o.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var j,K,G;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(G=(K=m.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var H,L,J;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(J=(L=p.parameters)==null?void 0:L.docs)==null?void 0:J.source}}};var Q,X,Y;c.parameters={...c.parameters,docs:{...(Q=c.parameters)==null?void 0:Q.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(Y=(X=c.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`args => ({
  components: {
    InputNumber
  },
  setup() {
    return {
      args
    };
  },
  template: \`<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(te=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const De=["InputNumberDefault","InputDisabled","InputError","InputWarning","InputSuccess","InputOrdinary","InputActive"];export{f as InputActive,d as InputDisabled,o as InputError,l as InputNumberDefault,c as InputOrdinary,p as InputSuccess,m as InputWarning,De as __namedExportsOrder,Te as default};
