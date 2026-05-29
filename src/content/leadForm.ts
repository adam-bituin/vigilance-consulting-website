// Structural data only. Step keys map to `leadForm.steps.<key>` and option
// ids map to `leadForm.companySize.<id>` / `leadForm.role.<id>` in messages.
// The ids (not the localized labels) are what gets submitted, so lead data
// stays consistent regardless of the visitor's language.
export const leadForm = {
  steps: ["interest", "context", "you"] as const,

  companySizeOptions: [
    "individual",
    "1-10",
    "11-50",
    "51-250",
    "251-1000",
    "1000plus",
  ] as const,

  roleOptions: ["csuite", "vp", "manager", "ic", "hrld", "other"] as const,
} as const;

export type LeadPayload = {
  services: string[];
  companySize: string;
  role: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};
