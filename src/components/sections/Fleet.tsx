"use client";

import { ShieldCheck, Wrench, Mountain, Building2, Ship } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";

const blocks = [
  { icon: Mountain, title: "Robustesse", text: "Conçus pour les pistes, les mines et les chantiers." },
  { icon: ShieldCheck, title: "Fiabilité", text: "Des modèles éprouvés, reconnus pour leur endurance." },
  { icon: Wrench, title: "Adaptation terrain", text: "Aménagements et équipements selon vos missions." },
  { icon: Building2, title: "Flottes entreprises", text: "Constitution et gestion de flottes cohérentes." },
  { icon: Ship, title: "Importation & sourcing", text: "Un réseau international pour vous livrer juste." },
];

const models = [
  "Toyota Hilux",
  "Toyota Land Cruiser",
  "Toyota Prado",
  "Pick-up professionnels",
  "SUV tout-terrain",
  "Véhicules de mission",
];

export function Fleet() {
  return (
    <Section id="flottes" divider>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Visual */}
        <Reveal className="group order-2 lg:order-1">
          <PlaceholderImage
            src="/images/land-cruiser-field.jpg"
            alt="Flotte de 4x4 TTS prête pour le terrain"
            caption="Véhicules & flottes professionnelles"
            aspect="aspect-[5/4]"
            interactive
          />
        </Reveal>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-sand/70" aria-hidden />
              Véhicules &amp; flottes
            </span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tightest sm:text-4xl"
            lines={["Des véhicules robustes,", "sélectionnés pour le terrain."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Nous fournissons des véhicules robustes et fiables, sélectionnés pour répondre aux
              contraintes des routes, des mines, des chantiers et des missions professionnelles.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap gap-2">
              {models.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-line bg-foreground/[0.03] px-3 py-1.5 text-xs text-foreground/80"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2" stagger={0.08}>
            {blocks.map((b) => (
              <Reveal key={b.title}>
                <div className="flex gap-3">
                  <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-sand" />
                  <div>
                    <h3 className="font-display text-sm font-semibold">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href="#vehicules" variant="primary">
                Découvrir le catalogue
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
