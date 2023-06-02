export const convertPathnameToTitle = (pathname: string) =>
  pathname.replaceAll(/\//g, " ").replaceAll("-", " ").replace("-tickets", "").toLowerCase();
