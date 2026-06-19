"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { galleryItems } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Gallery() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-4%", reduce ? "-4%" : "4%"]);

  return (
    <Section id="galerie" divider>
      <SectionHeading
        eyebrow="Galerie"
        titleLines={["Le terrain, en images."]}
        intro="Véhicules, camions, citernes, chantiers, mines et logistique — un aperçu de l’univers TTS."
      />

      <div ref={ref}>
        <RevealGroup
          className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4"
          stagger={0.07}
        >
          {galleryItems.map((item, i) => (
            <motion.figure
              key={item.caption}
              variants={reduce ? undefined : fadeUp}
              className={cn("group relative overflow-hidden rounded-2xl border border-line", item.span)}
            >
              {/* First tile gets a gentle parallax drift */}
              {i === 0 ? (
                <motion.div style={{ y: parallax }} className="absolute inset-0 scale-110">
                  <PlaceholderImage
                    src={item.src}
                    alt={item.caption}
                    caption={item.caption}
                    aspect="aspect-auto"
                    interactive
                    className="h-full rounded-none border-0"
                  />
                </motion.div>
              ) : (
                <PlaceholderImage
                  src={item.src}
                  alt={item.caption}
                  caption={item.caption}
                  aspect="aspect-auto"
                  interactive
                  className="h-full rounded-none border-0"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 font-display text-sm font-medium text-foreground/90">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
