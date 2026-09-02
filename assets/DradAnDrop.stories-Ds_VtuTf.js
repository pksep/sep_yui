import{f as I,a as x,j as F,v as i,x as L,u as P,t as q,n as p,d as C,m as N,r as V,q as w}from"./vue.esm-bundler-BR4_nak_.js";import{I as B,a as E}from"./Icon-6CJLfYFP.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as S}from"./index-CAp0N5ye.js";const $=["data-testid"],R=["data-testid"],j=["data-testid"],z=["data-testid","multiple"],f=I({__name:"DragAndDrop",props:{singleFileMode:{type:Boolean,default:!1},title:{default:"Кликните или перенесите файлы"},type:{},dataTestid:{default:"DragAndDrop"}},emits:["fileDropped"],setup(o,{emit:D}){const t=o,y=D,s=C({isPressed:!1}),_=N(()=>[{"dnd-yui-kit_secondary":t.type==="secondary","dnd-yui-kit_primary":t.type==="primary"}]),n=V(null),v=e=>{const a=e.target;l(a.files)},h=()=>{n.value&&(n.value.value="")},k=e=>{var r;e.preventDefault();const a=(r=e.currentTarget)==null?void 0:r.children[0];a.classList.contains("active")||a.classList.add("active")},T=e=>{e.currentTarget.children[0].classList.remove("active")},A=e=>{var r;e.preventDefault(),l(((r=e.dataTransfer)==null?void 0:r.files)||null),e.currentTarget.children[0].classList.remove("active")},b=()=>{s.isPressed=!s.isPressed},l=e=>{s.isPressed=!1,y("fileDropped",e)};return x(()=>{var e;(e=n.value)==null||e.addEventListener("cancel",()=>{s.isPressed=!1})}),(e,a)=>(w(),F("div",{onDragover:k,onDragleave:T,onDrop:A,class:p(["dnd-yui-kit",_.value]),"data-testid":t.dataTestid},[i("label",{for:"docsFileSelected",class:p(["dnd-yui-kit__label",{"is-pressed":s.isPressed}]),onClick:b,"data-testid":`${t.dataTestid}-Label`},[L(B,{name:P(E).paperClip,"stroke-width":"2","data-testid":`${t.dataTestid}-Icon`},null,8,["name","data-testid"]),i("span",{class:"dnd-yui-kit__span","data-testid":`${t.dataTestid}-Title`},q(t.title),9,j)],10,R),i("input",{id:"docsFileSelected",onChange:v,onClick:h,type:"file",style:{display:"none"},"data-testid":`${t.dataTestid}-Input`,required:"",multiple:!t.singleFileMode,ref_key:"fileInputRef",ref:n},null,40,z)],42,$))}}),g=M(f,[["__scopeId","data-v-5f9a1913"]]);f.__docgenInfo={exportName:"default",displayName:"DragAndDrop",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'DragAndDrop'"}},{name:"singleFileMode",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Кликните или перенесите файлы'"}},{name:"type",required:!1,type:{name:"union",elements:[{name:'"primary"'},{name:'"secondary"'}]}}],events:[{name:"fileDropped",type:{names:["union"],elements:[{name:"FileList"},{name:"null"}]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/DragAndDrop/DragAndDrop.vue"]};const Q={title:"DragAndDrop/DragAndDrop",component:g,tags:["autodocs"],parameters:{backgrounds:{default:"Gray"}},args:{fileDropped:S()}},G=o=>({components:{DragAndDrop:g},setup(){return{args:o}},template:`
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" @fileDropped="args.fileDropped" />
      </div>
    `}),d=G.bind({});var c,u,m;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    DragAndDrop
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" @fileDropped="args.fileDropped" />
      </div>
    \`
})`,...(m=(u=d.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const U=["Default"];export{d as Default,U as __namedExportsOrder,Q as default};
