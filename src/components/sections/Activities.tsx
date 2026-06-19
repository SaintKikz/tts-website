"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Truck,
  Wrench,
  Route,
  HardHat,
  Fuel,
  Mountain,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { activities, type Activity } from "@/data/activities";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { fadeUp } from "@/lib/motion";

const iconMap: Record<Activity["icon"], LucideIcon> = {
  truck: Truck,
  wrench: Wrench,
  route: Route,
  hardhat: HardHat,
  fuel: Fuel,
  mountain: Mountain,
};

export function Activities() {
  const reduce = useReducedMotion();

  return (
    <Section id="activites" divider>
      <SectionHeading
        eyebrow="Nos activités"
        titleLines={["Six pôles d’expertise,", "une seule exigence : le terrain."]}
        intro="De la fourniture de 4x4 professionnels aux citernes LPG, en passant par la logistique minière et les solutions de chantier, nous aidons les entreprises à avancer avec confiance."
      />

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon];
          return (
            <motion.article
              key={activity.id}
              variants={reduce ? undefined : fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 transition-colors duration-300 hover:border-foreground/15"
            >
              <div className="relative">
                <PlaceholderImage
                  src={activity.image}
                  alt={activity.title}
                  caption={activity.title}
                  aspect="aspect-[16/10]"
                  interactive
                  className="rounded-none border-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-background/70 backdrop-blur-md transition-colors duration-300 group-hover:border-sand/50">
                  <Icon className="h-5 w-5 text-sand" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">{activity.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{activity.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-sand">
                  En savoir plus
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.article>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
