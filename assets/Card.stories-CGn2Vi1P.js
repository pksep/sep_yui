import{S as u}from"./storybook-BJU81olc.js";import{C as n}from"./Card-rssrSirP.js";import"./vue.esm-bundler-DivmSgrp.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const S={title:"Card/Card",component:n,argTypes:{pressed:{control:{type:u.boolean},defaultValue:!1}},tags:["autodocs"]},r=f=>({components:{Card:n},setup(){return{args:f}},template:`
        <Card v-bind="args" @click="args.pressed = !args.pressed" :class="{ pressed: args.pressed}" :style="{width: '162px', height: '140px'}">
            <template v-if="args['left']" #left> {{args["left"]}} </template>

            <template #default> Simple text </template>
        </Card>
  `}),e=r.bind({});e.args={};const s=r.bind({});s.args={pressed:!0};const t=r.bind({});t.args={left:"1."};var a,p,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    Card
  },
  setup() {
    return {
      args
    };
  },
  template: \`
        <Card v-bind="args" @click="args.pressed = !args.pressed" :class="{ pressed: args.pressed}" :style="{width: '162px', height: '140px'}">
            <template v-if="args['left']" #left> {{args["left"]}} </template>

            <template #default> Simple text </template>
        </Card>
  \`
})`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,o,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Card
  },
  setup() {
    return {
      args
    };
  },
  template: \`
        <Card v-bind="args" @click="args.pressed = !args.pressed" :class="{ pressed: args.pressed}" :style="{width: '162px', height: '140px'}">
            <template v-if="args['left']" #left> {{args["left"]}} </template>

            <template #default> Simple text </template>
        </Card>
  \`
})`,...(m=(o=s.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var c,g,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    Card
  },
  setup() {
    return {
      args
    };
  },
  template: \`
        <Card v-bind="args" @click="args.pressed = !args.pressed" :class="{ pressed: args.pressed}" :style="{width: '162px', height: '140px'}">
            <template v-if="args['left']" #left> {{args["left"]}} </template>

            <template #default> Simple text </template>
        </Card>
  \`
})`,...(i=(g=t.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};const v=["Default","Pressed","WithLeft"];export{e as Default,s as Pressed,t as WithLeft,v as __namedExportsOrder,S as default};
