import{T as j}from"./Tooltip-RDqBIpgt.js";import{r as H}from"./vue.esm-bundler-BHGztBRP.js";import"./change-style-properties-1EhjFsjc.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const We={title:"Tooltip/Tooltip",component:j,argTypes:{},tags:["autodocs"],args:{hint:"Tooltip tooltip Tooltip tooltip Tooltip tooltip"}},e=b=>({components:{Tooltip:j},setup(){const S=H("Hover over to get a tooltip");return{args:b,model:S}},template:`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>`}),T=e.bind({}),o=e.bind({});o.args={isShow:!0};const r=e.bind({});r.args={isShow:!0,type:"white"};const s=e.bind({});s.args={isShow:!0,type:"blue"};const i=e.bind({});i.args={isShow:!0};const a=e.bind({});a.args={isShow:!0,size:"medium"};const l=e.bind({});l.args={isShow:!0,size:"large"};const p=e.bind({});p.args={position:"bottom-right",isShow:!0};const c=e.bind({});c.args={position:"bottom-left",isShow:!0};const m=e.bind({});m.args={position:"top-center",isShow:!0};const d=e.bind({});d.args={position:"top-left",isShow:!0};const g=e.bind({});g.args={position:"top-right",isShow:!0};const u=e.bind({});u.args={position:"left-center",isShow:!0};const f=e.bind({});f.args={position:"left-top",isShow:!0};const v=e.bind({});v.args={position:"left-bottom",isShow:!0};const h=e.bind({});h.args={position:"right-center",isShow:!0};const x=e.bind({});x.args={position:"right-top",isShow:!0};const t=e.bind({});t.args={position:"right-bottom",isShow:!0};const Be=b=>({components:{Tooltip:j},setup(){const S=H("Hover over to get a tooltip"),w=H(null);return{args:b,model:S,dialogRef:w,showDialog:()=>{var n;(n=w.value)==null||n.showModal()},hideDialog:()=>{var n;(n=w.value)==null||n.close()}}},template:`
  <dialog ref="dialogRef" style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; " @click.left="hideDialog">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </dialog>
  
  <button @click="showDialog">Открыть диалог</button>
  `}),y=Be.bind({});t.args={};var D,R,L;T.parameters={...T.parameters,docs:{...(D=T.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(L=(R=T.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var B,k,C;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(C=(k=o.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var M,z,E;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(E=(z=r.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var I,W,_;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(_=(W=s.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var O,q,A;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(A=(q=i.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var F,G,J;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(J=(G=a.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,N,P;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(P=(N=l.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var Q,U,V;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(V=(U=p.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var X,Y,Z;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(Z=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,te;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(te=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ne,oe,re;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(re=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var se,ie,ae;g.parameters={...g.parameters,docs:{...(se=g.parameters)==null?void 0:se.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(ae=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var le,pe,ce;u.parameters={...u.parameters,docs:{...(le=u.parameters)==null?void 0:le.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(ce=(pe=u.parameters)==null?void 0:pe.docs)==null?void 0:ce.source}}};var me,de,ge;f.parameters={...f.parameters,docs:{...(me=f.parameters)==null?void 0:me.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(ge=(de=f.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};var ue,fe,ve;v.parameters={...v.parameters,docs:{...(ue=v.parameters)==null?void 0:ue.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(ve=(fe=v.parameters)==null?void 0:fe.docs)==null?void 0:ve.source}}};var he,xe,Te;h.parameters={...h.parameters,docs:{...(he=h.parameters)==null?void 0:he.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(Te=(xe=h.parameters)==null?void 0:xe.docs)==null?void 0:Te.source}}};var ye,be,Se;x.parameters={...x.parameters,docs:{...(ye=x.parameters)==null?void 0:ye.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(Se=(be=x.parameters)==null?void 0:be.docs)==null?void 0:Se.source}}};var we,He,je;t.parameters={...t.parameters,docs:{...(we=t.parameters)==null?void 0:we.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return {
      args,
      model
    };
  },
  template: \`
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>\`
})`,...(je=(He=t.parameters)==null?void 0:He.docs)==null?void 0:je.source}}};var De,Re,Le;y.parameters={...y.parameters,docs:{...(De=y.parameters)==null?void 0:De.docs,source:{originalSource:`args => ({
  components: {
    Tooltip
  },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    const dialogRef = ref<HTMLDialogElement | null>(null);
    const showDialog = () => {
      dialogRef.value?.showModal();
    };
    const hideDialog = () => {
      dialogRef.value?.close();
    };
    return {
      args,
      model,
      dialogRef,
      showDialog,
      hideDialog
    };
  },
  template: \`
  <dialog ref="dialogRef" style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; " @click.left="hideDialog">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </dialog>
  
  <button @click="showDialog">Открыть диалог</button>
  \`
})`,...(Le=(Re=y.parameters)==null?void 0:Re.docs)==null?void 0:Le.source}}};const _e=["Default","Black","White","Blue","Small","Medium","Large","BottomRight","BottomLeft","TopCenter","TopLeft","TopRight","LeftCenter","LeftTop","LeftBottom","RightCenter","RightTop","RightBottom","InDialog"];export{o as Black,s as Blue,c as BottomLeft,p as BottomRight,T as Default,y as InDialog,l as Large,v as LeftBottom,u as LeftCenter,f as LeftTop,a as Medium,t as RightBottom,h as RightCenter,x as RightTop,i as Small,m as TopCenter,d as TopLeft,g as TopRight,r as White,_e as __namedExportsOrder,We as default};
