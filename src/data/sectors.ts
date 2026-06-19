/** "Secteurs servis" — strategic sectors TTS supports. */

export type Sector = {
  id: string;
  name: string;
  text: string;
  image: string;
};

export const sectors: Sector[] = [
  {
    id: "mines",
    name: "Mines",
    text: "Équipements, mobilité et logistique pour les groupes miniers et leurs sous-traitants.",
    image: "/images/mining-site.jpg",
  },
  {
    id: "btp",
    name: "BTP",
    text: "Support matériel et logistique pour les chantiers et projets d’infrastructure.",
    image: "/images/construction-site.jpg",
  },
  {
    id: "energie",
    name: "Énergie",
    text: "Citernes, cuves et solutions de stockage pour carburant, gaz et énergie.",
    image: "/images/fuel-tank.jpg",
  },
  {
    id: "transport",
    name: "Transport",
    text: "Solutions de mobilité et de transport professionnel pour les entreprises.",
    image: "/images/logistics-truck.jpg",
  },
  {
    id: "institutions",
    name: "Institutions",
    text: "Réponses fiables pour les institutions, administrations et organisations internationales.",
    image: "/images/land-cruiser-field.jpg",
  },
  {
    id: "industrie",
    name: "Projets industriels",
    text: "Accompagnement des entreprises privées et des grands projets industriels.",
    image: "/images/tank-storage.jpg",
  },
];
