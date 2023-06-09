export const convertTitleToPath = (title?: string) =>
  title
    ? `${title
        .replace("/", "-and-")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}-tickets`
    : "";
