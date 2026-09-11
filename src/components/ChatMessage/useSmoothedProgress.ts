import { onScopeDispose, ref, watch, type Ref, type WatchSource } from 'vue';

const MIN_DURATION_MS = 300;
const MAX_DURATION_MS = 700;

const normalizeProgress = (value: number | null | undefined): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  return Math.max(0, Math.min(100, value));
};

export const useSmoothedProgress = (
  progress: WatchSource<number | null | undefined>
): Readonly<Ref<number | null>> => {
  const displayedProgress = ref<number | null>(null);
  let animationFrameId: number | null = null;

  const cancelAnimation = (): void => {
    if (animationFrameId === null) return;

    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  };

  watch(
    progress,
    value => {
      const target = normalizeProgress(value);

      if (target === null) {
        cancelAnimation();
        displayedProgress.value = null;
        return;
      }

      const initial = displayedProgress.value;

      if (initial === null || target <= initial) {
        cancelAnimation();
        displayedProgress.value = target;
        return;
      }

      cancelAnimation();

      const startedAt = performance.now();
      const distance = target - initial;
      const duration = Math.min(
        MAX_DURATION_MS,
        Math.max(MIN_DURATION_MS, MIN_DURATION_MS + distance * 8)
      );

      const animate = (now: number): void => {
        const elapsedRatio = Math.min(1, (now - startedAt) / duration);
        const easedRatio = 1 - (1 - elapsedRatio) ** 3;

        displayedProgress.value = Math.min(
          target,
          initial + distance * easedRatio
        );

        if (elapsedRatio < 1) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }

        animationFrameId = null;
      };

      animationFrameId = requestAnimationFrame(animate);
    },
    { immediate: true }
  );

  onScopeDispose(cancelAnimation);

  return displayedProgress;
};
