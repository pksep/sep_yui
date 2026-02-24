import{L as d}from"./Loader-DD_BuzTp.js";import{B as c}from"./Button-CFVSt36p.js";import{r as u,o as y,a as m}from"./vue.esm-bundler-B9HtKiky.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./sizes-9jYRAigb.js";const g={title:"Loader/Loader",component:d,tags:["autodocs"]},p=l=>({components:{Loader:d,Button:c},setup(){const t=u(!1),i=()=>{t.value=!0},o=n=>{(n.key==="Escape"||n.key==="Esc")&&(t.value=!1)};return y(()=>{window.addEventListener("keydown",o)}),m(()=>{window.removeEventListener("keydown",o)}),{args:l,isPlaying:t,handlePlay:i}},template:`
    <h2>For test Loader click PLAY, and for close type ESC</h2>
    <Button @click="handlePlay">View Loader</Button>
    <Loader v-if="isPlaying" :title="args.title" />
  `}),e=p.bind({});var a,s,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    Loader,
    Button
  },
  setup() {
    const isPlaying = ref(false);
    const handlePlay = () => {
      isPlaying.value = true;
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        isPlaying.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener('keydown', handleKeydown);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
    return {
      args,
      isPlaying,
      handlePlay
    };
  },
  template: \`
    <h2>For test Loader click PLAY, and for close type ESC</h2>
    <Button @click="handlePlay">View Loader</Button>
    <Loader v-if="isPlaying" :title="args.title" />
  \`
})`,...(r=(s=e.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const h=["Default"];export{e as Default,h as __namedExportsOrder,g as default};
