import{U as a,M as e}from"./UserMenu-Dx7Vcqg8.js";import{S as o}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-BES00G3L.js";import"./Button-Hpo6t1NW.js";import"./sizes-9jYRAigb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Icon-D2U7sOhu.js";import"./Avatar-aOnr5p6Y.js";import"./Popover-C2KTj0rB.js";import"./index-jYdernnr.js";import"./Tooltip-Ceh4oqI8.js";import"./change-style-properties-1EhjFsjc.js";import"./Switch-Drwf3eZG.js";import"./Toggle-sVcDzlxK.js";const x={title:"UserMenu/UserMenu",component:a,argTypes:{user:{control:{type:"object"}},languages:{control:{type:"object"}},categories:{control:{type:"object"}},texts:{control:{type:"object"}},categoryLabels:{control:{type:"object"}},isBlackTheme:{control:{type:o.boolean}},closeAfterClick:{control:{type:o.boolean}}},tags:["autodocs"]},c=p=>({components:{UserMenu:a},setup(){return{args:p}},template:'<UserMenu v-bind="args"/> '}),t=c.bind({});t.args={user:{name:"David Perov",role:"Администратор",avatar:"/default-avatar.jpg"},languages:{items:["En","Ru"]},categories:[e.profile,e.theme,e.options,e.help,e.exit],texts:{[e.profile]:"My Profile",[e.options]:"Preferences"},isBlackTheme:!1,closeAfterClick:!0};var r,s,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
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
