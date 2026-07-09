import { CalculatorProvider } from "@/context/CalculatorContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Units from "@/components/Units";
import Amenities from "@/components/Amenities";
import Calculator from "@/components/Calculator";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <CalculatorProvider>
      <Header />
      <main>
        <Hero />
        <Units />
        <Amenities />
        <Calculator />
        <Gallery />
        <Pricing />
        <Reviews />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <MobileBar />
    </CalculatorProvider>
  );
}
