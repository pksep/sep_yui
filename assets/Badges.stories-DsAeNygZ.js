import{B as g,a as e}from"./Badges-CdnXFojv.js";import{S as t}from"./storybook-BJU81olc.js";import{f as O}from"./index-CGbn3E6N.js";import"./vue.esm-bundler-DwgwRRKm.js";import"./Icon-BcJ4QwMQ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const q={title:"Badges/Badges",component:g,argTypes:{text:{control:{type:t.text}},type:{control:{type:t.select},options:e,defaultValue:e.default},choosed:{control:{type:t.boolean},defaultValue:!1},leftIcon:{control:{type:t.text},description:"SVG markup for left icon",defaultValue:""},rightIcon:{control:{type:t.text},description:"SVG markup for right icon",defaultValue:""}},tags:["autodocs"],args:{onClick:O()}},d=c=>({components:{Badges:g},setup(){return{args:c}},template:`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  `}),p=c=>({components:{Badges:g},setup(){return{args:c}},template:`<Badges v-bind="args" :text="args.text || 'Все'" />`}),n=d.bind({});n.args={type:e.blue,text:"Удалено"};const r=d.bind({});r.args={type:e.green,text:"Отгружено"};const s=d.bind({});s.args={type:e.orange,text:"Заказано"};const a=d.bind({});a.args={type:e.red,text:"Просрочено"};const o=d.bind({});o.args={type:e.contrastBlue,text:"Просрочено"};var i,l,m;p.parameters={...p.parameters,docs:{...(i=p.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`<Badges v-bind="args" :text="args.text || 'Все'" />\`
})`,...(m=(l=p.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,x,B;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  \`
})`,...(B=(x=n.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var f,y,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  \`
})`,...(v=(y=r.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var b,S,w;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  \`
})`,...(w=(S=s.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var V,k,C;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  \`
})`,...(C=(k=a.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var G,h,E;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`args => ({
  components: {
    Badges
  },
  setup() {
    return {
      args
    };
  },
  template: \`
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  \`
})`,...(E=(h=o.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};const z=["Default","BlueBadges","GreenBadges","OrangeBadges","RedBadges","ContrastBlueBadges"];export{n as BlueBadges,o as ContrastBlueBadges,p as Default,r as GreenBadges,s as OrangeBadges,a as RedBadges,z as __namedExportsOrder,q as default};
