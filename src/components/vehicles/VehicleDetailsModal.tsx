"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, FileText, PhoneCall, MessageCircle, FileDown, Check } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { Vehicle360Viewer } from "./Vehicle360Viewer";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/context/QuoteContext";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

type Props = {
  vehicle: Vehicle | null;
  onClose: () => void;
};

export function VehicleDetailsModal({ vehicle, onClose }: Props) {
  const reduce = useReducedMotion();
  const { requestQuote } = useQuote();

  // Escape to close + lock scroll while open.
  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [vehicle, onClose]);

  const handleQuote = (needType: string, extra?: string) => {
    if (!vehicle) return;
    requestQuote({
      needType,
      vehicleModel: vehicle.name,
      message: extra,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {vehicle && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-modal="true"
          role="dialog"
          aria-label={`Fiche véhicule : ${vehicle.name}`}
        >
          {/* Scrim */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 my-0 w-full max-w-6xl rounded-none border border-line bg-surface shadow-glow sm:my-6 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-surface/90 px-6 py-4 backdrop-blur-xl sm:rounded-t-3xl">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-sand">{vehicle.category}</p>
                <h2 className="truncate font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {vehicle.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-sand/60 hover:text-sand"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
              {/* Left: visuals */}
              <div className="space-y-4">
                <Vehicle360Viewer vehicle={vehicle} />
                <div className="grid grid-cols-3 gap-3">
                  {vehicle.gallery.slice(0, 3).map((src, i) => (
                    <PlaceholderImage
                      key={i}
                      src={src}
                      alt={`${vehicle.name} — photo ${i + 1}`}
                      caption=""
                      aspect="aspect-[4/3]"
                    />
                  ))}
                </div>
              </div>

              {/* Right: details */}
              <div>
                <p className="text-base leading-relaxed text-muted">{vehicle.description}</p>

                {/* Recommended for */}
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
                    Usages recommandés
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {vehicle.recommendedFor.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/80"
                      >
                        <Check className="h-3 w-3 text-sand" />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs */}
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
                    Caractéristiques (indicatives)
                  </h3>
                  <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                    {vehicle.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between gap-3 bg-surface px-4 py-3">
                        <dt className="text-xs text-muted">{spec.label}</dt>
                        <dd className="text-right text-sm font-medium text-foreground">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Colors / options */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
                      Couleurs
                    </h3>
                    <p className="mt-2 text-sm text-muted">{vehicle.colors.join(" · ")}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
                      Options possibles
                    </h3>
                    <p className="mt-2 text-sm text-muted">{vehicle.options.join(" · ")}</p>
                  </div>
                </div>

                <p className="mt-6 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-muted">
                  Les caractéristiques finales dépendent de la version, de l’année et de la
                  disponibilité. Données fournies à titre indicatif — prix et fiche technique sur
                  demande.
                </p>

                {/* CTAs */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button variant="primary" onClick={() => handleQuote("Véhicule")} icon={<FileText className="h-4 w-4" />}>
                    Demander un devis
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuote("Fiche technique", "Je souhaite recevoir la fiche technique.")}
                    icon={<FileDown className="h-4 w-4" />}
                  >
                    Recevoir la fiche technique
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuote("Rappel", "Merci de me rappeler concernant ce véhicule.")}
                    icon={<PhoneCall className="h-4 w-4" />}
                  >
                    Être rappelé par TTS
                  </Button>
                  <Button
                    variant="whatsapp"
                    href={whatsappLink(
                      site.whatsappDigits,
                      `Bonjour TTS, je suis intéressé(e) par le ${vehicle.name}. Pouvez-vous m'envoyer plus d'informations ?`
                    )}
                    external
                    icon={<MessageCircle className="h-4 w-4" />}
                  >
                    Contacter sur WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
