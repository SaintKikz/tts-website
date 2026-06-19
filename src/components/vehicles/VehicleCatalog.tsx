"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import {
  vehicles as allVehicles,
  VEHICLE_FILTERS,
  type Vehicle,
  type VehicleTag,
} from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";
import { VehicleDetailsModal } from "./VehicleDetailsModal";
import { VehicleComparator } from "./VehicleComparator";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_COMPARE = 3;

export function VehicleCatalog() {
  const [active, setActive] = useState<Set<VehicleTag>>(new Set());
  const [openVehicle, setOpenVehicle] = useState<Vehicle | null>(null);
  const [compare, setCompare] = useState<Vehicle[]>([]);
  const [comparatorOpen, setComparatorOpen] = useState(false);

  const toggleFilter = (tag: VehicleTag) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (active.size === 0) return allVehicles;
    return allVehicles.filter((v) => [...active].every((tag) => v.tags.includes(tag)));
  }, [active]);

  const toggleCompare = (v: Vehicle) => {
    setCompare((prev) => {
      const exists = prev.find((x) => x.id === v.id);
      if (exists) return prev.filter((x) => x.id !== v.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, v];
    });
  };

  const isComparing = (v: Vehicle) => compare.some((x) => x.id === v.id);

  return (
    <Section id="vehicules" divider className="relative overflow-hidden">
      {/* Atmospheric backdrop for the "showroom" feel */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-70" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Catalogue véhicules"
          titleLines={["Une expérience", "de showroom premium."]}
          intro="Explorez nos véhicules comme chez un concessionnaire : vue 360°, fiche technique détaillée, comparateur et demande de devis en un clic. Sélection pensée pour les routes, les mines, les chantiers et les missions professionnelles."
        />
        <p className="shrink-0 text-sm text-muted">
          <span className="font-display text-2xl font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          modèle{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive(new Set())}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            active.size === 0
              ? "border-sand bg-sand text-background"
              : "border-line text-foreground/75 hover:border-sand/50"
          )}
        >
          Tout
        </button>
        {VEHICLE_FILTERS.map((tag) => {
          const on = active.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              aria-pressed={on}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                on
                  ? "border-sand bg-sand text-background"
                  : "border-line text-foreground/75 hover:border-sand/50 hover:text-foreground"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {filtered.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onOpen={setOpenVehicle}
              onToggleCompare={toggleCompare}
              isComparing={isComparing(v)}
              compareDisabled={compare.length >= MAX_COMPARE}
            />
          ))}
        </RevealGroup>
      ) : (
        <div className="mt-10 rounded-3xl border border-line bg-surface/50 p-12 text-center">
          <p className="text-muted">Aucun véhicule ne correspond à ces filtres.</p>
          <button
            onClick={() => setActive(new Set())}
            className="mt-4 text-sm font-medium text-sand hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Compare tray */}
      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
          >
            <div className="container-tts">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/90 p-4 shadow-glow backdrop-blur-xl sm:flex-row sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm text-muted sm:inline">Comparateur :</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {compare.map((v) => (
                      <span
                        key={v.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-foreground/[0.03] py-1 pl-3 pr-1.5 text-xs"
                      >
                        {v.name}
                        <button
                          onClick={() => toggleCompare(v)}
                          aria-label={`Retirer ${v.name}`}
                          className="grid h-5 w-5 place-items-center rounded-full hover:bg-foreground/10"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {Array.from({ length: MAX_COMPARE - compare.length }).map((_, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-dashed border-line px-3 py-1 text-xs text-muted/60"
                      >
                        + ajouter
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setCompare([])}>
                    Vider
                  </Button>
                  <Button
                    size="sm"
                    disabled={compare.length < 2}
                    onClick={() => setComparatorOpen(true)}
                    icon={<GitCompareArrows className="h-4 w-4" />}
                  >
                    Comparer ({compare.length})
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <VehicleDetailsModal vehicle={openVehicle} onClose={() => setOpenVehicle(null)} />
      <VehicleComparator
        open={comparatorOpen}
        vehicles={compare}
        onClose={() => setComparatorOpen(false)}
        onRemove={toggleCompare}
      />
    </Section>
  );
}
