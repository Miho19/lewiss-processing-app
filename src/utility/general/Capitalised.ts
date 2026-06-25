export function capitalisedString(str: string): string {
  if (typeof str === "undefined") return "";
  if (str === null) return "";
  const strTrimmed = str.trim();
  if (strTrimmed.length === 0) return "";

  const strArray = strTrimmed.split(" ");
  if (strArray.length === 0) return "";

  const wordsCapitalised = strArray.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return wordsCapitalised.join(" ");
}
