import tree from 'tree-node-cli';

export const consoleFolderStructure = (folderPath: string) => {
  const string = tree(folderPath, {
    dirsFirst: true,
    trailingSlash: true
  });
  console.log(string);
};
