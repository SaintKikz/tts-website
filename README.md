# TTS — Transatlantic Trade & Services

Site vitrine **premium, cinématique et responsive** pour TTS, acteur des
secteurs **minier, BTP, logistique, transport, énergie et services aux
entreprises** en Guinée et en Afrique de l’Ouest.

Construit avec **Next.js (App Router) · TypeScript · Tailwind CSS · Framer
Motion · React Three Fiber**.

---

## ✨ Fonctionnalités

- **Hero cinématique** : titre révélé ligne par ligne, fond en zoom/parallax, compteurs animés.
- **Scroll narratif** : À propos → Activités → Flotte → Catalogue → Citernes → Secteurs → Pourquoi TTS → Process → Galerie → Contact.
- **Catalogue véhicules type concessionnaire** :
  - **Vue 360°** par séquence d’images **ou** plateau synthétique en attendant les vraies photos.
  - **Viewer 3D** optionnel (`.glb`) chargé à la demande (React Three Fiber).
  - **Fiche détaillée** (modal plein écran **et** page dédiée `/vehicles/<id>`).
  - **Comparateur** de 2–3 véhicules avec notes par usage.
  - **Filtres** (4x4, Pick-up, SUV, minier, chantier, flotte, disponibilité, état…).
- **Formulaire de contact intelligent** : se **pré-remplit** automatiquement avec le véhicule sélectionné (devis, fiche technique, rappel, WhatsApp).
- **Accessibilité & performance** : `prefers-reduced-motion` respecté, focus visibles, contrastes AA, images en lazy-load, code 3D en import dynamique.

---

## 🚀 Démarrage

> Prérequis : **Node.js 18.18+** (recommandé 20+).

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000

### Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | Analyse ESLint |

---

## 🗂️ Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Polices, métadonnées, Navbar/Footer, QuoteProvider
│   ├── page.tsx            # Assemble toutes les sections (ordre cinématique)
│   ├── globals.css         # Tokens de design (couleurs, etc.) + base
│   ├── not-found.tsx       # Page 404
│   └── vehicles/[slug]/    # Page détaillée par véhicule (SSG)
├── components/
│   ├── layout/             # Navbar (sticky → sombre), Footer
│   ├── sections/           # Hero, About, Activities, Fleet, Tanks, Sectors, WhyTTS, Process, Gallery, Contact
│   ├── vehicles/           # Vehicle360Viewer, VehicleModel3D, VehicleCard, VehicleCatalog, VehicleComparator, VehicleDetailsModal, VehicleDetailView
│   └── ui/                 # Reveal, AnimatedHeading, Counter, Button, Section, PlaceholderImage
├── context/QuoteContext.tsx # Pré-remplissage du formulaire depuis une fiche véhicule
├── data/                   # ⚙️ Contenu éditable : vehicles.ts, site.ts, activities.ts, sectors.ts
└── lib/                    # motion.ts (presets d’animation), utils.ts
public/
├── images/                 # Visuels (voir images/README.md)
├── vehicles/<id>/360/      # Séquences 360° (voir vehicles/README.md)
└── models/                 # Modèles 3D .glb (voir models/README.md)
```

---

## ✏️ Modifier le contenu

Tout le contenu éditorial vit dans **`src/data/`** — aucun composant à toucher :

- **`site.ts`** — coordonnées (téléphone, **WhatsApp**, email, localisation), navigation, chiffres clés, avantages, étapes du process, galerie.
- **`vehicles.ts`** — catalogue véhicules (specs, usages, 360°, 3D, notes du comparateur).
- **`activities.ts`** / **`sectors.ts`** — cartes des activités et secteurs.

> ⚠️ **Coordonnées à remplacer** : les champs `phoneDisplay`, `whatsappDigits`
> et `email` dans `src/data/site.ts` sont des **placeholders**.

---

## 🖼️ Remplacer les images placeholder

Les visuels sont des **placeholders premium** générés en CSS/SVG. Pour mettre
vos vraies photos : **déposez simplement le fichier** au bon chemin dans
`/public` — il apparaît automatiquement (fondu enchaîné), sans modifier le code.

➡️ Liste des noms de fichiers attendus : **`public/images/README.md`**.

---

## 🔄 Activer la vue 360° réelle

1. Ajoutez 24–36 images par véhicule dans `public/vehicles/<id>/360/01.jpg…`.
2. Passez `use360Placeholder: false` pour ce véhicule dans `src/data/vehicles.ts`.

➡️ Détails : **`public/vehicles/README.md`**.

---

## 🧊 Activer la 3D (.glb)

1. Déposez `public/models/<id>.glb`.
2. Renseignez `model3dPath: "/models/<id>.glb"` sur le véhicule.

Un onglet **« 3D »** apparaît alors dans le viewer. Le code 3D est chargé en
**import dynamique** (aucun impact sur le poids initial).

➡️ Détails : **`public/models/README.md`**.

---

## 🎨 Direction artistique

| Token | Valeur | Rôle |
|---|---|---|
| `--background` | `#0A0B0D` | Noir profond |
| `--surface` / `--surface-2` | `#121419` / `#1A1D24` | Gris anthracite |
| `--sand` | `#C9A86A` | Accent principal (sable / doré) |
| `--petrol` | `#106E66` | Accent secondaire (bleu pétrole) |
| `--energy` | `#DC2626` | Accent rare (énergie / industrie) |

Couleurs définies dans `src/app/globals.css` et exposées à Tailwind
(`bg-sand`, `text-petrol`, etc.). **Typographies** : Space Grotesk (titres) +
Inter (texte), via `next/font`.

---

## 🌍 Version anglaise (plus tard)

Le contenu étant centralisé dans `src/data/` et les composants, une
internationalisation (ex. `next-intl`) pourra être ajoutée en externalisant les
chaînes. La structure s’y prête déjà.

---

## 📦 Connecter le formulaire de contact

Le formulaire ouvre actuellement le **client mail** de l’utilisateur (mailto)
avec les champs pré-remplis. Pour un envoi serveur, branchez `onSubmit` dans
`src/components/sections/Contact.tsx` à un service (Resend, Formspree, une API
route Next, etc.).
