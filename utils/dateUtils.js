export function monthParser(month) {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];
  return months[month - 1];
}

export function formatDateToPeruTime(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("es-PE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatHourToPeruTime(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleTimeString("es-PE", {
    timeZone: "America/Lima",
    hour: "2-digit",
    minute: "2-digit",
  });
}
