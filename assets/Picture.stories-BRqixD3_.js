import{j as P,k as n,l as c,u as h,K as x,x as i,m as o}from"./vue.esm-bundler-lZQpEf4m.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";var r=(e=>(e.img="img",e.pdf="pdf",e.docx="docx",e))(r||{});const T=["data-testid"],v=["data-testid"],b=["src","alt","data-testid"],q=["data-testid"],I=["data-testid"],N=["data-testid"],g=P({__name:"Picture",props:{type:{},alt:{},url:{},caption:{},dataTestid:{default:"Picture"}},setup(e){const t=e;return($,w)=>(n(),c("figure",{class:"picture-yui-kit","data-testid":t.dataTestid},[t.type==h(r).img?(n(),c(x,{key:0},[i("picture",{class:"picture-yui-kit__picture","data-testid":`${t.dataTestid}-Picture`},[i("img",{class:"picture-yui-kit__picture__image",src:t.url,alt:t.alt,"data-testid":`${t.dataTestid}-Picture-Img`},null,8,b)],8,v),i("figcaption",{class:"picture-yui-kit__picture__caption","data-testid":`${t.dataTestid}-Caption`},o(t.caption),9,q)],64)):(n(),c("div",{key:1,class:"picture-yui-kit__caption","data-testid":`${t.dataTestid}-Caption-Box`},[i("h4",{class:"picture-yui-kit__caption__title","data-testid":`${t.dataTestid}-Caption-Title`},o(t.caption),9,N)],8,I))],8,T))}}),y=k(g,[["__scopeId","data-v-b6eba94c"]]);g.__docgenInfo={exportName:"default",displayName:"Picture",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Picture'"}},{name:"type",required:!0,type:{name:"PictureEnum"}},{name:"alt",required:!1,type:{name:"string"}},{name:"url",required:!1,type:{name:"string"}},{name:"caption",required:!1,type:{name:"string"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Picture/Picture.vue"]};const D={title:"Picture/Picture",component:y,argTypes:{},tags:["autodocs"]},f=e=>({components:{Picture:y},setup(){return{args:e}},template:`<Picture v-bind="args" style="width: 500px;"
 />`}),a=f.bind({});a.args={type:r.img,url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg",alt:"elephant"};const s=f.bind({});s.args={type:r.docx,caption:".sldrt"};var d,p,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
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
})`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var l,m,_;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(_=(m=s.parameters)==null?void 0:m.docs)==null?void 0:_.source}}};const S=["PictureDefault","PictureNotImage"];export{a as PictureDefault,s as PictureNotImage,S as __namedExportsOrder,D as default};
