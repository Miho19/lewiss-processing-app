export function isoUTCOffsetToNZDateTimeObject(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

export function displayDate(date: string) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return `${day}/${month}/${year}`;
}
