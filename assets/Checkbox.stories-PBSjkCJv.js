import{S as s}from"./storybook-BJU81olc.js";import{j as k,b as h,L as C,l as y,D as x,Q as _,k as g}from"./vue.esm-bundler-BS9OZKXr.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";var l=(e=>(e.small="small",e.medium="medium",e.big="big",e))(l||{}),n=(e=>(e.circled="circled",e.rounded="rounded",e))(n||{}),c=(e=>(e.blue="blue",e.red="red",e))(c||{});const V=["data-testid","checked","disabled"],p=k({__name:"Checkbox",props:{size:{default:l.medium},circular:{default:n.rounded},color:{default:c.blue},checked:{type:Boolean},modelValue:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},dataTestid:{default:"Checkbox"}},emits:["change","update:modelValue"],setup(e,{emit:b}){const a=e,r=b,o=h({isChecked:a.modelValue});C(()=>{o.isChecked=a.modelValue});const u=()=>{o.isChecked=!o.isChecked,r("change",o.isChecked),r("update:modelValue",o.isChecked)};return(E,z)=>(g(),y("input",{type:"checkbox",class:x(`checkbox-yui-kit checkbox-yui-kit_${a.size} checkbox-yui-kit_${a.circular} checkbox-yui-kit_${a.color}`),"data-testid":`${a.dataTestid}`,tabindex:"0",onChange:u,checked:o.isChecked,disabled:a.disabled,onKeyup:_(u,["enter"])},null,42,V))}}),f=v(p,[["__scopeId","data-v-77e5e5df"]]);p.__docgenInfo={exportName:"default",displayName:"Checkbox",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Checkbox'"}},{name:"size",required:!1,type:{name:"CheckboxSizeEnum"},defaultValue:{func:!1,value:"CheckboxSizeEnum.medium"}},{name:"circular",required:!1,type:{name:"CheckboxCircularEnum"},defaultValue:{func:!1,value:"CheckboxCircularEnum.rounded"}},{name:"color",required:!1,type:{name:"CheckboxColorEnum"},defaultValue:{func:!1,value:"CheckboxColorEnum.blue"}},{name:"checked",required:!1,type:{name:"boolean"}},{name:"modelValue",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["boolean"]}},{name:"update:modelValue",type:{names:["boolean"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Checkbox/Checkbox.vue"]};const w={title:"Checkbox/Checkbox",component:f,tags:["autodocs"],argTypes:{size:{control:{type:s.select},options:l},circular:{control:{type:s.select},options:n},color:{control:{type:s.select},options:c}}},q=e=>({components:{Checkbox:f},setup(){return{args:e}},template:`
    <Checkbox v-bind="args" />
  `}),t=q.bind({});var d,i,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
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
})`,...(m=(i=t.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,w as default};
