import changeStyleProperties from '@/helpers/change-style-properties';
import { computed, ref, Ref } from 'vue';

const useVerticlTrack = (
  slotRef: Ref<HTMLElement | null>,
  scrollWrapperRef: Ref<HTMLElement | null>,
  barRef: Ref<HTMLElement | null>,
  trackRef: Ref<HTMLElement | null>
) => {
  const isDragging = ref<boolean>(false);
  const scrollVerticalHeightProcent = ref<number>(100);

  let startY = 0;
  let startScrollTop = 0;

  const verticalTrackClass = computed(() => [
    {
      'scroll-wrapper__track_hide': scrollVerticalHeightProcent.value === 100,
      'scroll-wrapper__track_drag': isDragging.value
    }
  ]);

  const isExistVerticalTrack = computed(
    () => scrollVerticalHeightProcent.value < 100
  );

  const getProcentVerticalView = (): number => {
    if (slotRef.value) {
      const clientHeight: number = slotRef.value.clientHeight;
      const scrollHeight: number = slotRef.value.scrollHeight;

      if (clientHeight >= scrollHeight) return 100;

      if (clientHeight < scrollHeight) {
        return (clientHeight / scrollHeight) * 100;
      }
    }
    return 100;
  };

  const changeBarPosition = (): void => {
    if (
      !slotRef.value ||
      !scrollWrapperRef.value ||
      !barRef.value ||
      !trackRef.value
    )
      return;
    const { scrollTop, scrollHeight, clientHeight } = slotRef.value;

    // Доступная область прокрутки
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    // Процент прокрутки
    const scrollPercent = scrollTop / maxScroll;

    // Доступное пространство для бара
    const trackHeight = trackRef.value.clientHeight;
    const barHeight = barRef.value.clientHeight;
    const maxBarPosition = trackHeight - barHeight;

    // Рассчитываем позицию бара
    const barTop = scrollPercent * maxBarPosition;

    requestAnimationFrame(() => {
      if (scrollWrapperRef.value) {
        changeStyleProperties(
          { '--scroll-bar-top-postion': `${barTop}px` },
          scrollWrapperRef.value
        );
      }
    });
  };

  // Начало перетаскивания
  const startDrag = (event: MouseEvent) => {
    if (!slotRef.value || !scrollWrapperRef.value) return;

    isDragging.value = true;
    startY = event.clientY;
    startScrollTop = slotRef.value.scrollTop;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  // Обработка движения мыши
  const onDrag = (event: MouseEvent) => {
    if (isDragging.value && slotRef.value && barRef.value) {
      const deltaY = event.clientY - startY;
      const scrollRatio =
        (slotRef.value.scrollHeight - slotRef.value.clientHeight) /
        (slotRef.value.clientHeight - barRef.value.clientHeight);

      slotRef.value.scrollTop = startScrollTop + deltaY * scrollRatio;
      changeBarPosition();
    }
  };

  // Остановка перетаскивания
  const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  };

  const onTrackClick = (event: MouseEvent) => {
    if (slotRef.value && barRef.value) {
      const trackRect = (
        event.currentTarget as HTMLElement
      ).getBoundingClientRect();
      const clickPosition = event.clientY - trackRect.top;

      const barHeight = barRef.value.clientHeight;
      const trackHeight = trackRect.height;

      let newScrollTop =
        (clickPosition - barHeight / 2) *
        ((slotRef.value.scrollHeight - slotRef.value.clientHeight) /
          (trackHeight - barHeight));

      newScrollTop = Math.max(
        0,
        Math.min(
          newScrollTop,
          slotRef.value.scrollHeight - slotRef.value.clientHeight
        )
      );

      slotRef.value.scrollTop = newScrollTop;
      changeBarPosition();
    }
  };

  const setVerticalBarHeight = () => {
    if (!slotRef.value || !scrollWrapperRef.value) return;

    const heightBar = getProcentVerticalView();
    scrollVerticalHeightProcent.value = heightBar;

    changeStyleProperties(
      {
        '--scroll-vertical-bar-height': `${heightBar}%`
      },
      scrollWrapperRef.value
    );
  };

  return {
    onDrag,
    onTrackClick,
    startDrag,
    getProcentVerticalView,
    changeBarPosition,
    isDragging,
    scrollVerticalHeightProcent,
    setVerticalBarHeight,
    verticalTrackClass,
    isExistVerticalTrack
  };
};

export default useVerticlTrack;
