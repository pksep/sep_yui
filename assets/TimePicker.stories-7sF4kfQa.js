import{T as a}from"./TimePicker-h2TvhAw4.js";import{w as c,r as l}from"./vue.esm-bundler-TxFwRJWN.js";import"./Button-CQenH-hx.js";import"./sizes-9jYRAigb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputNumber-DL7fSEtT.js";import"./Icon-BL2dufL-.js";import"./Dialog-TyN9CgGi.js";import"./index-DO22U219.js";import"./index-CSUIBETK.js";const b={title:"TimePicker/TimePicker",component:a,argTypes:{},args:{},tags:["autodocs"]},p=i=>({components:{TimePicker:a},setup(){const r=l("2022-01-14T14:48:33.392Z");return c(r,s=>{console.log("Selected time:",s)}),{args:i,modelValue:r}},template:`
    <TimePicker v-bind="args" v-model="modelValue" />
  `}),e=p.bind({});var o,t,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args: ITimePickerProps) => ({
  components: {
    TimePicker
  },
  setup() {
    const modelValue = ref('2022-01-14T14:48:33.392Z');
    watch(modelValue, val => {
      console.log('Selected time:', val);
    });
    return {
      args,
      modelValue
    };
  },
  template: \`
    <TimePicker v-bind="args" v-model="modelValue" />
  \`
})`,...(m=(t=e.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};const w=["TimePickerDefault"];export{e as TimePickerDefault,w as __namedExportsOrder,b as default};
