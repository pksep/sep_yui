import{j as b,b as A,r as I,s as x,k as F,l as L,x as i,E as P,u as C,m as E,F as N}from"./vue.esm-bundler-DC1UwcWE.js";import{I as V,a as q}from"./Icon-BRmBMtLe.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{f as B}from"./index-CGbn3E6N.js";const M=["data-testid"],S=["data-testid"],$=["data-testid"],R=["data-testid","multiple"],f=b({__name:"DragAndDrop",props:{singleFileMode:{type:Boolean,default:!1},title:{default:"Кликните или перенесите файлы"},dataTestid:{default:"DragAndDrop"}},emits:["fileDropped"],setup(o,{emit:g}){const t=o,D=g,s=A({isPressed:!1}),n=I(null),_=e=>{const a=e.target;l(a.files)},v=()=>{n.value&&(n.value.value="")},y=e=>{var r;e.preventDefault();const a=(r=e.currentTarget)==null?void 0:r.children[0];a.classList.contains("active")||a.classList.add("active")},h=e=>{e.currentTarget.children[0].classList.remove("active")},k=e=>{var r;e.preventDefault(),l(((r=e.dataTransfer)==null?void 0:r.files)||null),e.currentTarget.children[0].classList.remove("active")},T=()=>{s.isPressed=!s.isPressed},l=e=>{s.isPressed=!1,D("fileDropped",e)};return x(()=>{var e;(e=n.value)==null||e.addEventListener("cancel",()=>{s.isPressed=!1})}),(e,a)=>(F(),L("div",{onDragover:y,onDragleave:h,onDrop:k,class:"dnd-yui-kit","data-testid":t.dataTestid},[i("label",{for:"docsFileSelected",class:N(["dnd-yui-kit__label",{"is-pressed":s.isPressed}]),onClick:T,"data-testid":`${t.dataTestid}-Label`},[P(q,{name:C(V).paperClip,"stroke-width":"2","data-testid":`${t.dataTestid}-Icon`},null,8,["name","data-testid"]),i("span",{class:"dnd-yui-kit__span","data-testid":`${t.dataTestid}-Title`},E(t.title),9,$)],10,S),i("input",{id:"docsFileSelected",onChange:_,onClick:v,type:"file",style:{display:"none"},"data-testid":`${t.dataTestid}-Input`,required:"",multiple:!t.singleFileMode,ref_key:"fileInputRef",ref:n},null,40,R)],40,M))}}),m=w(f,[["__scopeId","data-v-acbc6bd8"]]);f.__docgenInfo={exportName:"default",displayName:"DragAndDrop",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'DragAndDrop'"}},{name:"singleFileMode",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Кликните или перенесите файлы'"}}],events:[{name:"fileDropped",type:{names:["union"],elements:[{name:"FileList"},{name:"null"}]}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/DragAndDrop/DragAndDrop.vue"]};const J={title:"DragAndDrop/DragAndDrop",component:m,tags:["autodocs"],parameters:{backgrounds:{default:"Gray"}},args:{fileDropped:B()}},j=o=>({components:{DragAndDrop:m},setup(){return{args:o}},template:`
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
