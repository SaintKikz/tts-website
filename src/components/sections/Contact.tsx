"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/context/QuoteContext";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

const NEED_TYPES = ["Véhicules", "Location", "Logistique", "Citerne", "BTP", "Autre"] as const;

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  needType: string;
  vehicleModel: string;
  message: string;
};

const empty: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  needType: "",
  vehicleModel: "",
  message: "",
};

/** Map the various CTA need-types onto the form's select options. */
function mapNeedType(raw?: string) {
  if (!raw) return "";
  if (["Véhicule", "Devis", "Fiche technique", "Rappel"].includes(raw)) return "Véhicules";
  return NEED_TYPES.includes(raw as (typeof NEED_TYPES)[number]) ? raw : "Autre";
}

export function Contact() {
  const { prefill, clearPrefill } = useQuote();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Apply prefill coming from a vehicle/service CTA.
  useEffect(() => {
    if (!prefill) return;
    setForm((f) => ({
      ...f,
      needType: mapNeedType(prefill.needType) || f.needType,
      vehicleModel: prefill.vehicleModel ?? f.vehicleModel,
      message: prefill.message ?? f.message,
    }));
    setStatus("idle");
  }, [prefill]);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Veuillez indiquer votre nom.";
    if (!form.email.trim()) next.email = "Veuillez indiquer votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Format d’email invalide.";
    if (!form.needType) next.needType = "Sélectionnez un type de besoin.";
    if (!form.message.trim()) next.message = "Décrivez brièvement votre projet.";
    setErrors(next);
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    // No backend in this template: hand off to the user's mail client.
    const subject = `Demande TTS — ${form.needType}${form.vehicleModel ? ` (${form.vehicleModel})` : ""}`;
    const body = [
      `Nom: ${form.name}`,
      `Entreprise: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone || "—"}`,
      `Type de besoin: ${form.needType}`,
      form.vehicleModel ? `Modèle demandé: ${form.vehicleModel}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus("success");
    clearPrefill();
  };

  return (
    <Section id="contact" divider className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-60" />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left — pitch + contact info */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-sand/70" aria-hidden />
              Contact
            </span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tightest sm:text-4xl lg:text-5xl"
            lines={["Parlez-nous", "de votre projet."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Devis, catalogue ou partenariat : notre équipe vous répond rapidement avec une
              proposition adaptée à vos besoins.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="mt-10 space-y-5">
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Localisation" value={site.location} />
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Téléphone"
                value={site.phoneDisplay}
                href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <ContactRow
                icon={<MessageCircle className="h-5 w-5" />}
                label="WhatsApp"
                value="Discuter sur WhatsApp"
                href={whatsappLink(site.whatsappDigits, "Bonjour TTS, je souhaite un renseignement.")}
                external
              />
            </ul>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-sand" />
                  <h3 className="mt-5 font-display text-2xl font-semibold">Merci !</h3>
                  <p className="mt-3 max-w-sm text-muted">
                    Votre client mail s’est ouvert avec votre demande pré-remplie. Vous pouvez aussi
                    nous joindre directement par téléphone ou WhatsApp.
                  </p>
                  <Button className="mt-8" variant="outline" onClick={() => { setForm(empty); setStatus("idle"); }}>
                    Envoyer une autre demande
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  {/* Prefill banner */}
                  {form.vehicleModel && (
                    <div className="flex items-center gap-2 rounded-xl border border-sand/30 bg-sand/10 px-4 py-3 text-sm text-foreground">
                      <Info className="h-4 w-4 shrink-0 text-sand" />
                      Demande liée à : <span className="font-medium">{form.vehicleModel}</span>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="field-name"
                      label="Nom"
                      required
                      value={form.name}
                      onChange={(v) => update("name", v)}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Field
                      id="field-company"
                      label="Entreprise"
                      value={form.company}
                      onChange={(v) => update("company", v)}
                      autoComplete="organization"
                    />
                    <Field
                      id="field-email"
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => update("email", v)}
                      error={errors.email}
                      autoComplete="email"
                    />
                    <Field
                      id="field-phone"
                      label="Téléphone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update("phone", v)}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Need type */}
                    <div>
                      <Label htmlFor="field-needType" required>
                        Type de besoin
                      </Label>
                      <select
                        id="field-needType"
                        value={form.needType}
                        onChange={(e) => update("needType", e.target.value)}
                        className="mt-2 h-12 w-full rounded-xl border border-line bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-sand/60"
                      >
                        <option value="" disabled>
                          Sélectionnez…
                        </option>
                        {NEED_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <FieldError error={errors.needType} />
                    </div>

                    <Field
                      id="field-vehicleModel"
                      label="Modèle de véhicule (si applicable)"
                      value={form.vehicleModel}
                      onChange={(v) => update("vehicleModel", v)}
                      placeholder="Ex. Toyota Hilux"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="field-message" required>
                      Message
                    </Label>
                    <textarea
                      id="field-message"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      placeholder="Décrivez votre besoin, votre projet ou votre demande…"
                      className="mt-2 w-full resize-y rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-sand/60"
                    />
                    <FieldError error={errors.message} />
                  </div>

                  <Button type="submit" size="lg" className="w-full" icon={<Send className="h-4 w-4" />}>
                    Envoyer ma demande
                  </Button>
                  <p className="text-center text-xs text-muted">
                    En envoyant ce formulaire, vous acceptez d’être recontacté par TTS.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.02] text-sand">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
        <span className="mt-0.5 block text-sm text-foreground">{value}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <li>
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          {inner}
        </a>
      </li>
    );
  }
  return <li className="flex items-center gap-4">{inner}</li>;
}

function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/90">
      {children}
      {required && <span className="ml-0.5 text-sand">*</span>}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-energy">
      {error}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-line bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-sand/60"
      />
      <FieldError error={error} />
    </div>
  );
}
