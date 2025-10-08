import{j as f,L as v,M as g,H as R,N as b,k as y,l as _}from"./vue.esm-bundler-DJ2C_uUp.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x=["disabled","name","value","data-testid"],m=f({name:"Radio",__name:"Radio",props:v({name:{},value:{},disabled:{type:Boolean,default:!1},dataTestid:{default:"Radio"}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const c=e,t=g(e,"modelValue");return(M,o)=>R((y(),_("input",{"onUpdate:modelValue":o[0]||(o[0]=p=>t.value=p),type:"radio",disabled:e.disabled,name:e.name,value:e.value,class:"radio","data-testid":c.dataTestid},null,8,x)),[[b,t.value]])}}),D=V(m,[["__scopeId","data-v-5fca4dd8"]]);m.__docgenInfo={name:"Radio",exportName:"default",displayName:"Radio",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Radio'"}},{name:"name",required:!0,type:{name:"string"}},{name:"value",required:!0,type:{name:"T"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Radio/Radio.vue"]};const w={title:"Radio/Radio",component:D,tags:["autodocs"],args:{name:"test"}},a={args:{value:"one"}},s={args:{disabled:!0,value:"two"}};var d,r,n;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 'one'
  }
}`,...(n=(r=a.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var l,i,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: 'two'
  }
}`,...(u=(i=s.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const T=["Default","Disabled"];export{a as Default,s as Disabled,T as __namedExportsOrder,w as default};
