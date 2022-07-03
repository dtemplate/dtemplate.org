export const autoConvertJSONToPaths = (json: any) => {
  const paths: string[] = [];

  if (json.path) {
    if (json.type === 'tree') {
      paths.push(json.path);
    }
  }

  if (json.children) {
    json.children.forEach((child: any) => {
      const childPaths = autoConvertJSONToPaths(child);
      paths.push(...childPaths.map((c: string) => `${json.path}/${c}`));
    });
  }

  return paths;
};
