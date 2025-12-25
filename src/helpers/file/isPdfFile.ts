import { isPdfFile as isPdfFilePath } from 'pdfjs-dist';

const isPdfFile = (path: string | File | undefined): boolean => {
  if (!path) return false;

  if (path instanceof File) {
    return path.type === 'application/pdf';
  }

  return isPdfFilePath(path);
};

export default isPdfFile;
