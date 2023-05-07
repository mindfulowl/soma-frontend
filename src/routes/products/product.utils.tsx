export const removeNullProperties = (obj: { [x: string]: Array<string> }) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (!value || (value && value.length === 0)) {
      delete obj[key];
    }
  });
  return obj;
};
