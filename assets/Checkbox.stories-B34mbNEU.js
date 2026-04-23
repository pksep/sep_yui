import{S as s}from"./storybook-BJU81olc.js";import{l as h,d as k,J as C,n as y,p as x,R as _,m as g}from"./vue.esm-bundler-CrrBMa2I.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";var l=(e=>(e.small="small",e.medium="medium",e.big="big",e))(l||{}),n=(e=>(e.circled="circled",e.rounded="rounded",e))(n||{}),c=(e=>(e.blue="blue",e.red="red",e))(c||{});const V=["data-testid","checked","disabled"],p=h({__name:"Checkbox",props:{size:{default:l.medium},circular:{default:n.rounded},color:{default:c.blue},checked:{type:Boolean},modelValue:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},dataTestid:{default:"Checkbox"}},emits:["change","update:modelValue"],setup(e,{emit:b}){const a=e,r=b,o=k({isChecked:a.modelValue});C(()=>{o.isChecked=a.modelValue});const d=()=>{o.isChecked=!o.isChecked,r("change",o.isChecked),r("update:modelValue",o.isChecked)};return(E,z)=>(g(),y("input",{type:"checkbox",class:x(`checkbox-yui-kit checkbox-yui-kit_${a.size} checkbox-yui-kit_${a.circular} checkbox-yui-kit_${a.color}`),"data-testid":`${a.dataTestid}`,tabindex:"0",onChange:d,checked:o.isChecked,disabled:a.disabled,onKeyup:_(d,["enter"])},null,42,V))}}),f=v(p,[["__scopeId","data-v-f4ccdbcf"]]);p.__docgenInfo={exportName:"default",displayName:"Checkbox",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Checkbox'"}},{name:"size",required:!1,type:{name:"CheckboxSizeEnum"},defaultValue:{func:!1,value:"CheckboxSizeEnum.medium"}},{name:"circular",required:!1,type:{name:"CheckboxCircularEnum"},defaultValue:{func:!1,value:"CheckboxCircularEnum.rounded"}},{name:"color",required:!1,type:{name:"CheckboxColorEnum"},defaultValue:{func:!1,value:"CheckboxColorEnum.blue"}},{name:"checked",required:!1,type:{name:"boolean"}},{name:"modelValue",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["boolean"]}},{name:"update:modelValue",type:{names:["boolean"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Checkbox/Checkbox.vue"]};const w={title:"Checkbox/Checkbox",component:f,tags:["autodocs"],argTypes:{size:{control:{type:s.select},options:l},circular:{control:{type:s.select},options:n},color:{control:{type:s.select},options:c}}},q=e=>({components:{Checkbox:f},setup(){return{args:e}},template:`
    <Checkbox v-bind="args" />
  `}),t=q.bind({});var u,i,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(m=(i=t.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const S=["Default"];export{t as Default,S as __namedExportsOrder,w as default};
