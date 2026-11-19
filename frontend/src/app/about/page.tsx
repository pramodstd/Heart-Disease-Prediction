import Navbar from "@/components/Navbar";
import AboutContent from "@/components/about/AboutContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Our Methodology | HeartWise Risk Assessment Tool",
  description:
    "Understanding the data, preprocessing, and machine-learning approach behind the HeartWise 10-year CHD risk prediction system.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100/90 via-gray-50/80 to-rose-50/40 text-gray-900 selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Decorative ambient glass glowing background elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-slate-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Live ECG Heart Rhythm Waveform Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
        <svg
          className="w-full max-w-7xl h-48 sm:h-64 text-red-600"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100 L350 100 L370 70 L390 130 L410 30 L430 170 L450 85 L470 115 L490 100 L750 100 L770 70 L790 130 L810 30 L830 170 L850 85 L870 115 L890 100 L1200 100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          <circle cx="410" cy="30" r="5" fill="#dc2626" className="animate-ping" />
          <circle cx="810" cy="30" r="5" fill="#dc2626" className="animate-ping" />
        </svg>
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 w-full">
        <AboutContent />
      </main>

      <Footer />
    </div>
  );
}
