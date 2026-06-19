"use client";

import { motion, useReducedMotion } from "framer-motion";
import { advantages } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

export function WhyTTS() {
  const reduce = useReducedMotion();

  return (
    <Section id="pourquoi" divider className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint [background-size:40px_40px] opacity-30" />

      <SectionHeading
        eyebrow="Pourquoi choisir TTS"
        titleLines={["La crédibilité d’un partenaire", "qui connaît le terrain."]}
        intro="Une approche sur mesure et une exigence professionnelle au service des projets miniers, industriels et institutionnels."
        align="center"
        className="mx-auto"
      />

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {advantages.map((adv, i) => (
          <motion.div
            key={adv.title}
            variants={reduce ? undefined : fadeUp}
            className="group relative bg-surface p-8 transition-colors hover:bg-surface-2"
          >
            <span className="font-display text-sm font-semibold text-sand/70">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold">{adv.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{adv.text}</p>
            <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-sand to-transparent transition-transform duration-500 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  );
}
