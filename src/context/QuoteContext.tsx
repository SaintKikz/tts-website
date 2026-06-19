"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type QuotePrefill = {
  /** Type de besoin: "Véhicule", "Location", "Citerne", etc. */
  needType?: string;
  /** Modèle de véhicule demandé, si applicable. */
  vehicleModel?: string;
  /** Message pré-rempli. */
  message?: string;
};

type QuoteContextValue = {
  prefill: QuotePrefill | null;
  /** Set prefill data AND smooth-scroll to the contact section. */
  requestQuote: (data: QuotePrefill) => void;
  clearPrefill: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);

  const requestQuote = useCallback((data: QuotePrefill) => {
    setPrefill(data);
    // Defer to next frame so any closing modal unmounts before we scroll.
    requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const clearPrefill = useCallback(() => setPrefill(null), []);

  return (
    <QuoteContext.Provider value={{ prefill, requestQuote, clearPrefill }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
