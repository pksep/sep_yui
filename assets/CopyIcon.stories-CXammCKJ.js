import{S as d}from"./storybook-BJU81olc.js";import{f as i}from"./index-CGbn3E6N.js";import{j as y,k as f,v as g,u as C}from"./vue.esm-bundler-CiAvViym.js";import{I,a as _}from"./Icon-Bf7DVt4B.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const t=y({__name:"CopyIcon",props:{content:{default:""},dataTestid:{default:"CopyIcon"}},setup(n){const s=n,u=()=>{const c=s.content,e=document.createElement("textarea");e.value=c;const a=document.querySelectorAll("dialog[open]"),r=a.length?a[a.length-1]:null;r?r.append(e):document.body.append(e),e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),e.remove()};return(c,e)=>(f(),g(_,{class:"copy-icon-yui-kit",name:C(I).copy,"data-testid":s.dataTestid,onClick:u},null,8,["name","data-testid"]))}});t.__docgenInfo={exportName:"default",displayName:"CopyIcon",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'CopyIcon'"}},{name:"content",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/CopyIcon/CopyIcon.vue"]};const T={components:{CopyIcon:t},title:"Icon/CopyIcon",component:t,argTypes:{content:{control:{type:d.text},description:"Контент для копии"}},tags:["autodocs"],args:{onClick:i()}},o=n=>({components:{CopyIcon:t},setup(){return{args:n}},template:'<CopyIcon v-bind="args"/>'});var p,l,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => ({
  components: {
    CopyIcon
  },
  setup() {
    return {
      args
    };
  },
  template: '<CopyIcon v-bind="args"/>'
})`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const b=["Default"];export{o as Default,b as __namedExportsOrder,T as default};
