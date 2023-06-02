export const convertPathnameToTitle = (pathname: string) =>
  pathname
    .replaceAll(/\//g, " ")
    .replace("-tickets", "")
    .replaceAll("-", " ")
    .toLowerCase();
