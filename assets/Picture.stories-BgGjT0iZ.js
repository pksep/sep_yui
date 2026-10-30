import{f as $,w as b,j as s,u as c,F as w,y as d,t as p,l,k as q,d as C,p as I,s as r}from"./vue.esm-bundler-C1MAD3DN.js";import{_ as N,i as m,c as B}from"./PdfPreview-D1EFdOoC.js";import{L as F}from"./Loader-4CkhcQAE.js";import{_ as D}from"./_plugin-vue_export-helper-DlAUqK2U.js";var o=(e=>(e.img="img",e.pdf="pdf",e.docx="docx",e))(o||{});const S=["data-testid"],V=["data-testid"],j=["src","alt","data-testid"],z=["src","data-testid"],O=["data-testid"],R=["data-testid"],A=["data-testid"],h=$({__name:"Picture",props:{type:{},alt:{},url:{},caption:{},dataTestid:{default:"Picture"}},setup(e){const t=e,a=C({isLoad:!1,isError:!1}),v=I(()=>a.isError?!1:!t.url||!t.type||t.type==o.img?!0:m(t.url)),u=()=>{a.isLoad=!0},L=()=>{a.isError=!0},E=()=>{a.isLoad=!1,a.isError=!1};return b(()=>t.url,()=>{E()}),(G,H)=>(r(),s("figure",{class:"picture-yui-kit","data-testid":t.dataTestid},[t.type==c(o).img?(r(),s(w,{key:0},[d("picture",{class:"picture-yui-kit__picture","data-testid":`${t.dataTestid}-Picture`},[!a.isError&&t.url?(r(),s("img",{key:0,class:"picture-yui-kit__picture_image",src:t.url,alt:t.alt,"data-testid":`${t.dataTestid}-Picture-Img`,onLoad:u,onError:L},null,40,j)):(r(),s("img",{key:1,src:c(B),alt:"not found",class:"picture-yui-kit__picture_image","data-testid":`${t.dataTestid}-Picture-Img`},null,8,z))],8,V),d("figcaption",{class:"picture-yui-kit__picture__caption","data-testid":`${t.dataTestid}-Caption`},p(t.caption),9,O)],64)):c(m)(t.url)?(r(),l(N,{key:1,class:"picture-yui-kit__picture_image",src:t.url,page:1,dataTestid:`${t.dataTestid}-PdfPreview`,onLoad:u},null,8,["src","dataTestid"])):(r(),s("div",{key:2,class:"picture-yui-kit__caption","data-testid":`${t.dataTestid}-Caption-Box`},[d("h4",{class:"picture-yui-kit__caption__title","data-testid":`${t.dataTestid}-Caption-Title`},p(t.caption),9,A)],8,R)),!a.isLoad&&v.value?(r(),l(F,{key:3,class:"picture-yui-kit__loader"})):q("",!0)],8,S))}}),T=D(h,[["__scopeId","data-v-bb39f23f"]]);h.__docgenInfo={exportName:"default",displayName:"Picture",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Picture'"}},{name:"type",required:!0,type:{name:"PictureEnum"}},{name:"alt",required:!1,type:{name:"string"}},{name:"url",required:!1,type:{name:"string"}},{name:"caption",required:!1,type:{name:"string"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Picture/Picture.vue"]};const U={title:"Picture/Picture",component:T,argTypes:{},tags:["autodocs"]},x=e=>({components:{Picture:T},setup(){return{args:e}},template:`<Picture v-bind="args" style="width: 500px;"
 />`}),i=x.bind({});i.args={type:o.img,url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg",alt:"elephant"};const n=x.bind({});n.args={type:o.docx,caption:".sldrt"};var _,f,g;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,P,k;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(k=(P=n.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};const W=["PictureDefault","PictureNotImage"];export{i as PictureDefault,n as PictureNotImage,W as __namedExportsOrder,U as default};
