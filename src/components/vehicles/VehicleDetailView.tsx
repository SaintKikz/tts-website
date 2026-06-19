"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, FileDown, PhoneCall, MessageCircle, Check, GitCompareArrows } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { Vehicle360Viewer } from "./Vehicle360Viewer";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useQuote } from "@/context/QuoteContext";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Full-page vehicle detail (alternative to the modal). CTAs set the quote
 * prefill (which survives client navigation because QuoteProvider lives in the
 * root layout) then route to the home contact section.
 */
export function VehicleDetailView({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const { requestQuote } = useQuote();

  const goToQuote = (needType: string, extra?: string) => {
    requestQuote({ needType, vehicleModel: vehicle.name, message: extra });
    router.push("/#contact");
  };

  return (
    <div className="container-tts pt-28 pb-24 sm:pt-32">
      {/* Breadcrumb / back */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/#vehicules"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>
        <Link
          href="/#vehicules"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-sand"
        >
          <GitCompareArrows className="h-4 w-4" />
          Comparer les véhicules
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Visuals */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Vehicle360Viewer vehicle={vehicle} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {vehicle.gallery.slice(0, 3).map((src, i) => (
              <PlaceholderImage
                key={i}
                src={src}
                alt={`${vehicle.name} — photo ${i + 1}`}
                caption=""
                aspect="aspect-[4/3]"
              />
            ))}
          </div>
        </Reveal>

        {/* Details */}
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-sand">{vehicle.category}</span>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tightest sm:text-5xl">
            {vehicle.name}
          </h1>
          <p className="mt-3 font-display text-lg text-foreground/80">{vehicle.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-muted">{vehicle.description}</p>

          {/* Usages */}
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
              Usages recommandés
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {vehicle.recommendedFor.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/80"
                >
                  <Check className="h-3 w-3 text-sand" />
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
              Caractéristiques (indicatives)
            </h2>
            <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {vehicle.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between gap-3 bg-surface px-4 py-3">
                  <dt className="text-xs text-muted">{spec.label}</dt>
                  <dd className="text-right text-sm font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Colors / options */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">Couleurs</h2>
              <p className="mt-2 text-sm text-muted">{vehicle.colors.join(" · ")}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">Options possibles</h2>
              <p className="mt-2 text-sm text-muted">{vehicle.options.join(" · ")}</p>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-muted">
            Les caractéristiques finales dépendent de la version, de l’année et de la disponibilité.
            Données fournies à titre indicatif — prix et fiche technique sur demande.
          </p>

          {/* CTAs */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button onClick={() => goToQuote("Véhicule")} icon={<FileText className="h-4 w-4" />}>
              Demander un devis
            </Button>
            <Button
              variant="outline"
              onClick={() => goToQuote("Fiche technique", "Je souhaite recevoir la fiche technique.")}
              icon={<FileDown className="h-4 w-4" />}
            >
              Recevoir la fiche technique
            </Button>
            <Button
              variant="outline"
              onClick={() => goToQuote("Rappel", "Merci de me rappeler concernant ce véhicule.")}
              icon={<PhoneCall className="h-4 w-4" />}
            >
              Être rappelé par TTS
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappLink(
                site.whatsappDigits,
                `Bonjour TTS, je suis intéressé(e) par le ${vehicle.name}.`
              )}
              external
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Contacter sur WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
