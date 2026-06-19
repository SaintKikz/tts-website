"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectors } from "@/data/sectors";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { fadeUp } from "@/lib/motion";

export function Sectors() {
  const reduce = useReducedMotion();

  return (
    <Section id="secteurs" divider>
      <SectionHeading
        eyebrow="Secteurs servis"
        titleLines={["Au service des secteurs", "stratégiques de la région."]}
        intro="Mines, BTP, énergie, transport, institutions et projets industriels : TTS apporte des réponses concrètes aux acteurs qui font avancer l’économie."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {sectors.map((sector) => (
          <motion.article
            key={sector.id}
            variants={reduce ? undefined : fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-line"
          >
            <PlaceholderImage
              src={sector.image}
              alt={sector.name}
              caption={sector.name}
              aspect="aspect-[4/5]"
              interactive
              className="rounded-none border-0"
            />
            {/* Gradient + content overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-xl font-semibold tracking-tight">{sector.name}</h3>
              <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
                {sector.text}
              </p>
              <span className="mt-3 block h-0.5 w-10 bg-sand transition-all duration-500 group-hover:w-16" />
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  );
}
