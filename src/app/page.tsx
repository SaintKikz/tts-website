import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Fleet } from "@/components/sections/Fleet";
import { VehicleCatalog } from "@/components/vehicles/VehicleCatalog";
import { Tanks } from "@/components/sections/Tanks";
import { Sectors } from "@/components/sections/Sectors";
import { WhyTTS } from "@/components/sections/WhyTTS";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Fleet />
      <VehicleCatalog />
      <Tanks />
      <Sectors />
      <WhyTTS />
      <Process />
      <Gallery />
      <Contact />
    </>
  );
}
