/**
 * "Nos activités" cards. `icon` is a key resolved to a lucide-react icon in
 * the Activities section component. `image` points to a real photo once added.
 */

export type Activity = {
  id: string;
  icon:
    | "truck"
    | "wrench"
    | "route"
    | "hardhat"
    | "fuel"
    | "mountain";
  title: string;
  text: string;
  image: string;
};

export const activities: Activity[] = [
  {
    id: "vehicules",
    icon: "truck",
    title: "Véhicules 4x4 & flottes professionnelles",
    text: "Pick-up, SUV et 4x4 robustes, sélectionnés pour les routes difficiles, les sites miniers et les missions terrain.",
    image: "/images/hilux-fleet.jpg",
  },
  {
    id: "location",
    icon: "wrench",
    title: "Location d’équipements",
    text: "Location de 4x4, d’engins et de véhicules pour vos projets miniers, chantiers, missions et opérations logistiques.",
    image: "/images/land-cruiser-field.jpg",
  },
  {
    id: "logistique",
    icon: "route",
    title: "Logistique & transport",
    text: "Transport de marchandises, logistique minière et acheminement d’équipements partout en Guinée et en Afrique de l’Ouest.",
    image: "/images/logistics-truck.jpg",
  },
  {
    id: "btp",
    icon: "hardhat",
    title: "BTP & infrastructures",
    text: "Accompagnement de projets de construction et de travaux publics avec des solutions matérielles adaptées aux chantiers.",
    image: "/images/construction-site.jpg",
  },
  {
    id: "citernes",
    icon: "fuel",
    title: "Réservoirs, cuves & citernes LPG",
    text: "Citernes carburant, eau et LPG/GPL, réservoirs et cuves de stockage pour l’énergie, le gaz et l’industrie.",
    image: "/images/lpg-tanker.jpg",
  },
  {
    id: "mines",
    icon: "mountain",
    title: "Solutions minières & industrielles",
    text: "Une offre globale pour les mines, l’énergie et les projets industriels : matériel, mobilité et approvisionnement.",
    image: "/images/mining-site.jpg",
  },
];
