// switch this to as const and use custom guard type later 12/06/2026
const validPelmetSize = [110, 160];

export function getKineticsRollerPelmetString(
  pelmet: string | undefined | null,
) {
  if (pelmet == null) return "";
  if (typeof pelmet === "undefined") return "";
  if (pelmet.trim().length === 0) return "";

  const [size, fit] = splitPelmetString(pelmet);

  const pelmetSize = buildSizeString(size);
  if (typeof pelmetSize === "undefined") return "";

  const pelmetFit = buildFitString(fit);
  if (typeof pelmetFit === "undefined") return "";

  return `${pelmetSize} - ${pelmetFit}`;
}

// current delim is space
function splitPelmetString(pelmet: string) {
  return pelmet.trim().split(" ");
}

function buildSizeString(pelmetSize: string): string | undefined {
  try {
    const currentSize = parseInt(pelmetSize);
    if (!validPelmetSize.includes(currentSize)) return undefined;
    return `${currentSize}mm`;
  } catch {
    return undefined;
  }
}

function buildFitString(pelmetFit: string) {
  let pelmetFitAdjusted = pelmetFit.trim().toLowerCase();

  switch (pelmetFitAdjusted) {
    case "i/s":
      return "Inside";
    case "o/s":
      return "Outside";
    default:
      return undefined;
  }
}
