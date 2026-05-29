import { notFound } from "next/navigation";

// Any unmatched path under a locale renders the localized, branded 404
// (src/app/[locale]/not-found.tsx) inside the locale layout — rather than
// falling through to Next's default, unstyled root 404.
export default function CatchAll() {
  notFound();
}
