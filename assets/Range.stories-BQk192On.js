import{j as b,L as d,M as x,r as f,w as V,q,H as M,O as k,k as P,l as T,P as w}from"./vue.esm-bundler-DJ2C_uUp.js";import{c as I}from"./change-style-properties-1EhjFsjc.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B=["data-testid"],g=b({name:"Range",__name:"Range",props:d({min:{default:0},max:{default:100},step:{default:1},disabled:{type:Boolean,default:!1},dataTestid:{default:"Range"}},{modelValue:{default:0},modelModifiers:{}}),emits:d(["unmount-change","unmount-input"],["update:modelValue"]),setup(t,{emit:u}){const a=t,l=u,s=x(t,"modelValue"),r=f(null);V(s,()=>{m()});const _=()=>(s.value-a.min)/(a.max-a.min)*100,m=()=>{requestAnimationFrame(()=>{r.value&&I({"--progress":_()+"%"},r.value)})},y=n=>{const e=n.target;e&&l("unmount-change",Number(e.value))},R=n=>{const e=n.target;e&&l("unmount-change",Number(e.value))};return q(()=>{m()}),(n,e)=>M((P(),T("input",w({ref_key:"input",ref:r,type:"range"},a,{class:"range","onUpdate:modelValue":e[0]||(e[0]=h=>s.value=h),onChange:y,onInput:R,"data-testid":a.dataTestid}),null,16,B)),[[k,s.value]])}}),v=N(g,[["__scopeId","data-v-4c8abd39"]]);g.__docgenInfo={name:"Range",exportName:"default",displayName:"Range",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Range'"}},{name:"min",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"max",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"step",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"unmount-change",type:{names:["number"]}},{name:"unmount-input",type:{names:["number"]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Range/Range.vue"]};const O={title:"Range/Range",component:v,tags:["autodocs"]},C=t=>({components:{Range:v},setup(){const u=f(null);return{args:t,model:u}},template:`
    <Range  />
  `}),o=C.bind({});var c,p,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    Range
  },
  setup() {
    const model = ref(null);
    return {
      args,
      model
    };
  },
  template: \`
    <Range  />
  \`
})`,...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const S=["Default"];export{o as Default,S as __namedExportsOrder,O as default};
