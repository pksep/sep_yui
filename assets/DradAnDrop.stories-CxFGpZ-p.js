import{D as o}from"./DragAndDrop-B_i0Muyd.js";import{f as s}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-BHGztBRP.js";import"./Icon-BPMvW5pS.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l={title:"DragAndDrop/DragAndDrop",component:o,tags:["autodocs"],parameters:{backgrounds:{default:"Gray"}},args:{fileDropped:s()}},d=p=>({components:{DragAndDrop:o},setup(){return{args:p}},template:`
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" @fileDropped="args.fileDropped" />
      </div>
    `}),r=d.bind({});var e,t,a;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`args => ({
  components: {
    DragAndDrop
  },
  setup() {
    return {
      args
    };
  },
  template: \`
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" @fileDropped="args.fileDropped" />
      </div>
    \`
})`,...(a=(t=r.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const c=["Default"];export{r as Default,c as __namedExportsOrder,l as default};
