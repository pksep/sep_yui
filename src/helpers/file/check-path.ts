const checkPath = (str: string | null): string | null => {
  if (!str) return null;
  const path = str.split('?')[0];
  const regexExtension = /\.\w+$/;
  const match = path.match(regexExtension);

  const extension = match ? match[0].replace('.', '') : null;

  return extension;
};

export default checkPath;
