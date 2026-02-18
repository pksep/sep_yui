import{_ as n}from"./Scrollbar-DPtlQ3Cr.js";import"./vue.esm-bundler-DoruS_V8.js";const i={title:"Scrollbar/Scrollbar",component:scroll,argTypes:{thrumbStyle:{control:"object",description:"Custom style for the scrollbar thumb."},railStyle:{control:"object",description:"Custom style for the scrollbar rail."}},tags:["autodocs"]},o=l=>({components:{Scrollbar:n},setup(){return{args:l}},template:`
    <Scrollbar
      style="width: 100px; height: 100px"
      :thrumbStyle="args.thrumbStyle"
      :railStyle="args.railStyle"
    >
      <div
        v-for="i of [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ]"
        :key="i"
      >
        <span>new span{{ i }}</span>
      </div>
    </Scrollbar>
  `}),r=o.bind({});r.args={thrumbStyle:{y:{background:"red"}},railStyle:{y:{background:"black"}}};var t,e,a;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`args => ({
  components: {
    Scrollbar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Scrollbar
      style="width: 100px; height: 100px"
      :thrumbStyle="args.thrumbStyle"
      :railStyle="args.railStyle"
    >
      <div
        v-for="i of [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ]"
        :key="i"
      >
        <span>new span{{ i }}</span>
      </div>
    </Scrollbar>
  \`
})`,...(a=(e=r.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};const p=["Default"];export{r as Default,p as __namedExportsOrder,i as default};
