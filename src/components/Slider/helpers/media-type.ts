import type { SliderMediaType } from '@/components/Slider/interface/interface';
import isImage from '@/helpers/file/is-image';
import isVideo from '@/helpers/file/is-video';

export const isSliderImage = (
  path: string | null | undefined,
  mediaType?: SliderMediaType
): boolean => (mediaType ? mediaType === 'image' : isImage(path));

export const isSliderVideo = (
  path: string | null | undefined,
  mediaType?: SliderMediaType
): boolean => (mediaType ? mediaType === 'video' : isVideo(path));
