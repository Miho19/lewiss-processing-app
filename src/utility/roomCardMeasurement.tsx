export function getWindowBlindCountString(blindCount: string | number): string {
  if (
    typeof blindCount === "string" &&
    (blindCount as string).localeCompare("dual", undefined, {
      sensitivity: "base",
    }) === 0
  ) {
    return "Dual";
  }

  if (blindCount === 1) return "Single";

  if (blindCount === 2) return "Butting";

  return "Invalid blind count";
}
