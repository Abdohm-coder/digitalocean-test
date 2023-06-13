export const convertTitleToPath = (title?: string) =>
  title
    ? `${title
        .replaceAll("-", "_")
        .replaceAll("/", "-and-")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}-tickets`
    : "";
