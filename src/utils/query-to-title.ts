export const convertQueryToTitle = (query?: string | null) =>
  query
    ? query
        .replace("-and-", " / ")
        .replace("-tickets", "")
        .replaceAll("-", " ")
        .toLowerCase()
    : "";
