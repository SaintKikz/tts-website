"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import dynamic from "next/dynamic";
import { RotateCw, ChevronLeft, ChevronRight, Box, Hand, Play, Pause } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { cn, pad2 } from "@/lib/utils";

// 3D viewer is heavy (three/R3F) — load only when the user switches to it.
const VehicleModel3D = dynamic(
  () => import("./VehicleModel3D").then((m) => m.VehicleModel3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center text-sm text-muted">
        Chargement du modèle 3D…
      </div>
    ),
  }
);

type Props = {
  vehicle: Vehicle;
  className?: string;
};

/**
 * 360° vehicle viewer.
 *
 * Two source modes (per data/vehicles.ts):
 *  - Image sequence: drag/swipe scrubs through frames at
 *    `${images360Path}01.jpg`, `02.jpg`, … (set use360Placeholder:false).
 *  - Placeholder: a synthetic turntable silhouette rotates with the drag,
 *    so the interaction is fully demoable before real photos exist.
 *
 * Plus an optional "3D" tab when `model3dPath` is set (loads R3F lazily).
 */
export function Vehicle360Viewer({ vehicle, className }: Props) {
  const { frames360, images360Path, use360Placeholder, name, model3dPath } = vehicle;

  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [auto, setAuto] = useState(false);
  const [mode, setMode] = useState<"360" | "3d">("360");

  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startFrame: 0 });

  const angle = useMemo(() => (frame / frames360) * 360, [frame, frames360]);

  const stepFrame = useCallback(
    (delta: number) => {
      setFrame((f) => (((f + delta) % frames360) + frames360) % frames360);
    },
    [frames360]
  );

  // Auto-rotate
  useEffect(() => {
    if (!auto || mode !== "360") return;
    const id = window.setInterval(() => stepFrame(1), 80);
    return () => window.clearInterval(id);
  }, [auto, mode, stepFrame]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== "360") return;
    setDragging(true);
    setHinted(true);
    setAuto(false);
    dragState.current = { startX: e.clientX, startFrame: frame };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || mode !== "360") return;
    const width = containerRef.current?.clientWidth ?? 480;
    const pxPerFrame = Math.max(5, width / frames360);
    const delta = e.clientX - dragState.current.startX;
    const framesMoved = Math.round(delta / pxPerFrame);
    setFrame(
      (((dragState.current.startFrame + framesMoved) % frames360) + frames360) % frames360
    );
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (mode !== "360") return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepFrame(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepFrame(1);
    }
  };

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface-2 to-background",
        className
      )}
    >
      {/* Ambient floor glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-radial-fade" />

      {/* Stage */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        {mode === "3d" && model3dPath ? (
          <VehicleModel3D modelPath={model3dPath} />
        ) : (
          <div
            ref={containerRef}
            role="slider"
            aria-label={`Vue 360° de ${name}`}
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={Math.round(angle)}
            aria-valuetext={`${Math.round(angle)} degrés`}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onKeyDown={onKeyDown}
            className={cn(
              "absolute inset-0 touch-none select-none",
              dragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {use360Placeholder ? (
              <TurntablePlaceholder angle={angle} name={name} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${images360Path}${pad2(frame + 1)}.jpg`}
                alt={`${name} — vue ${Math.round(angle)}°`}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            )}
          </div>
        )}

        {/* Drag hint */}
        {!hinted && mode === "360" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full border border-line bg-background/70 px-4 py-2 text-xs text-foreground/80 backdrop-blur-md">
              <Hand className="h-3.5 w-3.5 text-sand" />
              Glissez pour faire pivoter
            </span>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-background/60 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <ControlButton label="Pivoter à gauche" onClick={() => stepFrame(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </ControlButton>
          <ControlButton
            label={auto ? "Arrêter la rotation" : "Rotation automatique"}
            onClick={() => setAuto((v) => !v)}
            active={auto}
          >
            {auto ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </ControlButton>
          <ControlButton label="Pivoter à droite" onClick={() => stepFrame(1)}>
            <ChevronRight className="h-4 w-4" />
          </ControlButton>
        </div>

        <span className="hidden items-center gap-2 text-xs text-muted sm:flex">
          <RotateCw className="h-3.5 w-3.5 text-sand" />
          {Math.round(angle)}° · {use360Placeholder ? "Aperçu" : `${frame + 1}/${frames360}`}
        </span>

        {/* Mode toggle (only if a 3D model is configured) */}
        {model3dPath ? (
          <div className="flex rounded-full border border-line p-0.5 text-xs">
            <button
              onClick={() => setMode("360")}
              className={cn(
                "rounded-full px-3 py-1 transition-colors",
                mode === "360" ? "bg-sand text-background" : "text-muted hover:text-foreground"
              )}
            >
              360°
            </button>
            <button
              onClick={() => setMode("3d")}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1 transition-colors",
                mode === "3d" ? "bg-sand text-background" : "text-muted hover:text-foreground"
              )}
            >
              <Box className="h-3 w-3" /> 3D
            </button>
          </div>
        ) : (
          <span className="w-12" aria-hidden />
        )}
      </div>
    </div>
  );
}

function ControlButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-sand/60 hover:text-sand",
        active ? "border-sand/60 text-sand" : "text-foreground/80"
      )}
    >
      {children}
    </button>
  );
}

/**
 * Synthetic turntable used until real 360° photos are supplied.
 * Fakes depth by scaling the silhouette horizontally with cos(angle) and
 * flipping it across the front/back axis — enough to make the drag feel 3D.
 */
function TurntablePlaceholder({ angle, name }: { angle: number; name: string }) {
  const rad = (angle * Math.PI) / 180;
  const scaleX = Math.max(0.16, Math.abs(Math.cos(rad)));
  const flipped = angle > 90 && angle < 270;

  return (
    <div className="absolute inset-0 grid place-items-center">
      {/* Rotating base ellipse */}
      <div
        className="absolute bottom-[18%] h-10 w-3/5 rounded-[100%] bg-black/60 blur-md"
        style={{ transform: `scaleX(${0.6 + scaleX * 0.4})` }}
      />
      <div
        className="relative w-3/4 max-w-md transition-transform duration-75"
        style={{ transform: `scaleX(${flipped ? -scaleX : scaleX})` }}
      >
        <VehicleSilhouette />
      </div>

      {/* Angle readout */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 text-center">
        <div className="font-display text-4xl font-bold tracking-tight text-foreground/15">
          {Math.round(angle)}°
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted/60">
          {name}
        </div>
      </div>
    </div>
  );
}

/** Generic 4x4 / pick-up side silhouette (SVG). Replace with real renders. */
function VehicleSilhouette() {
  return (
    <svg viewBox="0 0 320 140" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="tts-veh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--sand))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(var(--sand))" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g fill="url(#tts-veh)">
        {/* body + cabin + bed (pick-up profile) */}
        <path d="M14 92 Q12 74 30 72 L92 70 Q104 44 132 42 L196 42 Q214 44 224 70 L292 76 Q308 78 306 94 L306 102 L14 102 Z" />
        {/* windows cut (background color) */}
        <path
          d="M112 56 Q118 50 132 50 L160 50 L160 68 L108 68 Q108 60 112 56 Z M168 50 L196 50 Q206 52 210 68 L168 68 Z"
          fill="rgb(var(--background))"
        />
      </g>
      {/* wheels */}
      <circle cx="78" cy="104" r="20" fill="rgb(var(--foreground))" opacity="0.9" />
      <circle cx="78" cy="104" r="9" fill="rgb(var(--background))" />
      <circle cx="246" cy="104" r="20" fill="rgb(var(--foreground))" opacity="0.9" />
      <circle cx="246" cy="104" r="9" fill="rgb(var(--background))" />
    </svg>
  );
}
