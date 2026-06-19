"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { navItems, site } from "@/data/site";
import { activities } from "@/data/activities";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappLink(
    site.whatsappDigits,
    "Bonjour TTS, je souhaite obtenir des informations."
  );

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-tts py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-sand font-display text-sm font-bold text-background">
                T
              </span>
              <span className="font-display text-lg font-bold tracking-tight">TTS</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.legalName}. Solutions fiables en véhicules, logistique, BTP et équipements
              industriels pour la Guinée et l’Afrique de l’Ouest.
            </p>
            <p className="mt-4 font-display text-sm text-sand">{site.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Activités
            </h3>
            <ul className="mt-4 space-y-2.5">
              {activities.map((a) => (
                <li key={a.id}>
                  <Link
                    href="#activites"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                <span>{site.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                <a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <p className="text-muted/70">Conakry, Guinée · Afrique de l’Ouest</p>
        </div>
      </div>
    </footer>
  );
}
