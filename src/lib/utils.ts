import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (conditional + dedupe). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a WhatsApp deep link with a prefilled message. */
export function whatsappLink(phoneE164Digits: string, message: string) {
  return `https://wa.me/${phoneE164Digits}?text=${encodeURIComponent(message)}`;
}

/** Zero-pad a frame index, e.g. 1 -> "01" (used for 360° image paths). */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}
