/**
 * Global site content & configuration.
 * Edit this file to update contact details, navigation, key figures, etc.
 * Phone/WhatsApp/email below are PLACEHOLDERS — replace with real values.
 */

export const site = {
  name: "TTS",
  legalName: "Transatlantic Trade & Services",
  tagline: "Built for the field. Designed for business.",
  location: "Conakry, Guinée",
  // --- Replace these placeholders with real contact details ---
  phoneDisplay: "+224 600 00 00 00",
  whatsappDigits: "224600000000", // digits only, country code included
  email: "contact@tts-guinee.com",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Activités", href: "#activites" },
  { label: "Véhicules", href: "#vehicules" },
  { label: "Citernes", href: "#citernes" },
  { label: "Secteurs", href: "#secteurs" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/** Key figures for the animated counters / trust strip. */
export const keyFigures = [
  { value: 6, suffix: "", label: "Pôles d’expertise" },
  { value: 100, suffix: "%", label: "Solutions B2B sur mesure" },
  { value: 24, suffix: "/7", label: "Réactivité & accompagnement" },
  { value: 15, suffix: "+", label: "Catégories de véhicules & équipements" },
] as const;

/** "Pourquoi choisir TTS" — value propositions. */
export const advantages = [
  {
    title: "Connaissance du terrain",
    text: "Une maîtrise réelle des contraintes guinéennes : routes difficiles, sites isolés, logistique exigeante.",
  },
  {
    title: "Solutions adaptées",
    text: "Du matériel et des équipements pensés pour les environnements miniers, industriels et de chantier.",
  },
  {
    title: "Réseau de fournisseurs",
    text: "Un sourcing international fiable pour répondre vite et juste, même sur des demandes spécifiques.",
  },
  {
    title: "Réactivité",
    text: "Des réponses rapides et un accompagnement de bout en bout, de l’analyse à la mise à disposition.",
  },
  {
    title: "Accompagnement B2B",
    text: "Un interlocuteur unique pour les entreprises, institutions et grands donneurs d’ordre.",
  },
  {
    title: "Qualité professionnelle",
    text: "Des standards exigeants au service de projets miniers, industriels et institutionnels.",
  },
] as const;

/** Client journey shown in the Process section. */
export const processSteps = [
  {
    step: "01",
    title: "Analyse du besoin",
    text: "Nous écoutons votre projet et qualifions précisément vos contraintes techniques et opérationnelles.",
  },
  {
    step: "02",
    title: "Proposition technique & commerciale",
    text: "Nous construisons une offre claire, adaptée à votre usage, votre budget et vos délais.",
  },
  {
    step: "03",
    title: "Sourcing & disponibilité",
    text: "Nous mobilisons notre réseau de fournisseurs pour garantir le bon matériel, au bon moment.",
  },
  {
    step: "04",
    title: "Livraison / mise à disposition",
    text: "Véhicules, équipements et citernes livrés ou mis à disposition sur site, prêts à opérer.",
  },
  {
    step: "05",
    title: "Suivi & accompagnement",
    text: "Un accompagnement continu pour assurer la performance et la durée de vos opérations.",
  },
] as const;

/**
 * Gallery tiles. `src` points to a real image once you add it under /public.
 * While the file is missing, a premium branded placeholder is shown instead.
 */
export const galleryItems = [
  { src: "/images/mining-site.jpg", caption: "Site minier", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/hilux-fleet.jpg", caption: "Flotte 4x4", span: "" },
  { src: "/images/fuel-tank.jpg", caption: "Citerne carburant", span: "" },
  { src: "/images/logistics-truck.jpg", caption: "Logistique", span: "lg:col-span-2" },
  { src: "/images/construction-site.jpg", caption: "Chantier BTP", span: "" },
  { src: "/images/land-cruiser-field.jpg", caption: "Land Cruiser — terrain", span: "" },
  { src: "/images/lpg-tanker.jpg", caption: "Citerne LPG / GPL", span: "lg:col-span-2" },
  { src: "/images/tank-storage.jpg", caption: "Stockage industriel", span: "" },
] as const;
