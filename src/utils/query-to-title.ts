export const convertQueryToTitle = (query: string) =>
  query
    .replace("-and-", " / ")
    .replace("-tickets", "")
    .replaceAll("-", " ")
    .toLowerCase();
