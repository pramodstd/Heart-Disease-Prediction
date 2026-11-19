import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureCards />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
