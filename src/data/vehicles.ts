/**
 * Vehicle catalog data — single source of truth for the showcase.
 *
 * IMPORTANT (per client brief): do NOT present these as confirmed prices or
 * exact technical specifications. Values are realistic PLACEHOLDERS. Final
 * specs depend on version, year and availability ("sur devis").
 *
 * To add real assets later:
 *  - mainImage / gallery: drop files in /public/images or /public/vehicles/<id>/
 *  - 360°: add frames to /public/vehicles/<id>/360/01.jpg ... and set
 *    `use360Placeholder: false` (see Vehicle360Viewer).
 *  - 3D: drop <id>.glb in /public/models and set `model3dPath`.
 */

export type Availability = "Disponible" | "Sur commande" | "À confirmer";

export type VehicleCategory =
  | "Pick-up 4x4"
  | "SUV 4x4"
  | "Véhicule de mission"
  | "Flotte entreprise";

export type SpecRow = { label: string; value: string };

/** Canonical, filterable tags. Keep vehicle `tags` values within this set. */
export const VEHICLE_FILTERS = [
  "4x4",
  "Pick-up",
  "SUV",
  "Véhicule minier",
  "Véhicule de chantier",
  "Flotte entreprise",
  "Disponible",
  "Sur commande",
  "Neuf",
  "Occasion",
] as const;

export type VehicleTag = (typeof VEHICLE_FILTERS)[number];

/** Attributes compared in the VehicleComparator (rated 1–5). */
export type VehicleRatings = {
  usageMine: number;
  usageRoute: number;
  robustesse: number;
  confort: number;
  vip: number;
};

export const RATING_LABELS: { key: keyof VehicleRatings; label: string }[] = [
  { key: "usageMine", label: "Usage mine" },
  { key: "usageRoute", label: "Usage route" },
  { key: "robustesse", label: "Robustesse" },
  { key: "confort", label: "Confort" },
  { key: "vip", label: "Usage direction / VIP" },
];

export type Vehicle = {
  id: string; // slug used in /vehicles/<id>
  name: string;
  category: VehicleCategory;
  tags: VehicleTag[];
  tagline: string;
  description: string;
  recommendedFor: string[];
  // Indicative technical sheet (placeholders)
  transmission: string;
  seats: string;
  fuel: string;
  loadCapacity: string;
  consumption: string;
  tank: string;
  year: string;
  status: string;
  availability: Availability;
  colors: string[];
  options: string[];
  priceIndicative: string;
  // Media
  mainImage: string;
  gallery: string[];
  // 360° viewer config
  images360Path: string;
  frames360: number;
  use360Placeholder: boolean;
  // Optional future 3D model
  model3dPath?: string;
  // Comparator
  ratings: VehicleRatings;
  specs: SpecRow[];
};

const indicativeSpecs = (v: Partial<Vehicle>): SpecRow[] => [
  { label: "Transmission", value: v.transmission ?? "4x4" },
  { label: "Places", value: v.seats ?? "5 places" },
  { label: "Motorisation", value: v.fuel ?? "Diesel (indicatif)" },
  { label: "Capacité", value: v.loadCapacity ?? "Selon version" },
  { label: "Consommation", value: v.consumption ?? "Indicative — selon version" },
  { label: "Réservoir", value: v.tank ?? "Selon version" },
  { label: "Disponibilité", value: v.availability ?? "À confirmer" },
  { label: "Statut", value: v.status ?? "Neuf / importé" },
];

const base = (v: Vehicle): Vehicle => ({ ...v, specs: indicativeSpecs(v) });

