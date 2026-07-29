import{f as A,a as b,j as I,v as i,x,u as F,t as L,n as P,d as C,r as q,q as N}from"./vue.esm-bundler-BR4_nak_.js";import{a as V,I as w}from"./Icon-C0IhYqV9.js";import{_ as B}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as E}from"./index-CAp0N5ye.js";const M=["data-testid"],S=["data-testid"],$=["data-testid"],R=["data-testid","multiple"],f=A({__name:"DragAndDrop",props:{singleFileMode:{type:Boolean,default:!1},title:{default:"Кликните или перенесите файлы"},dataTestid:{default:"DragAndDrop"}},emits:["fileDropped"],setup(o,{emit:g}){const t=o,D=g,s=C({isPressed:!1}),n=q(null),_=e=>{const a=e.target;l(a.files)},v=()=>{n.value&&(n.value.value="")},y=e=>{var r;e.preventDefault();const a=(r=e.currentTarget)==null?void 0:r.children[0];a.classList.contains("active")||a.classList.add("active")},h=e=>{e.currentTarget.children[0].classList.remove("active")},T=e=>{var r;e.preventDefault(),l(((r=e.dataTransfer)==null?void 0:r.files)||null),e.currentTarget.children[0].classList.remove("active")},k=()=>{s.isPressed=!s.isPressed},l=e=>{s.isPressed=!1,D("fileDropped",e)};return b(()=>{var e;(e=n.value)==null||e.addEventListener("cancel",()=>{s.isPressed=!1})}),(e,a)=>(N(),I("div",{onDragover:y,onDragleave:h,onDrop:T,class:"dnd-yui-kit","data-testid":t.dataTestid},[i("label",{for:"docsFileSelected",class:P(["dnd-yui-kit__label",{"is-pressed":s.isPressed}]),onClick:k,"data-testid":`${t.dataTestid}-Label`},[x(V,{name:F(w).paperClip,"stroke-width":"2","data-testid":`${t.dataTestid}-Icon`},null,8,["name","data-testid"]),i("span",{class:"dnd-yui-kit__span","data-testid":`${t.dataTestid}-Title`},L(t.title),9,$)],10,S),i("input",{id:"docsFileSelected",onChange:_,onClick:v,type:"file",style:{display:"none"},"data-testid":`${t.dataTestid}-Input`,required:"",multiple:!t.singleFileMode,ref_key:"fileInputRef",ref:n},null,40,R)],40,M))}}),m=B(f,[["__scopeId","data-v-6a4496de"]]);f.__docgenInfo={exportName:"default",displayName:"DragAndDrop",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'DragAndDrop'"}},{name:"singleFileMode",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Кликните или перенесите файлы'"}}],events:[{name:"fileDropped",type:{names:["union"],elements:[{name:"FileList"},{name:"null"}]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/DragAndDrop/DragAndDrop.vue"]};const J={title:"DragAndDrop/DragAndDrop",component:m,tags:["autodocs"],parameters:{backgrounds:{default:"Gray"}},args:{fileDropped:E()}},j=o=>({components:{DragAndDrop:m},setup(){return{args:o}},template:`
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" @fileDropped="args.fileDropped" />
      </div>
    `}),d=j.bind({});var p,c,u;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`args => ({
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
})`,...(u=(c=d.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const K=["Default"];export{d as Default,K as __namedExportsOrder,J as default};
