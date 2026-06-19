# Images — dossier des visuels

Déposez ici les **vraies photos** (JPG/WebP). Tant qu’un fichier est absent, un
**placeholder premium** s’affiche automatiquement à sa place (aucune
modification de code nécessaire — voir `src/components/ui/PlaceholderImage.tsx`).

## Fichiers attendus (noms exacts)

| Fichier | Utilisé dans |
|---|---|
| `hero-mining-road.jpg` | Hero (arrière-plan plein écran) |
| `mining-site.jpg` | À propos, Activités, Secteurs, Galerie |
| `hilux-fleet.jpg` | Activités, Galerie, Flotte |
| `land-cruiser-field.jpg` | Flotte, Secteurs, Galerie |
| `prado-road.jpg` | Catalogue (Prado) |
| `fuel-tank.jpg` | Citernes, Secteurs, Galerie |
| `lpg-tanker.jpg` | Citernes, Galerie |
| `logistics-truck.jpg` | Activités, Secteurs, Galerie |
| `construction-site.jpg` | Activités, Secteurs, Galerie |
| `tank-storage.jpg` | Secteurs, Galerie |

### Images principales des véhicules (catalogue + fiches)

`hilux-main.jpg`, `land-cruiser-main.jpg`, `prado-main.jpg`,
`pickup-main.jpg`, `suv-main.jpg`, `mission-main.jpg`, `fleet-main.jpg`

> Les chemins sont définis dans `src/data/vehicles.ts` (`mainImage`, `gallery`)
> et `src/data/site.ts`. Vous pouvez les renommer librement à condition de
> mettre à jour ces fichiers de données.

## Recommandations

- Format **WebP** ou **JPG** optimisé, largeur 1600–2400px pour les grands visuels.
- Le hero gagne à être une image large et sombre (lisibilité du texte en surimpression).
