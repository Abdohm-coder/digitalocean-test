export const capitalizeString = (str?: string | null) =>
  str
    ? str.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
      })
    : "";
