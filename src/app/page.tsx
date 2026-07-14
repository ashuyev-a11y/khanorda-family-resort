import { CalculatorProvider } from "@/context/CalculatorContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import OneDay from "@/components/OneDay";
import Calculator from "@/components/Calculator";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <CalculatorProvider>
      <Header />
      <main>
        <Hero />
        <Included />
        <OneDay />
        <Gallery />
        <Reviews />
        <Calculator />
        <Location />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
      <ChatWidget />
    </CalculatorProvider>
  );
}
