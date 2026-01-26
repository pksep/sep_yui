import{T as a}from"./TimePicker-D_VCvAvQ.js";import{r as c,w as l}from"./vue.esm-bundler-BHGztBRP.js";import"./Button-xRmCTYUs.js";import"./sizes-9jYRAigb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputNumber-BvBAYQJZ.js";import"./Icon-BPMvW5pS.js";import"./Dialog-B83ae4P1.js";import"./index-BXt-ztV4.js";const V={title:"TimePicker/TimePicker",component:a,argTypes:{},args:{},tags:["autodocs"]},p=i=>({components:{TimePicker:a},setup(){const r=c("2022-01-14T14:48:33.392Z");return l(r,s=>{console.log("Selected time:",s)}),{args:i,modelValue:r}},template:`
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
})`,...(m=(t=e.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};const b=["TimePickerDefault"];export{e as TimePickerDefault,b as __namedExportsOrder,V as default};
