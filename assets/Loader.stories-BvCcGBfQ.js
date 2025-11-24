import{j as m,k as r,l,A as o,m as y,p as f,r as L,q as h,s as v}from"./vue.esm-bundler-CiAvViym.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{B as w}from"./Button-BbOhAf0E.js";import"./sizes-9jYRAigb.js";const k=["data-testid"],P=["data-testid"],E=["data-testid"],B=["data-testid"],T=["data-testid"],p=m({__name:"Loader",props:{title:{default:"Загрузка..."},dataTestid:{default:"Loader"}},setup(a){const e=a;return(d,s)=>(r(),l("div",{class:"loader","data-testid":e.dataTestid},[o("div",{class:"loader__area","data-testid":`${e.dataTestid}-Area`},[o("div",{class:"loader__circle loader__circle--light-blue","data-testid":`${e.dataTestid}-Loader-LightBlue1`},null,8,E),o("div",{class:"loader__circle loader__circle--blue","data-testid":`${e.dataTestid}-Loader-LightBlue2`},null,8,B)],8,P),e.title?(r(),l("span",{key:0,class:"loader__span","data-testid":`${e.dataTestid}-Loader-Title`},y(e.title),9,T)):f("",!0)],8,k))}}),_=g(p,[["__scopeId","data-v-12d4e463"]]);p.__docgenInfo={exportName:"default",displayName:"Loader",description:"",tags:{},props:[{name:"dataTestid",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Loader'"}},{name:"title",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"'Загрузка...'"}}],sourceFiles:["/home/runner/work/sep_yui/sep_yui/src/components/Loader/Loader.vue"]};const C={title:"Loader/Loader",component:_,tags:["autodocs"]},V=a=>({components:{Loader:_,Button:w},setup(){const e=L(!1),d=()=>{e.value=!0},s=n=>{(n.key==="Escape"||n.key==="Esc")&&(e.value=!1)};return h(()=>{window.addEventListener("keydown",s)}),v(()=>{window.removeEventListener("keydown",s)}),{args:a,isPlaying:e,handlePlay:d}},template:`
    <h2>For test Loader click PLAY, and for close type ESC</h2>
    <Button @click="handlePlay">View Loader</Button>
    <Loader v-if="isPlaying" :title="args.title" />
  `}),t=V.bind({});var i,c,u;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
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
})`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const N=["Default"];export{t as Default,N as __namedExportsOrder,C as default};
