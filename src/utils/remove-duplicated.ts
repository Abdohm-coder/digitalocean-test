export const removeDuplicatedElements = (
  array: any[],
  itemFilteredBy: string
) => {
  const lookup: any = {};
  const uniqueArray = [];

  for (const item of array) {
    const property = item[itemFilteredBy]; // Replace 'id' with the property used for uniqueness

    if (!lookup[property]) {
      lookup[property] = true;
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
};
