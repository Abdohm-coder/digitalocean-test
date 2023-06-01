export const convertTitleToPath = (title: string) =>
  title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
