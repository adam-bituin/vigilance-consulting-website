// Structural data only — order, display number, and the id that keys into
// the `services.items.<id>` namespace in messages/{locale}.json.
export const services = [
  { id: "strategy", number: "01" },
  { id: "management", number: "02" },
  { id: "data", number: "03" },
  { id: "leadership", number: "04" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

// Shape of each `services.items.<id>` entry in the message catalogs.
export type ServiceOffering = { name: string; blurb: string };