export const vehicles: Vehicle[] = [
  base({
    id: "toyota-hilux",
    name: "Toyota Hilux",
    category: "Pick-up 4x4",
    tags: ["4x4", "Pick-up", "Véhicule minier", "Véhicule de chantier", "Disponible", "Neuf"],
    tagline: "Robuste, fiable et conçu pour le terrain.",
    description:
      "Le pick-up de référence pour les opérations exigeantes. Pensé pour encaisser les pistes minières, les chantiers et les longues missions, sans compromis sur la fiabilité.",
    recommendedFor: ["Mines", "BTP", "Logistique", "Missions terrain"],
    transmission: "4x4",
    seats: "5 places",
    fuel: "Diesel (indicatif)",
    loadCapacity: "Pick-up professionnel — benne",
    consumption: "Indicative — selon version",
    tank: "Selon version",
    year: "Dernière génération",
    status: "Neuf / importé",
    availability: "Disponible",
    colors: ["Blanc", "Gris argent", "Noir", "Beige sable"],
    options: ["Roll-bar", "Marchepieds", "Attelage", "Snorkel", "Aménagement flotte"],
    priceIndicative: "Sur devis",
    mainImage: "/images/hilux-main.jpg",
    gallery: ["/images/hilux-fleet.jpg", "/images/hilux-main.jpg", "/images/mining-site.jpg"],
    images360Path: "/vehicles/hilux/360/",
    frames360: 36,
    use360Placeholder: true,
    model3dPath: "/models/hilux.glb",
    ratings: { usageMine: 5, usageRoute: 4, robustesse: 5, confort: 3, vip: 2 },
  } as Vehicle),

  base({
    id: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    category: "SUV 4x4",
    tags: ["4x4", "SUV", "Véhicule minier", "Flotte entreprise", "Sur commande", "Neuf"],
    tagline: "L’endurance absolue pour les environnements extrêmes.",
    description:
      "Référence mondiale du tout-terrain professionnel. Le Land Cruiser allie robustesse légendaire et fiabilité sur les sites les plus isolés.",
    recommendedFor: ["Mines", "Institutions", "Missions terrain", "Flottes"],
    transmission: "4x4",
    seats: "5 à 7 places",
    fuel: "Diesel (indicatif)",
    loadCapacity: "SUV utilitaire / mission",
    consumption: "Indicative — selon version",
    tank: "Grande autonomie (selon version)",
    year: "Dernière génération",
    status: "Neuf / importé",
    availability: "Sur commande",
    colors: ["Blanc", "Gris", "Noir", "Beige sable"],
    options: ["Treuil", "Snorkel", "Aménagement mine", "Kit communication", "Sièges renforcés"],
    priceIndicative: "Sur devis",
    mainImage: "/images/land-cruiser-main.jpg",
    gallery: ["/images/land-cruiser-field.jpg", "/images/land-cruiser-main.jpg", "/images/mining-site.jpg"],
    images360Path: "/vehicles/land-cruiser/360/",
    frames360: 36,
    use360Placeholder: true,
    model3dPath: "/models/land-cruiser.glb",
    ratings: { usageMine: 5, usageRoute: 4, robustesse: 5, confort: 4, vip: 3 },
  } as Vehicle),

  base({
    id: "toyota-prado",
    name: "Toyota Land Cruiser Prado",
    category: "SUV 4x4",
    tags: ["4x4", "SUV", "Flotte entreprise", "Sur commande", "Neuf"],
    tagline: "Le confort du terrain pour vos cadres et directions.",
    description:
      "Un SUV polyvalent qui conjugue capacités tout-terrain et confort haut de gamme. Idéal pour les déplacements de direction, les institutions et les missions VIP.",
    recommendedFor: ["Direction / VIP", "Institutions", "Route", "Missions terrain"],
    transmission: "4x4",
    seats: "5 à 7 places",
    fuel: "Diesel / Essence (indicatif)",
    loadCapacity: "SUV familial / direction",
    consumption: "Indicative — selon version",
    tank: "Selon version",
    year: "Dernière génération",
    status: "Neuf / importé",
    availability: "Sur commande",
    colors: ["Blanc nacré", "Gris anthracite", "Noir", "Beige"],
    options: ["Cuir", "Toit ouvrant", "Multimédia", "Aides à la conduite", "Jantes premium"],
    priceIndicative: "Sur devis",
    mainImage: "/images/prado-main.jpg",
    gallery: ["/images/prado-road.jpg", "/images/prado-main.jpg", "/images/land-cruiser-field.jpg"],
    images360Path: "/vehicles/prado/360/",
    frames360: 36,
    use360Placeholder: true,
    model3dPath: "/models/prado.glb",
    ratings: { usageMine: 3, usageRoute: 5, robustesse: 4, confort: 5, vip: 5 },
  } as Vehicle),

  base({
    id: "pickup-professionnel",
    name: "Pick-up professionnel",
    category: "Pick-up 4x4",
    tags: ["4x4", "Pick-up", "Véhicule de chantier", "Flotte entreprise", "Disponible", "Neuf"],
    tagline: "La polyvalence utilitaire pour vos équipes terrain.",
    description:
      "Pick-up double cabine optimisé pour le travail : transport d’équipes, de matériel et d’équipements légers sur chantiers et sites d’exploitation.",
    recommendedFor: ["BTP", "Logistique", "Flottes", "Chantiers"],
    transmission: "4x4",
    seats: "5 places",
    fuel: "Diesel (indicatif)",
    loadCapacity: "Benne utilitaire",
    consumption: "Indicative — selon version",
    tank: "Selon version",
    year: "Selon disponibilité",
    status: "Neuf / importé",
    availability: "Disponible",
    colors: ["Blanc", "Gris", "Beige sable"],
    options: ["Bâche", "Hard-top", "Aménagement benne", "Gyrophare chantier"],
    priceIndicative: "Sur devis",
    mainImage: "/images/pickup-main.jpg",
    gallery: ["/images/construction-site.jpg", "/images/pickup-main.jpg"],
    images360Path: "/vehicles/pickup-professionnel/360/",
    frames360: 36,
    use360Placeholder: true,
    ratings: { usageMine: 4, usageRoute: 4, robustesse: 4, confort: 3, vip: 2 },
  } as Vehicle),

  base({
    id: "suv-4x4",
    name: "SUV 4x4 tout-terrain",
    category: "SUV 4x4",
    tags: ["4x4", "SUV", "Flotte entreprise", "Sur commande", "Neuf"],
    tagline: "Mobilité robuste pour entreprises et missions.",
    description:
      "SUV tout-terrain polyvalent pour le transport de personnel, les déplacements professionnels et les missions sur routes difficiles.",
    recommendedFor: ["Entreprises", "Route", "Missions terrain"],
    transmission: "4x4",
    seats: "5 à 7 places",
    fuel: "Diesel / Essence (indicatif)",
    loadCapacity: "SUV polyvalent",
    consumption: "Indicative — selon version",
    tank: "Selon version",
    year: "Selon disponibilité",
    status: "Neuf / importé",
    availability: "Sur commande",
    colors: ["Blanc", "Gris anthracite", "Noir"],
    options: ["Multimédia", "Barres de toit", "Pack tout-terrain"],
    priceIndicative: "Sur devis",
    mainImage: "/images/suv-main.jpg",
    gallery: ["/images/land-cruiser-field.jpg", "/images/suv-main.jpg"],
    images360Path: "/vehicles/suv-4x4/360/",
    frames360: 36,
    use360Placeholder: true,
    ratings: { usageMine: 3, usageRoute: 5, robustesse: 4, confort: 4, vip: 4 },
  } as Vehicle),

  base({
    id: "vehicule-mission",
    name: "Véhicule de mission",
    category: "Véhicule de mission",
    tags: ["4x4", "Véhicule minier", "Véhicule de chantier", "Sur commande"],
    tagline: "Configuré pour les opérations exigeantes sur site.",
    description:
      "Véhicule préparé pour les missions spécifiques : aménagements terrain, équipements de sécurité et configurations adaptées aux exploitations minières et industrielles.",
    recommendedFor: ["Mines", "BTP", "Énergie", "Missions spéciales"],
    transmission: "4x4",
    seats: "Selon configuration",
    fuel: "Diesel (indicatif)",
    loadCapacity: "Aménagement sur mesure",
    consumption: "Indicative — selon version",
    tank: "Grande autonomie (selon version)",
    year: "Selon configuration",
    status: "Neuf / importé / aménagé",
    availability: "Sur commande",
    colors: ["Blanc", "Beige sable", "Selon flotte"],
    options: ["Treuil", "Kit sécurité", "Communication", "Marquage flotte", "Snorkel"],
    priceIndicative: "Sur devis",
    mainImage: "/images/mission-main.jpg",
    gallery: ["/images/mining-site.jpg", "/images/mission-main.jpg"],
    images360Path: "/vehicles/vehicule-mission/360/",
    frames360: 36,
    use360Placeholder: true,
    ratings: { usageMine: 5, usageRoute: 3, robustesse: 5, confort: 3, vip: 2 },
  } as Vehicle),

  base({
    id: "flotte-entreprise",
    name: "Véhicule de flotte entreprise",
    category: "Flotte entreprise",
    tags: ["4x4", "Pick-up", "SUV", "Flotte entreprise", "Sur commande"],
    tagline: "Des flottes cohérentes, gérées de bout en bout.",
    description:
      "Constitution et renouvellement de flottes pour entreprises et institutions : sourcing, harmonisation, marquage et mise à disposition coordonnée.",
    recommendedFor: ["Entreprises", "Institutions", "Projets industriels"],
    transmission: "4x4 / 4x2 (selon besoin)",
    seats: "Selon flotte",
    fuel: "Diesel / Essence (indicatif)",
    loadCapacity: "Mixte selon flotte",
    consumption: "Indicative — selon version",
    tank: "Selon version",
    year: "Selon programme",
    status: "Neuf / importé",
    availability: "Sur commande",
    colors: ["Personnalisable (charte entreprise)"],
    options: ["Marquage / covering", "Gestion de flotte", "Maintenance", "Géolocalisation"],
    priceIndicative: "Sur devis",
    mainImage: "/images/fleet-main.jpg",
    gallery: ["/images/hilux-fleet.jpg", "/images/logistics-truck.jpg"],
    images360Path: "/vehicles/flotte-entreprise/360/",
    frames360: 36,
    use360Placeholder: true,
    ratings: { usageMine: 4, usageRoute: 4, robustesse: 4, confort: 4, vip: 3 },
  } as Vehicle),
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === slug);
}
