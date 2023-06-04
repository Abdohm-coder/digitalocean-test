export const sortArray = (array: any[], sortedBy: any) =>
  array.sort((a, b) => b[sortedBy] - a[sortedBy]);
