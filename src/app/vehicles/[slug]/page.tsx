import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicleBySlug, vehicles } from "@/data/vehicles";
import { VehicleDetailView } from "@/components/vehicles/VehicleDetailView";

type Params = { params: { slug: string } };

/** Pre-render a static page per vehicle. */
export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const vehicle = getVehicleBySlug(params.slug);
  if (!vehicle) return { title: "Véhicule introuvable" };
  return {
    title: `${vehicle.name} — ${vehicle.category}`,
    description: `${vehicle.tagline} ${vehicle.description}`,
  };
}

export default function VehiclePage({ params }: Params) {
  const vehicle = getVehicleBySlug(params.slug);
  if (!vehicle) notFound();
  return <VehicleDetailView vehicle={vehicle} />;
}
