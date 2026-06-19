# Vues 360° des véhicules

Chaque véhicule peut afficher une rotation 360° à partir d’une **séquence
d’images**. Tant qu’aucune image réelle n’est fournie, un **tour de plateau
synthétique** (silhouette qui pivote au glissement) est affiché — l’interaction
est donc déjà pleinement démontrable.

## Structure attendue

```
public/vehicles/<id>/360/01.jpg
public/vehicles/<id>/360/02.jpg
...
public/vehicles/<id>/360/36.jpg
```

`<id>` correspond à l’`id` du véhicule dans `src/data/vehicles.ts`, par exemple :

```
public/vehicles/hilux/360/01.jpg          → ⚠️ voir note
public/vehicles/toyota-hilux/360/01.jpg
public/vehicles/toyota-land-cruiser/360/01.jpg
public/vehicles/toyota-prado/360/01.jpg
```

> **Note :** le chemin réellement utilisé est la valeur `images360Path` du
> véhicule. Adaptez soit vos dossiers, soit `images360Path` pour qu’ils
> correspondent.

## Activer les vraies photos 360°

1. Placez **24 à 36 images** par véhicule (numérotées `01.jpg`, `02.jpg`, …),
   prises à intervalle d’angle régulier autour du véhicule.
2. Dans `src/data/vehicles.ts`, passez `use360Placeholder: false` pour ce véhicule.
3. C’est tout : le viewer charge alors `images360Path + "01.jpg"`, etc.

Plus il y a d’images (36 recommandé), plus la rotation est fluide.

## Option 3D (.glb / .gltf)

Voir `public/models/README.md`.
