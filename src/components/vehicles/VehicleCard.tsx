"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, GitCompareArrows, Users, Gauge, Fuel } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  vehicle: Vehicle;
  onOpen: (v: Vehicle) => void;
  onToggleCompare: (v: Vehicle) => void;
  isComparing: boolean;
  compareDisabled?: boolean;
};

const availabilityStyles: Record<string, string> = {
  Disponible: "border-[#047857]/30 bg-[#047857]/10 text-[#047857]",
  "Sur commande": "border-sand/30 bg-sand/15 text-sand",
  "À confirmer": "border-line bg-foreground/5 text-muted",
};

export function VehicleCard({
  vehicle,
  onOpen,
  onToggleCompare,
  isComparing,
  compareDisabled,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={reduce ? undefined : fadeUp}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-surface/60 transition-colors duration-300",
        isComparing ? "border-sand/50" : "border-line hover:border-foreground/15"
      )}
    >
      {/* Media */}
      <div className="relative">
        <button
          onClick={() => onOpen(vehicle)}
          className="block w-full text-left"
          aria-label={`Voir ${vehicle.name}`}
        >
          <PlaceholderImage
            src={vehicle.mainImage}
            alt={vehicle.name}
            caption={vehicle.name}
            aspect="aspect-[16/11]"
            interactive
            className="rounded-none border-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        </button>

        {/* Availability */}
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md",
            availabilityStyles[vehicle.availability] ?? availabilityStyles["À confirmer"]
          )}
        >
          {vehicle.availability}
        </span>

        {/* Compare toggle */}
        <button
          onClick={() => onToggleCompare(vehicle)}
          disabled={!isComparing && compareDisabled}
          aria-pressed={isComparing}
          aria-label={isComparing ? "Retirer du comparateur" : "Ajouter au comparateur"}
          className={cn(
            "absolute right-4 top-4 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md transition-colors",
            isComparing
              ? "border-sand bg-sand text-background"
              : "border-line bg-background/50 text-foreground/80 hover:border-sand/50 disabled:opacity-40"
          )}
        >
          {isComparing ? <Check className="h-3.5 w-3.5" /> : <GitCompareArrows className="h-3.5 w-3.5" />}
          Comparer
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs uppercase tracking-[0.18em] text-sand">{vehicle.category}</span>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{vehicle.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{vehicle.tagline}</p>

        {/* Quick specs */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-sand" /> {vehicle.transmission}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-sand" /> {vehicle.seats}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-sand" /> {vehicle.fuel.replace(" (indicatif)", "")}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="text-sm text-muted">
            Prix : <span className="text-foreground">{vehicle.priceIndicative}</span>
          </span>
          <button
            onClick={() => onOpen(vehicle)}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-sand"
          >
            Voir le véhicule
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
