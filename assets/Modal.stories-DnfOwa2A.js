import{S as l}from"./storybook-BJU81olc.js";import{M as p}from"./ModalAnimated-Cwv7voqr.js";import{B as i}from"./Button-Bk9jAkTK.js";import{w as c,u as n}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./change-style-properties-1EhjFsjc.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sizes-9jYRAigb.js";const y={title:"Modal/Modal",component:p,argTypes:{open:{control:{type:l.boolean},defaultValue:!0}},args:{open:!1},tags:["autodocs"]},m=o=>({components:{ModalAnimated:p,Button:i},setup(){return{args:o}},template:`
    <Button @click="args.open=true"> Open Dialog </Button>
    <ModalAnimated v-bind="args" :open="args.open"  width="30vw" height="100vh" @close="args.open=false" />
  `}),t=m.bind({});t.play=async({canvasElement:o})=>{const e=c(o).getByRole("button");await n.click(e),await n.click(e,{delay:5e3})};var a,r,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    ModalAnimated,
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Button @click="args.open=true"> Open Dialog </Button>
    <ModalAnimated v-bind="args" :open="args.open"  width="30vw" height="100vh" @close="args.open=false" />
  \`
})`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const M=["Default"];export{t as Default,M as __namedExportsOrder,y as default};
