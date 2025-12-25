import { ImageExtensionsEnum } from '@/components';
import checkPath from '@/helpers/file/check-path';

/**
 * @param path:  string | null
 * @returns
 */
const isImage = (path: string | null | undefined): boolean => {
  if (!path) return false;

  // data:image/*
  if (path.startsWith('data:image/')) {
    return true;
  }

  const extension = checkPath(path) as ImageExtensionsEnum;

  return extension
    ? Object.values(ImageExtensionsEnum).includes(
        extension.toLowerCase() as ImageExtensionsEnum
      )
    : false;
};

export default isImage;
