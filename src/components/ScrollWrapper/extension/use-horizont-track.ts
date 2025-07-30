import changeStyleProperties from '@/helpers/change-style-properties';
import { computed, ref, Ref } from 'vue';

const useHorizontalTrack = (
  slotRef: Ref<HTMLElement | null>,
  scrollWrapperRef: Ref<HTMLElement | null>,
  barRef: Ref<HTMLElement | null>,
  trackRef: Ref<HTMLElement | null>
) => {
  const isDragging = ref<boolean>(false);
  const scrollHorizontalWidthPercent = ref<number>(100);

  let startX = 0;
  let startScrollLeft = 0;

  const horizontalTrackClass = computed(() => [
    {
      'scroll-wrapper__track_hide': scrollHorizontalWidthPercent.value === 100,
      'scroll-wrapper__track_drag': isDragging.value
    }
  ]);

  const isExistHorizontalTrack = computed(
    () => scrollHorizontalWidthPercent.value < 100
  );

  const getPercentHorizontalView = (): number => {
    if (slotRef.value) {
      const clientWidth: number = slotRef.value.clientWidth;
      const scrollWidth: number = slotRef.value.scrollWidth;

      if (clientWidth >= scrollWidth) return 100;

      return (clientWidth / scrollWidth) * 100;
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

    const { scrollLeft, scrollWidth, clientWidth } = slotRef.value;

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const scrollPercent = scrollLeft / maxScroll;
    const trackWidth = trackRef.value.clientWidth;
    const barWidth = barRef.value.clientWidth;
    const maxBarPosition = trackWidth - barWidth;

    const barLeft = scrollPercent * maxBarPosition;

    requestAnimationFrame(() => {
      if (scrollWrapperRef.value) {
        changeStyleProperties(
          { '--scroll-bar-left-position': `${barLeft}px` },
          scrollWrapperRef.value
        );
      }
    });
  };

  const startDrag = (event: MouseEvent) => {
    if (!slotRef.value || !scrollWrapperRef.value) return;

    isDragging.value = true;
    startX = event.clientX;
    startScrollLeft = slotRef.value.scrollLeft;

    document.addEventListener('pointermove', onDrag);
    document.addEventListener('pointerup', stopDrag, true);
  };

  const onDrag = (event: MouseEvent) => {
    if (isDragging.value && slotRef.value && barRef.value) {
      const deltaX = event.clientX - startX;
      const scrollRatio =
        (slotRef.value.scrollWidth - slotRef.value.clientWidth) /
        (slotRef.value.clientWidth - barRef.value.clientWidth);

      slotRef.value.scrollLeft = startScrollLeft + deltaX * scrollRatio;
      changeBarPosition();
    }
  };

  const stopDrag = () => {
    console.log('stopDrag');

    isDragging.value = false;
    document.removeEventListener('pointermove', onDrag);
    document.removeEventListener('pointerup', stopDrag, true);
  };

  const onTrackClick = (event: MouseEvent) => {
    if (slotRef.value && barRef.value) {
      const trackRect = (
        event.currentTarget as HTMLElement
      ).getBoundingClientRect();
      const clickPosition = event.clientX - trackRect.left;

      const barWidth = barRef.value.clientWidth;
      const trackWidth = trackRect.width;

      let newScrollLeft =
        (clickPosition - barWidth / 2) *
        ((slotRef.value.scrollWidth - slotRef.value.clientWidth) /
          (trackWidth - barWidth));

      newScrollLeft = Math.max(
        0,
        Math.min(
          newScrollLeft,
          slotRef.value.scrollWidth - slotRef.value.clientWidth
        )
      );

      slotRef.value.scrollLeft = newScrollLeft;
      changeBarPosition();
    }
  };

  const setHorizontalBarWidth = () => {
    if (!slotRef.value || !scrollWrapperRef.value) return;

    const widthBar = getPercentHorizontalView();
    scrollHorizontalWidthPercent.value = widthBar;

    changeStyleProperties(
      {
        '--scroll-horizontal-bar-width': `${widthBar}%`
      },
      scrollWrapperRef.value
    );
  };

  return {
    onDrag,
    onTrackClick,
    startDrag,
    getPercentHorizontalView,
    changeBarPosition,
    isDragging,
    scrollHorizontalWidthPercent,
    setHorizontalBarWidth,
    horizontalTrackClass,
    isExistHorizontalTrack
  };
};

export default useHorizontalTrack;
