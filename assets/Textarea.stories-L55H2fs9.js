import{f as G,d as H,w as J,j as p,B as K,t as Q,k as f,C as R,D as X,v as Y,n as Z,m as ee,q as c}from"./vue.esm-bundler-BR4_nak_.js";import{_ as ae}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{I as t}from"./enum-D-JvIl_F.js";import{S as x}from"./storybook-BJU81olc.js";var N=(a=>(a.default="default",a.minor="minor",a))(N||{});const se=["data-testid"],te=["data-testid"],re=["data-testid"],ne=["data-testid","placeholder","required","maxlength","readonly"],F=G({__name:"Textarea",props:{placeholder:{},inputMessage:{},required:{type:Boolean,default:!1},maxlength:{},modelValue:{default:""},readonly:{type:Boolean,default:!1},type:{default:N.default},modelModifiers:{default:()=>({})},dataTestid:{default:"Textarea"}},emits:["update:modelValue"],setup(a,{emit:$}){const e=a,j=$,s=H({isPressed:!1,inputElement:e.modelValue}),L=ee(()=>[{pressed:s.isPressed,readonly:e.readonly,[e.type]:!0}]),W=()=>{j("update:modelValue",s.inputElement)},z=()=>{e.readonly||(s.isPressed=!0)},U=()=>{s.isPressed=!1};return J(()=>e.modelValue,m=>{s.inputElement=m}),(m,g)=>(c(),p("fieldset",{class:Z(["input-yui-kit",L.value]),onFocusout:U,"data-testid":e.dataTestid},[e.inputMessage?(c(),p("legend",{key:0,class:"input-yui-kit__legend","data-testid":`${e.dataTestid}-Legend`},[K(Q(e.inputMessage)+" ",1),e.required?(c(),p("sup",{key:0,class:"input-yui-kit__star","data-testid":`${e.dataTestid}-Legend-Star`},"*",8,re)):f("",!0)],8,te)):f("",!0),R(Y("textarea",{"onUpdate:modelValue":g[0]||(g[0]=A=>s.inputElement=A),onFocus:z,onInput:W,"data-testid":`${e.dataTestid}-Textarea`,class:"input-yui-kit__input",placeholder:e.placeholder,required:e.required,maxlength:e.maxlength,readonly:e.readonly},null,40,ne),[[X,s.inputElement]])],42,se))}}),O=ae(F,[["__scopeId","data-v-0fe11b1b"]]);F.__docgenInfo={exportName:"default",displayName:"Textarea",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Textarea'"}},{name:"placeholder",required:!1,type:{name:"string"}},{name:"inputMessage",required:!1,type:{name:"string"}},{name:"required",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"maxlength",required:!1,type:{name:"number"}},{name:"modelValue",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"readonly",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"type",required:!1,type:{name:"TextareaTypeEnum"},defaultValue:{func:!1,value:"TextareaTypeEnum.default"}},{name:"modelModifiers",required:!0,type:{name:"object"},defaultValue:{func:!1,value:"() => ({})"}}],events:[{name:"update:modelValue",type:{names:["string"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Textarea/Textarea.vue"]};const ie={title:"Textarea/Textarea",component:O,argTypes:{class:{control:{type:x.select},options:t},required:{control:{type:x.boolean},defaultValue:!1}},args:{placeholder:"Введите текст",inputMessage:"Текст"},tags:["autodocs"]},r=a=>({components:{Textarea:O},setup(){return{args:a}},template:`
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
})`,...(B=(M=u.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var D,C,w;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`(args: ITextareaProps) => ({
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
})`,...(w=(C=i.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};const pe=["TextareaDefault","TextareaDisabled","TextareaError","TextareaWarning","TextareaSuccess","TextareaOrdinary"];export{n as TextareaDefault,d as TextareaDisabled,o as TextareaError,i as TextareaOrdinary,u as TextareaSuccess,l as TextareaWarning,pe as __namedExportsOrder,ie as default};
