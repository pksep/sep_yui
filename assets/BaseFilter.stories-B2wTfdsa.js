import{B as a}from"./BaseFilter-CZf4fjLT.js";import{r as F}from"./vue.esm-bundler-DoruS_V8.js";import"./Badges-Dv6gES1p.js";import"./Icon-DSmn-dBw.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Search-BjYzNQyw.js";import"./Button-B6M794qY.js";import"./sizes-9jYRAigb.js";import"./SelectList--fUsn_Tl.js";import"./index-CLdhIAn3.js";import"./change-style-properties-1EhjFsjc.js";import"./Tooltip-wcE3_NN3.js";import"./lodash-DHyxJ22h.js";import"./_commonjsHelpers-Cpj98o6Y.js";const f=[{key:"1",value:"Прямая"},{key:"2",value:"Косвенная"},{key:"3",value:"Очень ответственная "}],S=[{key:"1",value:"Петров Д.А",hint:"Петров Давид Алексеевич"},{key:"2",value:"Евгений Н.Н",hint:"Евгений Невский Николаевич"},{key:"3",value:"Ольга С.А",hint:"Ольга Сергеевна Александровна"},{key:"4",value:"Ольга Сергеевна Александровна",hint:"Ольга Сергеевна Александровна"}],z={title:"Select/BaseFilter",component:a,tags:["autodocs"],args:{title:"Операция",options:f}},k=s=>({components:{BaseFilter:a},setup(){const o=F(null);return{args:s,model:o}},template:`
    <BaseFilter v-model="model" v-bind="args" />
  `}),y=s=>({components:{BaseFilter:a},setup(){const o=F([]);return{args:s,model:o}},template:`
    <BaseFilter v-model="model" v-bind="args" />
  `}),n=k.bind({}),e=k.bind({});e.args={options:S,isSearch:!0,isPosibleToClear:!0};const t=y.bind({});t.args={options:f,isSearch:!0,isPosibleToClear:!0};const r=y.bind({});r.args={options:S,isSearch:!1,isPosibleToClear:!0,isShoMiniOptions:!0};var i,l,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref(null);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,c,u;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref(null);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var d,g,v;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref([]);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(v=(g=t.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var b,h,B;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    BaseFilter
  },
  setup() {
    const model = ref([]);
    return {
      args,
      model
    };
  },
  template: \`
    <BaseFilter v-model="model" v-bind="args" />
  \`
})`,...(B=(h=r.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};const A=["Default","WithHints","Multiple","MultipleWithHints"];export{n as Default,t as Multiple,r as MultipleWithHints,e as WithHints,A as __namedExportsOrder,z as default};
