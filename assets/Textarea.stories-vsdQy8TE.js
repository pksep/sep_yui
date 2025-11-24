import{j as G,b as H,f as J,w as K,l as p,N as Q,m as R,p as f,z as X,O as Y,A as Z,C as ee,k as c}from"./vue.esm-bundler-CiAvViym.js";import{_ as ae}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{I as t}from"./enum-D-JvIl_F.js";import{S as x}from"./storybook-BJU81olc.js";var w=(a=>(a.default="default",a.minor="minor",a))(w||{});const se=["data-testid"],te=["data-testid"],re=["data-testid"],ne=["data-testid","placeholder","required","maxlength","readonly"],F=G({__name:"Textarea",props:{placeholder:{},inputMessage:{},required:{type:Boolean,default:!1},maxlength:{},modelValue:{default:""},readonly:{type:Boolean,default:!1},type:{default:w.default},modelModifiers:{default:()=>({})},dataTestid:{default:"Textarea"}},emits:["update:modelValue"],setup(a,{emit:$}){const e=a,j=$,s=H({isPressed:!1,inputElement:e.modelValue}),z=J(()=>[{pressed:s.isPressed,readonly:e.readonly,[e.type]:!0}]),L=()=>{j("update:modelValue",s.inputElement)},W=()=>{e.readonly||(s.isPressed=!0)},A=()=>{s.isPressed=!1};return K(()=>e.modelValue,m=>{s.inputElement=m}),(m,g)=>(c(),p("fieldset",{class:ee(["input-yui-kit",z.value]),onFocusout:A,"data-testid":e.dataTestid},[e.inputMessage?(c(),p("legend",{key:0,class:"input-yui-kit__legend","data-testid":`${e.dataTestid}-Legend`},[Q(R(e.inputMessage)+" ",1),e.required?(c(),p("sup",{key:0,class:"input-yui-kit__star","data-testid":`${e.dataTestid}-Legend-Star`},"*",8,re)):f("",!0)],8,te)):f("",!0),X(Z("textarea",{"onUpdate:modelValue":g[0]||(g[0]=U=>s.inputElement=U),onFocus:W,onInput:L,"data-testid":`${e.dataTestid}-Textarea`,class:"input-yui-kit__input",placeholder:e.placeholder,required:e.required,maxlength:e.maxlength,readonly:e.readonly},null,40,ne),[[Y,s.inputElement]])],42,se))}}),O=ae(F,[["__scopeId","data-v-d71a57d3"]]);F.__docgenInfo={exportName:"default",displayName:"Textarea",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Textarea'"}},{name:"placeholder",required:!1,type:{name:"string"}},{name:"inputMessage",required:!1,type:{name:"string"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"maxlength",required:!1,type:{name:"number"}},{name:"modelValue",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"readonly",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"type",required:!1,type:{name:"TextareaTypeEnum"},defaultValue:{func:!1,value:"TextareaTypeEnum.default"}},{name:"modelModifiers",required:!0,type:{name:"object"},defaultValue:{func:!1,value:"() => ({})"}}],events:[{name:"update:modelValue",type:{names:["string"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Textarea/Textarea.vue"]};const ie={title:"Textarea/Textarea",component:O,argTypes:{class:{control:{type:x.select},options:t},required:{control:{type:x.boolean},defaultValue:!1}},args:{placeholder:"Введите текст",inputMessage:"Текст"},tags:["autodocs"]},r=a=>({components:{Textarea:O},setup(){return{args:a}},template:`
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  `}),n=r.bind({});n.args={class:t.initial};const d=r.bind({});d.args={class:t.disabled};const o=r.bind({});o.args={class:t.error};const l=r.bind({});l.args={class:t.warning};const u=r.bind({});u.args={class:t.success};const i=r.bind({});i.args={class:t.ordinary};var T,y,b;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(b=(y=n.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var _,v,h;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(h=(v=d.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var V,q,E;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(E=(q=o.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var I,S,k;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(k=(S=l.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var P,M,B;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(B=(M=u.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var C,D,N;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(N=(D=i.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};const pe=["TextareaDefault","TextareaDisabled","TextareaError","TextareaWarning","TextareaSuccess","TextareaOrdinary"];export{n as TextareaDefault,d as TextareaDisabled,o as TextareaError,i as TextareaOrdinary,u as TextareaSuccess,l as TextareaWarning,pe as __namedExportsOrder,ie as default};
