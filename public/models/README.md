# Modèles 3D (.glb / .gltf)

Option avancée : afficher un **vrai modèle 3D** dans le viewer (onglet « 3D »),
via React Three Fiber.

## Activer la 3D pour un véhicule

1. Déposez le modèle ici, par exemple :
   ```
   public/models/hilux.glb
   public/models/land-cruiser.glb
   public/models/prado.glb
   ```
2. Dans `src/data/vehicles.ts`, renseignez `model3dPath` sur le véhicule :
   ```ts
   model3dPath: "/models/hilux.glb",
   ```
3. Un onglet **« 3D »** apparaît automatiquement dans `Vehicle360Viewer`.

Tant qu’aucun fichier `.glb` n’est présent, un **bloc 3D de remplacement**
tourne à la place (le composant ne casse jamais). Le code 3D
(`src/components/vehicles/VehicleModel3D.tsx`) n’est chargé que lorsque
l’utilisateur ouvre l’onglet 3D (import dynamique → pas d’impact sur le poids
initial de la page).

## Conseils

- Préférez le format **`.glb`** (binaire, plus léger).
- Optimisez le modèle (Draco / meshopt) pour le web.
- Échelle et position se règlent dans `VehicleModel3D.tsx` (`scale`, `position`).
