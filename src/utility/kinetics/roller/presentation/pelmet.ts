export function getKineticsRollerPelmetString(
  pelmet: string | undefined | null,
) {
  if (pelmet == null) return "";
  if (typeof pelmet === "undefined") return "";
  if (pelmet.trim().length === 0) return "";

  const [size, fit] = splitPelmetString(pelmet);

  const pelmetSize = buildSizeString(size);
  const pelmetFit = buildFitString(fit);

  return `${pelmetSize} - ${pelmetFit}`;
}

// current delim is space
function splitPelmetString(pelmet: string) {
  return pelmet.trim().split(" ");
}

function buildSizeString(pelmetSize: string) {}

function buildFitString(pelmetFit: string) {}
