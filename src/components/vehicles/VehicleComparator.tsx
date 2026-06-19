"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Trash2, FileText } from "lucide-react";
import { RATING_LABELS, type Vehicle, type VehicleRatings } from "@/data/vehicles";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  vehicles: Vehicle[];
  onClose: () => void;
  onRemove: (v: Vehicle) => void;
};

export function VehicleComparator({ open, vehicles, onClose, onRemove }: Props) {
  const reduce = useReducedMotion();
  const { requestQuote } = useQuote();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const textRows: { label: string; get: (v: Vehicle) => string }[] = [
    { label: "Catégorie", get: (v) => v.category },
    { label: "Type d’usage", get: (v) => v.recommendedFor.join(", ") },
    { label: "Transmission", get: (v) => v.transmission },
    { label: "Places", get: (v) => v.seats },
    { label: "Capacité", get: (v) => v.loadCapacity },
    { label: "Disponibilité", get: (v) => v.availability },
    { label: "Prix indicatif", get: (v) => v.priceIndicative },
  ];

  return (
    <AnimatePresence>
      {open && vehicles.length > 0 && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Comparateur de véhicules"
        >
          <div className="fixed inset-0 bg-background/85 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl border border-line bg-surface shadow-glow sm:rounded-3xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/90 px-6 py-4 backdrop-blur-xl sm:rounded-t-3xl">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Comparer les véhicules
              </h2>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-sand/60 hover:text-sand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable comparison grid */}
            <div className="overflow-x-auto p-6">
              <div
                className="grid min-w-[640px] gap-px overflow-hidden rounded-2xl border border-line bg-line"
                style={{ gridTemplateColumns: `160px repeat(${vehicles.length}, minmax(0, 1fr))` }}
              >
                {/* Top row: vehicle headers */}
                <div className="bg-surface p-4" />
                {vehicles.map((v) => (
                  <div key={v.id} className="relative bg-surface p-4">
                    <button
                      onClick={() => onRemove(v)}
                      aria-label={`Retirer ${v.name}`}
                      className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-line text-muted transition-colors hover:border-energy/60 hover:text-energy"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <PlaceholderImage
                      src={v.mainImage}
                      alt={v.name}
                      caption={v.name}
                      aspect="aspect-[16/10]"
                      className="mb-3"
                    />
                    <p className="font-display text-sm font-semibold leading-tight">{v.name}</p>
                  </div>
                ))}

                {/* Text rows */}
                {textRows.map((row) => (
                  <Row key={row.label} label={row.label}>
                    {vehicles.map((v) => (
                      <Cell key={v.id}>{row.get(v)}</Cell>
                    ))}
                  </Row>
                ))}

                {/* Rating rows */}
                {RATING_LABELS.map((r) => (
                  <Row key={r.key} label={r.label}>
                    {vehicles.map((v) => (
                      <Cell key={v.id}>
                        <RatingMeter value={v.ratings[r.key as keyof VehicleRatings]} />
                      </Cell>
                    ))}
                  </Row>
                ))}

                {/* CTA row */}
                <div className="bg-surface p-4 text-xs text-muted">Action</div>
                {vehicles.map((v) => (
                  <div key={v.id} className="bg-surface p-4">
                    <Button
                      size="sm"
                      className="w-full"
                      icon={<FileText className="h-3.5 w-3.5" />}
                      onClick={() => {
                        requestQuote({ needType: "Véhicule", vehicleModel: v.name });
                        onClose();
                      }}
                    >
                      Devis
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center bg-surface p-4 text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </div>
      {children}
    </>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center bg-surface p-4 text-sm text-foreground/90">{children}</div>;
}

function RatingMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-5 rounded-full",
            i < value ? "bg-sand" : "bg-white/10"
          )}
        />
      ))}
    </div>
  );
}
