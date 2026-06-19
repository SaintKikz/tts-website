"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fuel, Droplets, Flame, Container, Truck, Factory } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

const solutions = [
  { icon: Container, title: "Réservoirs industriels", text: "Capacités adaptées à vos sites et process." },
  { icon: Factory, title: "Cuves de stockage", text: "Stockage sécurisé pour l’industrie et l’énergie." },
  { icon: Fuel, title: "Citernes carburant", text: "Approvisionnement et distribution maîtrisés." },
  { icon: Droplets, title: "Citernes eau", text: "Solutions pour chantiers et sites isolés." },
  { icon: Flame, title: "Citernes LPG / GPL", text: "Stockage et transport de gaz aux normes." },
  { icon: Truck, title: "Camions-citernes", text: "Transport de carburant, eau et gaz sur site." },
];

export function Tanks() {
  const reduce = useReducedMotion();

  return (
    <Section id="citernes" divider className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/2 bg-[radial-gradient(50%_60%_at_80%_20%,rgb(var(--petrol)/0.14),transparent_70%)]" />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Citernes, cuves & stockage"
            titleLines={["Stocker, transporter,", "approvisionner en énergie."]}
            intro="Des solutions pensées pour le stockage, le transport et l’approvisionnement en énergie, carburant, eau et gaz — au service des opérations industrielles et minières."
          />

          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2" stagger={0.07}>
            {solutions.map((s) => (
              <motion.div
                key={s.title}
                variants={reduce ? undefined : fadeUp}
                className="group bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <s.icon className="h-6 w-6 text-sand" />
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-9">
              <Button href="#contact" variant="outline">
                Demander une solution de stockage
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Visual stack */}
        <div className="grid grid-rows-2 gap-6">
          <Reveal className="group">
            <PlaceholderImage
              src="/images/fuel-tank.jpg"
              alt="Réservoir industriel de stockage de carburant"
              caption="Réservoir industriel"
              aspect="aspect-[16/10]"
              interactive
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="group">
            <PlaceholderImage
              src="/images/lpg-tanker.jpg"
              alt="Camion-citerne LPG / GPL"
              caption="Citerne LPG / GPL"
              aspect="aspect-[16/10]"
              interactive
              className="h-full"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
