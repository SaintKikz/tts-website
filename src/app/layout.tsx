import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tts-guinee.com"),
  title: {
    default: `${site.name} — ${site.legalName} | Véhicules, logistique & solutions industrielles en Guinée`,
    template: `%s | ${site.name}`,
  },
  description:
    "TTS – Transatlantic Trade & Services accompagne les entreprises, institutions et projets miniers en Guinée et en Afrique de l’Ouest : véhicules 4x4, location, logistique, BTP, citernes et solutions industrielles.",
  keywords: [
    "TTS Guinée",
    "véhicules 4x4 Guinée",
    "logistique minière",
    "citernes LPG",
    "BTP Guinée",
    "Toyota Hilux Land Cruiser Prado",
    "solutions industrielles Afrique de l'Ouest",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.legalName,
    title: `${site.name} — Solutions fiables pour les secteurs minier, logistique et industriel`,
    description:
      "Véhicules professionnels, logistique, BTP, citernes et solutions industrielles pour la Guinée et l’Afrique de l’Ouest.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <QuoteProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
