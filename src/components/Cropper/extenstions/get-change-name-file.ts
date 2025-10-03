const getChangedNameFile = (file: File, newName: string): File => {
  return new File([file], newName, {
    type: file.type
  });
};

export default getChangedNameFile;
