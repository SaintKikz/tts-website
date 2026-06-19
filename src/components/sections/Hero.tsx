"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { AnimatedHeading, Accent } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { useQuote } from "@/context/QuoteContext";
import { keyFigures, site } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { requestQuote } = useQuote();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: background drifts/zooms as you scroll past the hero.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Cinematic background (placeholder until hero-mining-road.jpg is added) */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <motion.div
          initial={reduce ? false : { scale: 1.15 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 1.8, ease: EASE_OUT }}
          className="h-full w-full"
        >
          <PlaceholderImage
            src="/images/hero-mining-road.jpg"
            alt="Land Cruiser sur une route minière au coucher du soleil, Guinée"
            caption="Hero — terrain · véhicules · logistique"
            aspect="aspect-auto"
            priority
            className="h-full w-full rounded-none border-0"
          />
        </motion.div>
      </motion.div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-tts relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16"
      >
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="eyebrow"
        >
          <span className="h-px w-8 bg-sand" aria-hidden />
          {site.legalName} · {site.location}
        </motion.span>

        <AnimatedHeading
          as="h1"
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tightest text-foreground sm:text-6xl lg:text-7xl"
          lines={[
            "Des solutions fiables",
            "pour les secteurs minier,",
            <>
              logistique &amp; <Accent>industriel</Accent>.
            </>,
          ]}
          stagger={0.14}
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          TTS accompagne les entreprises, institutions et projets stratégiques avec des véhicules,
          équipements, citernes et solutions logistiques adaptés aux exigences du terrain.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE_OUT }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button size="lg" onClick={() => requestQuote({ needType: "Devis" })} icon={<ArrowRight className="h-5 w-5" />}>
            Demander un devis
          </Button>
          <Button size="lg" variant="outline" href="#activites">
            Découvrir nos services
          </Button>
        </motion.div>

        {/* Key figures strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {keyFigures.map((fig) => (
            <div key={fig.label} className="bg-background/40 p-5 backdrop-blur-sm">
              <div className="font-display text-3xl font-bold tracking-tight text-foreground">
                <Counter to={fig.value} suffix={fig.suffix} />
              </div>
              <p className="mt-1 text-xs leading-snug text-muted">{fig.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.a
          href="#about"
          aria-label="Défiler vers le bas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted sm:block"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-10 w-10 place-items-center rounded-full border border-line"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
