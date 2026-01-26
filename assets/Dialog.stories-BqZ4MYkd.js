import{S as w}from"./storybook-BJU81olc.js";import{D as f}from"./Dialog-B83ae4P1.js";import{B as v}from"./Button-xRmCTYUs.js";import{v as S}from"./v4-CQkTLCs1.js";import{w as B,u as g}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-BHGztBRP.js";import"./index-BXt-ztV4.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sizes-9jYRAigb.js";const{addons:I}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:T}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:m}=__STORYBOOK_MODULE_GLOBAL__;var A="storybook/actions",P=`${A}/action-event`,j={depth:10,clearOnStoryChange:!0,limit:50},y=(t,o)=>{let e=Object.getPrototypeOf(t);return!e||o(e)?e:y(e,o)},V=t=>!!(typeof t=="object"&&t&&y(t,o=>/^Synthetic(?:Base)?Event$/.test(o.constructor.name))&&typeof t.persist=="function"),k=t=>{if(V(t)){let o=Object.create(t.constructor.prototype,Object.getOwnPropertyDescriptors(t));o.persist();let e=Object.getOwnPropertyDescriptor(o,"view"),n=e==null?void 0:e.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(o,"view",{...e,value:Object.create(n.constructor.prototype)}),o}return t},x=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?S():Date.now().toString(36)+Math.random().toString(36).substring(2);function C(t,o={}){let e={...j,...o},n=function(...i){var c,p;if(o.implicit){let l=(c="__STORYBOOK_PREVIEW__"in m?m.__STORYBOOK_PREVIEW__:void 0)==null?void 0:c.storyRenders.find(a=>a.phase==="playing"||a.phase==="rendering");if(l){let a=!((p=window==null?void 0:window.FEATURES)!=null&&p.disallowImplicitActionsInRenderV8),u=new T({phase:l.phase,name:t,deprecated:a});if(a)console.warn(u);else throw u}}let E=I.getChannel(),h=x(),D=5,s=i.map(k),R=i.length>1?s:s[0],b={id:h,count:0,data:{name:t,args:R},options:{...e,maxDepth:D+(e.depth||3),allowFunction:e.allowFunction||!1}};E.emit(P,b)};return n.isAction=!0,n.implicit=o.implicit,n}const G={title:"Dialog/Dialog",component:f,argTypes:{open:{control:{type:w.boolean},defaultValue:!0}},args:{open:!1},tags:["autodocs"]},K=t=>({components:{Dialog:f,Button:v},setup(){return{args:t}},template:`
    <Button @click="args.open=true"> Open Dialog </Button>
    <Dialog v-bind="args" :open="args.open"  width="300px" height="300px" @close="args.open=false" />
  `}),r=K.bind({});r.args={onClick:C("click")};r.play=async({canvasElement:t})=>{const e=B(t).getByRole("button");await g.click(e),await g.click(e,{delay:5e3})};var d,O,_;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Dialog,
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Button @click="args.open=true"> Open Dialog </Button>
    <Dialog v-bind="args" :open="args.open"  width="300px" height="300px" @close="args.open=false" />
  \`
})`,...(_=(O=r.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};const q=["Default"];export{r as Default,q as __namedExportsOrder,G as default};
