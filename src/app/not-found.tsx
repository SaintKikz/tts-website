import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-tts flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="font-display text-7xl font-bold text-sand/30">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-muted">
        La page que vous recherchez n’existe pas ou a été déplacée.
      </p>
      <Button href="/" className="mt-8">
        Retour à l’accueil
      </Button>
    </div>
  );
}
