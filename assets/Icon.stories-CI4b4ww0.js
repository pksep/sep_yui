import{I as s,a as e}from"./Icon-md01hiwM.js";import{S as t}from"./storybook-BJU81olc.js";import"./vue.esm-bundler-BR4_nak_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const b={title:"Icon/Icon",component:s,argTypes:{height:{control:{type:t.number},defaultValue:24},width:{control:{type:t.number},defaultValue:24},name:{control:{type:t.select},options:e},color:{control:{type:t.color}}},tags:["autodocs"]},a=i=>({components:{Icon:s},setup(){return{args:i}},template:`
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  `});a.args={name:e.notification};const n=()=>({components:{Icon:s},setup(){return{states:[{name:e.play,label:"Включено"},{name:e.pause,label:"Остановлено"},{name:e.stop,label:"Отменено"},{name:e.circle,label:"Не настроено"}]}},template:`
    <div style="display: flex; gap: 16px; align-items: center">
      <span v-for="state in states" :key="state.name" style="display: flex; gap: 8px; align-items: center">
        <Icon :name="state.name" :width="16" :height="16" />
        {{ state.label }}
      </span>
    </div>
  `});var o,r,l;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    Icon
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  \`
})`,...(l=(r=a.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var m,c,p;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => ({
  components: {
    Icon
  },
  setup() {
    return {
      states: [{
        name: IconNameEnum.play,
        label: 'Включено'
      }, {
        name: IconNameEnum.pause,
        label: 'Остановлено'
      }, {
        name: IconNameEnum.stop,
        label: 'Отменено'
      }, {
        name: IconNameEnum.circle,
        label: 'Не настроено'
      }]
    };
  },
  template: \`
    <div style="display: flex; gap: 16px; align-items: center">
      <span v-for="state in states" :key="state.name" style="display: flex; gap: 8px; align-items: center">
        <Icon :name="state.name" :width="16" :height="16" />
        {{ state.label }}
      </span>
    </div>
  \`
})`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const I=["Default","TaskStates"];export{a as Default,n as TaskStates,I as __namedExportsOrder,b as default};
