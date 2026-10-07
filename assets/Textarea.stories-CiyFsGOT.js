import{f as H,d as J,w as K,j as p,C as Q,t as R,k as f,D as X,E as Y,u as x,x as Z,n as ee,p as ae,s as c}from"./vue.esm-bundler-TxFwRJWN.js";import{v as se,g as te}from"./spellcheck-directive-RfAmTTXy.js";import{_ as re}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{I as t}from"./enum-D-JvIl_F.js";import{S as T}from"./storybook-BJU81olc.js";var F=(s=>(s.default="default",s.minor="minor",s))(F||{});const ne=["data-testid"],le=["data-testid"],de=["data-testid"],oe=["data-testid","placeholder","required","maxlength","readonly","lang"],L=H({__name:"Textarea",props:{placeholder:{},inputMessage:{},required:{type:Boolean,default:!1},maxlength:{},modelValue:{default:""},readonly:{type:Boolean,default:!1},type:{default:F.default},modelModifiers:{default:()=>({})},dataTestid:{default:"Textarea"},spellcheck:{type:Boolean,default:!0},lang:{}},emits:["update:modelValue"],setup(s,{emit:$}){const e=s,j=$,a=J({isPressed:!1,inputElement:e.modelValue}),W=ae(()=>[{pressed:a.isPressed,readonly:e.readonly,[e.type]:!0}]),z=()=>{j("update:modelValue",a.inputElement)},U=()=>{e.readonly||(a.isPressed=!0)},A=()=>{a.isPressed=!1};return K(()=>e.modelValue,m=>{a.inputElement=m}),(m,g)=>(c(),p("fieldset",{class:ee(["input-yui-kit",W.value]),onFocusout:A,"data-testid":e.dataTestid},[e.inputMessage?(c(),p("legend",{key:0,class:"input-yui-kit__legend","data-testid":`${e.dataTestid}-Legend`},[Q(R(e.inputMessage)+" ",1),e.required?(c(),p("sup",{key:0,class:"input-yui-kit__star","data-testid":`${e.dataTestid}-Legend-Star`},"*",8,de)):f("",!0)],8,le)):f("",!0),X(Z("textarea",{"onUpdate:modelValue":g[0]||(g[0]=G=>a.inputElement=G),onFocus:U,onInput:z,"data-testid":`${e.dataTestid}-Textarea`,class:"input-yui-kit__input",placeholder:e.placeholder,required:e.required,maxlength:e.maxlength,readonly:e.readonly,spellcheck:"false",lang:e.lang||x(te)(a.inputElement)},null,40,oe),[[Y,a.inputElement],[x(se),e.spellcheck&&!e.readonly]])],42,ne))}}),O=re(L,[["__scopeId","data-v-f5ddd8ed"]]);L.__docgenInfo={exportName:"default",displayName:"Textarea",description:"",tags:{},props:[{name:"lang",required:!1,type:{name:"string"}},{name:"spellcheck",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Textarea'"}},{name:"placeholder",required:!1,type:{name:"string"}},{name:"inputMessage",required:!1,type:{name:"string"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"maxlength",required:!1,type:{name:"number"}},{name:"modelValue",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"readonly",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"type",required:!1,type:{name:"TextareaTypeEnum"},defaultValue:{func:!1,value:"TextareaTypeEnum.default"}},{name:"modelModifiers",required:!0,type:{name:"object"},defaultValue:{func:!1,value:"() => ({})"}}],events:[{name:"update:modelValue",type:{names:["string"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Textarea/Textarea.vue"]};const ge={title:"Textarea/Textarea",component:O,argTypes:{class:{control:{type:T.select},options:t},required:{control:{type:T.boolean},defaultValue:!1}},args:{placeholder:"Введите текст",inputMessage:"Текст"},tags:["autodocs"]},r=s=>({components:{Textarea:O},setup(){return{args:s}},template:`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  `}),n=r.bind({});n.args={class:t.initial};const l=r.bind({});l.args={class:t.disabled};const d=r.bind({});d.args={class:t.error};const o=r.bind({});o.args={class:t.warning};const u=r.bind({});u.args={class:t.success};const i=r.bind({});i.args={class:t.ordinary};var y,b,_;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(_=(b=n.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var h,v,V;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(V=(v=l.parameters)==null?void 0:v.docs)==null?void 0:V.source}}};var q,k,E;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(E=(k=d.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var S,I,P;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(P=(I=o.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var M,B,D;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(D=(B=u.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var C,w,N;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`(args: ITextareaProps) => ({
  components: {
    Textarea
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  \`
})`,...(N=(w=i.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const fe=["TextareaDefault","TextareaDisabled","TextareaError","TextareaWarning","TextareaSuccess","TextareaOrdinary"];export{n as TextareaDefault,l as TextareaDisabled,d as TextareaError,i as TextareaOrdinary,u as TextareaSuccess,o as TextareaWarning,fe as __namedExportsOrder,ge as default};
