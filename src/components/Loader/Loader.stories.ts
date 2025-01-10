import { StoryFn, Meta } from '@storybook/vue3';
import Loader from './Loader.vue';
import Button from '../Button/Button.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const meta = {
  title: 'Loader/Loader',
  component: Loader,
  tags: ['autodocs']
} as Meta<typeof Loader>;

export default meta;

const Template: StoryFn<typeof Loader> = args => ({
  components: { Loader, Button },
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

    return { args, isPlaying, handlePlay };
  },
  template: `
    <h2>For test Loader click PLAY, and for close type ESC</h2>
    <Button @click="handlePlay">View Loader</Button>
    <Loader v-if="isPlaying" :title="args.title" />
  `
});

export const Default = Template.bind({});
