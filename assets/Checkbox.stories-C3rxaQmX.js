import{S as d}from"./storybook-BJU81olc.js";import{j as h,b as k,v as b,l as C,F as y,P as x,k as _}from"./vue.esm-bundler-C1Jsocv3.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";var s=(e=>(e.small="small",e.medium="medium",e.big="big",e))(s||{}),n=(e=>(e.circled="circled",e.rounded="rounded",e))(n||{});const v=["data-testid","checked","disabled"],m=h({__name:"Checkbox",props:{size:{default:s.medium},circular:{default:n.rounded},checked:{type:Boolean},modelValue:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},dataTestid:{default:"Checkbox"}},emits:["change","update:modelValue"],setup(e,{emit:f}){const a=e,c=f,t=k({isChecked:a.modelValue});b(()=>{t.isChecked=a.modelValue});const l=()=>{t.isChecked=!t.isChecked,c("change",t.isChecked),c("update:modelValue",t.isChecked)};return(q,z)=>(_(),C("input",{type:"checkbox",class:y(`checkbox-yui-kit checkbox-yui-kit_${a.size} checkbox-yui-kit_${a.circular}`),"data-testid":`${a.dataTestid}`,tabindex:"0",onChange:l,checked:t.isChecked,disabled:a.disabled,onKeyup:x(l,["enter"])},null,42,v))}}),p=g(m,[["__scopeId","data-v-4f211665"]]);m.__docgenInfo={exportName:"default",displayName:"Checkbox",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Checkbox'"}},{name:"size",required:!1,type:{name:"CheckboxSizeEnum"},defaultValue:{func:!1,value:"CheckboxSizeEnum.medium"}},{name:"circular",required:!1,type:{name:"CheckboxCircularEnum"},defaultValue:{func:!1,value:"CheckboxCircularEnum.rounded"}},{name:"checked",required:!1,type:{name:"boolean"}},{name:"modelValue",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["boolean"]}},{name:"update:modelValue",type:{names:["boolean"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Checkbox/Checkbox.vue"]};const w={title:"Checkbox/Checkbox",component:p,tags:["autodocs"],argTypes:{size:{control:{type:d.select},options:s},circular:{control:{type:d.select},options:n}}},V=e=>({components:{Checkbox:p},setup(){return{args:e}},template:`
    <Checkbox v-bind="args" />
  `}),o=V.bind({});var r,u,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
  components: {
    Checkbox
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Checkbox v-bind="args" />
  \`
})`,...(i=(u=o.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const S=["Default"];export{o as Default,S as __namedExportsOrder,w as default};
