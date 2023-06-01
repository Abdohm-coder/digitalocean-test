export const convertPathnameToTitle = (pathname: string) =>
  pathname.replace("/", "").replace("-tickets", "").toLowerCase();
