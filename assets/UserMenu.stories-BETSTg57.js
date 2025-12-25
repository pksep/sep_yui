import{U as a,M as e}from"./UserMenu-BeEzsroH.js";import{S as o}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-D8QwmNJd.js";import"./Button-Bk9jAkTK.js";import"./sizes-9jYRAigb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Icon-CqsT1NC-.js";import"./Avatar-DXCOBzqI.js";import"./Popover-Dl-oy61u.js";import"./index-DtW3Gt5I.js";import"./Tooltip-DbV-qqYR.js";import"./change-style-properties-1EhjFsjc.js";import"./Switch-CRIYr-2T.js";import"./Toggle-B80S11av.js";const x={title:"UserMenu/UserMenu",component:a,argTypes:{user:{control:{type:"object"}},languages:{control:{type:"object"}},categories:{control:{type:"object"}},texts:{control:{type:"object"}},categoryLabels:{control:{type:"object"}},isBlackTheme:{control:{type:o.boolean}},closeAfterClick:{control:{type:o.boolean}}},tags:["autodocs"]},c=p=>({components:{UserMenu:a},setup(){return{args:p}},template:'<UserMenu v-bind="args"/> '}),t=c.bind({});t.args={user:{name:"David Perov",role:"Администратор",avatar:"/default-avatar.jpg"},languages:{items:["En","Ru"]},categories:[e.profile,e.theme,e.options,e.help,e.exit],texts:{[e.profile]:"My Profile",[e.options]:"Preferences"},isBlackTheme:!1,closeAfterClick:!0};var r,s,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
  components: {
    UserMenu
  },
  setup() {
    return {
      args
    };
  },
  template: \`<UserMenu v-bind="args"/> \`
})`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Default"];export{t as Default,T as __namedExportsOrder,x as default};
