"use client";

import { ShieldCheck, Zap, Network } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const pillars = [
  { icon: ShieldCheck, title: "Fiabilité", text: "Des engagements tenus, sur le terrain comme dans les délais." },
  { icon: Zap, title: "Réactivité", text: "Une capacité à répondre vite, même sur des demandes spécifiques." },
  { icon: Network, title: "Réseau fournisseur", text: "Un sourcing international au service de vos opérations." },
];

export function About() {
  return (
    <Section id="about" divider>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — text */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-sand/70" aria-hidden />
              À propos de TTS
            </span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tightest sm:text-4xl lg:text-[2.75rem]"
            lines={["Un partenaire de services,", "de fourniture et de logistique", "ancré en Guinée."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              TTS – Transatlantic Trade &amp; Services accompagne les acteurs économiques de Guinée et
              d’Afrique de l’Ouest. Notre force : une connaissance réelle du terrain, une grande
              réactivité et un réseau de fournisseurs capable de répondre aux besoins des entreprises,
              des institutions et des grands projets.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <blockquote className="mt-8 border-l-2 border-sand pl-5">
              <p className="font-display text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                « Notre mission : fournir aux acteurs économiques les moyens matériels, logistiques et
                techniques nécessaires à leurs opérations. »
              </p>
            </blockquote>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3" stagger={0.1}>
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <div>
                  <p.icon className="h-6 w-6 text-sand" />
                  <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>

        {/* Right — visual */}
        <Reveal delay={0.1} className="group relative">
          <PlaceholderImage
            src="/images/mining-site.jpg"
            alt="Opérations TTS sur un site industriel en Guinée"
            caption="Présence terrain — Guinée"
            aspect="aspect-[4/5]"
            interactive
            className="h-full"
          />
          {/* Floating credential card */}
          <div className="absolute -bottom-6 -left-6 hidden max-w-[15rem] rounded-2xl border border-line bg-surface/90 p-5 shadow-glow backdrop-blur-xl sm:block">
            <p className="font-display text-3xl font-bold text-sand">6</p>
            <p className="mt-1 text-sm text-muted">
              pôles d’expertise au service de vos projets industriels et institutionnels.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
