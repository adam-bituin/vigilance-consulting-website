import { NextResponse } from "next/server";
import type { LeadPayload } from "@/content/leadForm";

const isValidEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

function validate(body: unknown): LeadPayload | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid payload." };
  const b = body as Record<string, unknown>;

  if (!isStringArray(b.services) || b.services.length === 0)
    return { error: "Select at least one area of interest." };
  if (typeof b.companySize !== "string" || b.companySize.length === 0)
    return { error: "Organization size is required." };
  if (typeof b.role !== "string" || b.role.length === 0)
    return { error: "Role is required." };
  if (typeof b.name !== "string" || b.name.trim().length < 2)
    return { error: "Name is required." };
  if (!isValidEmail(b.email)) return { error: "A valid email is required." };

  return {
    services: b.services,
    companySize: b.companySize,
    role: b.role,
    name: b.name.trim(),
    email: b.email.trim(),
    phone: typeof b.phone === "string" ? b.phone.trim() : undefined,
    message: typeof b.message === "string" ? b.message.trim() : undefined,
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // TODO: wire to email provider (Resend recommended). For now log + 200.
  console.log("[lead]", {
    at: new Date().toISOString(),
    ...result,
  });

  return NextResponse.json({ ok: true });
}
