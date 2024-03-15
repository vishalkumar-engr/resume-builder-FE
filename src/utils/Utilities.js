export const containsObject = (list, obj) => {
  list.forEach((element) => {
    if (element.key === obj.key) {
      return true;
    }
  });
  return false;
};
