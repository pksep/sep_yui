import { VideoExtensionsEnum } from '@/components';
import checkPath from '@/helpers/file/check-path';

/**
 * @param path:  string | null
 * @returns
 */
const isVideo = (path: string | null | undefined): boolean => {
  if (!path) return false;
  const extension = checkPath(path) as VideoExtensionsEnum;
  return extension
    ? Object.values(VideoExtensionsEnum).includes(extension)
    : false;
};

export default isVideo;
