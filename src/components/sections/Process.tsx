"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

export function Process() {
  const reduce = useReducedMotion();

  return (
    <Section id="process" divider>
      <SectionHeading
        eyebrow="Notre process"
        titleLines={["De l’analyse du besoin", "à l’accompagnement durable."]}
        intro="Un parcours clair et maîtrisé, pensé pour la performance et la durée de vos opérations."
      />

      <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5" stagger={0.1}>
        {processSteps.map((step, i) => (
          <motion.div
            key={step.step}
            variants={reduce ? undefined : fadeUp}
            className="relative"
          >
            {/* Connector line (desktop) */}
            {i < processSteps.length - 1 && (
              <span className="absolute left-12 top-5 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-sand/40 to-transparent lg:block" />
            )}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/40 bg-background font-display text-sm font-semibold text-sand">
              {step.step}
            </div>
            <h3 className="mt-5 font-display text-base font-semibold leading-snug">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  );
}
