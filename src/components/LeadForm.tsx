"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { leadForm, type LeadPayload } from "@/content/leadForm";
import { services } from "@/content/services";

type Status = "idle" | "submitting" | "submitted" | "error";

const initial: LeadPayload = {
  services: [],
  companySize: "",
  role: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function LeadForm() {
  const t = useTranslations("leadForm");
  const tServices = useTranslations("services");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LeadPayload>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(id)
        ? d.services.filter((x) => x !== id)
        : [...d.services, id],
    }));
  };

  const canAdvance = () => {
    if (step === 0) return data.services.length > 0;
    if (step === 1) return data.companySize !== "" && data.role !== "";
    if (step === 2) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      return data.name.trim().length > 1 && emailOk;
    }
    return false;
  };

  const advance = () => setStep((s) => Math.min(s + 1, leadForm.steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? t("genericError"));
      }
      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("genericError"));
    }
  };

  if (status === "submitted") {
    return (
      <div className="rounded-lg border border-line bg-paper p-10 md:p-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs uppercase tracking-widest text-brand">
          {t("received")}
        </div>
        <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tightest md:text-4xl">
          {t("thankYouHeading")}
        </h2>
        <p className="mt-4 max-w-xl text-base text-ink/70">
          {t("thankYouBody", { email: data.email })}
        </p>
      </div>
    );
  }

  const stepKey = leadForm.steps[step];

  return (
    <div className="rounded-lg border border-line bg-paper p-6 md:p-10">
      <ol className="flex items-center gap-2 text-xs">
        {leadForm.steps.map((key, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li
              key={key}
              className={`flex items-center gap-2 ${i > 0 ? "ps-2" : ""}`}
            >
              {i > 0 && <span className="h-px w-6 bg-line" aria-hidden />}
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium transition-colors ${
                  active
                    ? "border-brand bg-brand text-paper"
                    : done
                    ? "border-brand/30 bg-brand-soft text-brand"
                    : "border-line bg-paper text-subtle"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden sm:inline ${
                  active ? "text-ink" : "text-subtle"
                }`}
              >
                {t(`steps.${key}.label`)}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        <h2 className="font-serif text-2xl leading-tight tracking-tightest md:text-3xl">
          {t(`steps.${stepKey}.heading`)}
        </h2>
        <p className="mt-2 text-sm text-ink/65 md:text-base">
          {t(`steps.${stepKey}.sub`)}
        </p>
      </div>

      <div className="mt-8">
        {step === 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => {
              const selected = data.services.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  aria-pressed={selected}
                  className={`group relative rounded-md border p-4 text-start transition-colors ${
                    selected
                      ? "border-brand bg-brand-soft"
                      : "border-line bg-paper hover:border-ink/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      {tServices(`items.${s.id}.title`)}
                    </span>
                    <span
                      aria-hidden
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                        selected
                          ? "border-brand bg-brand text-paper"
                          : "border-line text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink/65">
                    {tServices(`items.${s.id}.summary`)}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t("fields.orgSize")}>
              <select
                value={data.companySize}
                onChange={(e) =>
                  setData((d) => ({ ...d, companySize: e.target.value }))
                }
                className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {leadForm.companySizeOptions.map((id) => (
                  <option key={id} value={id}>
                    {t(`companySize.${id}`)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("fields.role")}>
              <select
                value={data.role}
                onChange={(e) =>
                  setData((d) => ({ ...d, role: e.target.value }))
                }
                className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {leadForm.roleOptions.map((id) => (
                  <option key={id} value={id}>
                    {t(`role.${id}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("fields.name")} required>
                <input
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) =>
                    setData((d) => ({ ...d, name: e.target.value }))
                  }
                  className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
                />
              </Field>
              <Field label={t("fields.email")} required>
                <input
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  value={data.email}
                  onChange={(e) =>
                    setData((d) => ({ ...d, email: e.target.value }))
                  }
                  className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
                />
              </Field>
            </div>
            <Field label={t("fields.phone")}>
              <input
                type="tel"
                autoComplete="tel"
                dir="ltr"
                value={data.phone}
                onChange={(e) =>
                  setData((d) => ({ ...d, phone: e.target.value }))
                }
                className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
              />
            </Field>
            <Field label={t("fields.result")}>
              <textarea
                rows={4}
                value={data.message}
                onChange={(e) =>
                  setData((d) => ({ ...d, message: e.target.value }))
                }
                className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base text-ink outline-none focus:border-ink"
              />
            </Field>
          </div>
        )}
      </div>

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-brand/40 bg-brand-soft px-4 py-3 text-sm text-brand"
        >
          {errorMsg}
        </p>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden className="rtl:-scale-x-100">
            ←
          </span>
          {t("back")}
        </button>

        {step < leadForm.steps.length - 1 ? (
          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-30"
          >
            {t("continue")}
            <span aria-hidden className="rtl:-scale-x-100">
              →
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canAdvance() || status === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-30"
          >
            {status === "submitting" ? t("sending") : t("send")}
            <span aria-hidden className="rtl:-scale-x-100">
              →
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-ink/60">
        {label}
        {required && <span className="ms-1 text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}
