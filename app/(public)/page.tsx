import { DestinationsSection } from "@/components/landing/DestinationsSection";
import { FeaturedHotels } from "@/components/landing/FeaturedHotels";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { SearchSection } from "@/components/landing/SearchSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SearchSection />
      <FeaturedHotels />
      <DestinationsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
