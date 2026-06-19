"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Real image path under /public. When the file exists it fades in on top. */
  src?: string;
  alt: string;
  /** Caption shown on the placeholder until a real image is present. */
  caption?: string;
  className?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  /** Subtle parallax/zoom on hover when true. */
  interactive?: boolean;
  priority?: boolean;
};

/**
 * Premium placeholder that gracefully upgrades to a real photo.
 *
 * - With no asset present: shows a branded anthracite→sand gradient block,
 *   a faint grid, an icon and the caption — so the layout looks intentional.
 * - As soon as `src` resolves (you add the file to /public), the real image
 *   fades in over the placeholder. No code change needed.
 */
export function PlaceholderImage({
  src,
  alt,
  caption,
  className,
  aspect = "aspect-[4/3]",
  interactive = false,
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-surface",
        aspect,
        className
      )}
    >
      {/* Branded placeholder layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-2 via-surface to-background" />
      <div className="absolute inset-0 bg-grid-faint [background-size:28px_28px] opacity-60" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <ImageIcon className="h-7 w-7 text-sand/70" aria-hidden />
        {caption ? (
          <span className="font-display text-sm font-medium tracking-wide text-foreground/80">
            {caption}
          </span>
        ) : null}
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted/70">
          Visuel à venir
        </span>
      </div>

      {/* Real image — fades in once it loads successfully */}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            interactive && "transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          )}
        />
      ) : null}
    </div>
  );
}
