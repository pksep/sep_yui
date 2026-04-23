import{l as $,d as q,k as w,w as C,m as r,n as s,u as o,F as I,z as d,s as p,M as l,q as N}from"./vue.esm-bundler-CrrBMa2I.js";import{c as b,i as m,_ as B}from"./PdfPreview-COxMD83w.js";import{L as F}from"./Loader-CU37UkcD.js";import{_ as D}from"./_plugin-vue_export-helper-DlAUqK2U.js";var n=(e=>(e.img="img",e.pdf="pdf",e.docx="docx",e))(n||{});const S=["data-testid"],V=["data-testid"],z=["src","alt","data-testid"],j=["src","data-testid"],M=["data-testid"],O=["data-testid"],R=["data-testid"],h=$({__name:"Picture",props:{type:{},alt:{},url:{},caption:{},dataTestid:{default:"Picture"}},setup(e){const t=e,a=q({isLoad:!1,isError:!1}),v=w(()=>a.isError?!1:!t.url||!t.type||t.type==n.img?!0:m(t.url)),u=()=>{a.isLoad=!0},L=()=>{a.isError=!0},E=()=>{a.isLoad=!1,a.isError=!1};return C(()=>t.url,()=>{E()}),(A,G)=>(r(),s("figure",{class:"picture-yui-kit","data-testid":t.dataTestid},[t.type==o(n).img?(r(),s(I,{key:0},[d("picture",{class:"picture-yui-kit__picture","data-testid":`${t.dataTestid}-Picture`},[!a.isError&&t.url?(r(),s("img",{key:0,class:"picture-yui-kit__picture_image",src:t.url,alt:t.alt,"data-testid":`${t.dataTestid}-Picture-Img`,onLoad:u,onError:L},null,40,z)):(r(),s("img",{key:1,src:o(b),alt:"not found",class:"picture-yui-kit__picture_image","data-testid":`${t.dataTestid}-Picture-Img`},null,8,j))],8,V),d("figcaption",{class:"picture-yui-kit__picture__caption","data-testid":`${t.dataTestid}-Caption`},p(t.caption),9,M)],64)):o(m)(t.url)?(r(),l(B,{key:1,class:"picture-yui-kit__picture_image",src:t.url,page:1,dataTestid:`${t.dataTestid}-PdfPreview`,onLoad:u},null,8,["src","dataTestid"])):(r(),s("div",{key:2,class:"picture-yui-kit__caption","data-testid":`${t.dataTestid}-Caption-Box`},[d("h4",{class:"picture-yui-kit__caption__title","data-testid":`${t.dataTestid}-Caption-Title`},p(t.caption),9,R)],8,O)),!a.isLoad&&v.value?(r(),l(F,{key:3,class:"picture-yui-kit__loader"})):N("",!0)],8,S))}}),T=D(h,[["__scopeId","data-v-cc137275"]]);h.__docgenInfo={exportName:"default",displayName:"Picture",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Picture'"}},{name:"type",required:!0,type:{name:"PictureEnum"}},{name:"alt",required:!1,type:{name:"string"}},{name:"url",required:!1,type:{name:"string"}},{name:"caption",required:!1,type:{name:"string"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Picture/Picture.vue"]};const U={title:"Picture/Picture",component:T,argTypes:{},tags:["autodocs"]},x=e=>({components:{Picture:T},setup(){return{args:e}},template:`<Picture v-bind="args" style="width: 500px;"
 />`}),i=x.bind({});i.args={type:n.img,url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg",alt:"elephant"};const c=x.bind({});c.args={type:n.docx,caption:".sldrt"};var _,g,f;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    Picture
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Picture v-bind="args" style="width: 500px;"
 />\`
})`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,P,k;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
  components: {
    Picture
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Picture v-bind="args" style="width: 500px;"
 />\`
})`,...(k=(P=c.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};const W=["PictureDefault","PictureNotImage"];export{i as PictureDefault,c as PictureNotImage,W as __namedExportsOrder,U as default};
