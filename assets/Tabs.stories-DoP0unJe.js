import{T as r}from"./Tabs-D7FDQgSD.js";import{C as p}from"./Card-Bw8y8W9F.js";import"./vue.esm-bundler-DwgwRRKm.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const T={title:"Tabs/Tabs",component:r,argTypes:{},tags:["autodocs"]},m=s=>({components:{Tabs:r,Card:p},setup(){return{args:s}},template:`
  <Tabs v-bind="args">
  <template #header1>
   Tab 1
  </template>
  <template #header2>
     Tab 2
  </template>
  <template #tab1>
    <Card>
      Tab 1 test content
    </Card>
    </template>
    <template #tab2>
      <Card>
        Tab 2 test content
      </Card>
      </template>
  </Tabs>
  `}),t=m.bind({});t.args={tabCount:2};var e,a,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`args => ({
  components: {
    Tabs,
    Card
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <Tabs v-bind="args">
  <template #header1>
   Tab 1
  </template>
  <template #header2>
     Tab 2
  </template>
  <template #tab1>
    <Card>
      Tab 1 test content
    </Card>
    </template>
    <template #tab2>
      <Card>
        Tab 2 test content
      </Card>
      </template>
  </Tabs>
  \`
})`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const c=["Default"];export{t as Default,c as __namedExportsOrder,T as default};
