import{S as _}from"./storybook-BJU81olc.js";import{T as A,I as s}from"./enum-D-JvIl_F.js";import{j as Y,b as Z,r as ee,w as h,l as f,A as te,m as ae,p as g,B as se,P as ne,x as re,H as oe,u as V,D as ue,F as de,k as c,I as le,E as pe}from"./vue.esm-bundler-lZQpEf4m.js";import{I as ie,a as ce}from"./Icon-bBHVBDiJ.js";import{B as me,a as fe}from"./Button-CiguzfZ3.js";import{_ as ge}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sizes-9jYRAigb.js";const Ie=["data-testid"],ye=["data-testid"],be=["data-testid"],_e=["type","autocomplete","placeholder","required","data-testid"],H=Y({__name:"Input",props:{placeholder:{},inputMessage:{default:""},type:{default:A.text},required:{type:Boolean,default:!1},modelValue:{default:""},hideClearButton:{type:Boolean,default:!1},autocomplete:{},modelModifiers:{default:()=>({})},dataTestid:{default:"Input"}},emits:["update:modelValue"],setup(m,{emit:U}){const I=U,e=m,t=Z({isPressed:!1,inputElement:e.modelValue}),y=ee(null),G=()=>{var a;t.inputElement="",(a=y.value)==null||a.focus(),I("update:modelValue","")},J=()=>{I("update:modelValue",t.inputElement)},K=()=>{t.isPressed=!0},Q=()=>{t.isPressed=!1};return h(()=>e.modelValue,a=>{t.inputElement=a}),h(()=>t.inputElement,a=>{e.modelValue!=a&&(t.isPressed=(a==null?void 0:a.length)>0,t.inputElement=a)}),(a,b)=>(c(),f("fieldset",{class:de(["input-yui-kit",{pressed:t.isPressed}]),onFocusout:Q,"data-testid":e.dataTestid},[e.inputMessage?(c(),f("legend",{key:0,class:"input-yui-kit__legend","data-testid":`${e.dataTestid}-Legend`},[te(ae(e.inputMessage),1),e.required?(c(),f("sup",{key:0,"data-testid":`${e.dataTestid}-Star`,class:"input-yui-kit__star"},"*",8,be)):g("",!0)],8,ye)):g("",!0),se(re("input",{ref_key:"inputRef",ref:y,"onUpdate:modelValue":b[0]||(b[0]=X=>t.inputElement=X),onFocus:K,onInput:J,type:e.type,autocomplete:e.autocomplete,class:"input-yui-kit__input",placeholder:e.placeholder,required:e.required,"data-testid":`${e.dataTestid}-Input`},null,40,_e),[[ne,t.inputElement]]),!e.hideClearButton&&t.isPressed&&t.inputElement?(c(),oe(me,{key:1,type:V(fe).ghost,class:"input-yui-kit__close","data-testid":`${e.dataTestid}-Button`,onMousedown:ue(G,["prevent"]),tabindex:"-1"},{default:le(()=>[pe(ce,{name:V(ie).exitSmall,color:"currentColor","data-testid":`${e.dataTestid}-Button-Icon`},null,8,["name","data-testid"])]),_:1},8,["type","data-testid"])):g("",!0)],42,Ie))}}),L=ge(H,[["__scopeId","data-v-ccb65917"]]);H.__docgenInfo={exportName:"default",displayName:"Input",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Input'"}},{name:"placeholder",required:!1,type:{name:"string"}},{name:"inputMessage",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"type",required:!1,type:{name:"TextFieldEnum"},defaultValue:{func:!1,value:"TextFieldEnum.text"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"modelValue",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hideClearButton",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autocomplete",required:!1,type:{name:"string"}},{name:"modelModifiers",required:!0,type:{name:"object"},defaultValue:{func:!1,value:"() => ({})"}}],events:[{name:"update:modelValue",type:{names:["string"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Input/Input.vue"]};const Be={title:"Input/Input",component:L,argTypes:{class:{control:{type:_.select},options:s},required:{control:{type:_.boolean},defaultValue:!1}},args:{placeholder:"Введите текст",type:A.text,inputMessage:"Текст"},tags:["autodocs"]},n=m=>({components:{Input:L},setup(){return{args:m}},template:`<Input v-bind="args" :disabled="args.class === 'disabled'" />`}),r=n.bind({});r.args={class:s.initial};const o=n.bind({});o.args={class:s.disabled};const u=n.bind({});u.args={class:s.error};const d=n.bind({});d.args={class:s.warning};const l=n.bind({});l.args={class:s.success};const p=n.bind({});p.args={class:s.ordinary};const i=n.bind({});i.args={class:s.minor};var E,v,T;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(T=(v=r.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var q,x,B;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(B=(x=o.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var k,S,M;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(M=(S=u.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var C,w,D;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(D=(w=d.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var F,N,P;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(P=(N=l.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var $,O,j;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var R,W,z;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Input v-bind="args" :disabled="args.class === 'disabled'" />\`
})`,...(z=(W=i.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};const ke=["InputDefault","InputDisabled","InputError","InputWarning","InputSuccess","InputOrdinary","InputMinor"];export{r as InputDefault,o as InputDisabled,u as InputError,i as InputMinor,p as InputOrdinary,l as InputSuccess,d as InputWarning,ke as __namedExportsOrder,Be as default};
