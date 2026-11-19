import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Activity,
  LineChart,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/90 via-gray-50/80 to-rose-50/40 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Decorative ambient glass glowing background elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-slate-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Live ECG Heart Rhythm Waveform Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none overflow-hidden">
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

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Live Heart Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/90 shadow-xs mb-8">
          <div className="relative flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-600 fill-red-600 animate-heartbeat" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-xs font-extrabold tracking-wider uppercase text-gray-800">
            Live Clinical AI Model · 10-Year CHD Assessment
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          10-Year{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
            Coronary Heart Disease
          </span>{" "}
          Risk Prediction
        </h1>

        {/* Supporting Description */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Advanced machine-learning system to assess your 10-year cardiovascular risk profile based on demographic, lifestyle, and clinical factors.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <Link
            href="/predictor"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-2xl shadow-lg shadow-red-600/30 hover:shadow-red-600/45 hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <span>Start Risk Assessment</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-xs sm:text-sm text-gray-500 font-semibold flex items-center gap-2 mt-2">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>Powered by a tuned Random Forest machine-learning model.</span>
          </p>
        </div>

        {/* Highlight Cards Preview Grid with Frosted Glass Theme */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto text-left">
          {/* Card 1 */}
          <div className="bg-white/75 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-white/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-300 flex items-center gap-5 group">
            <div className="w-16 h-16 rounded-2xl bg-red-50/90 text-red-600 border border-red-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Activity className="w-8 h-8 text-red-600 animate-pulse" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
                15 Clinical Parameters
              </div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">
                Demographic & medical factors
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/75 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-white/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-300 flex items-center gap-5 group">
            <div className="w-16 h-16 rounded-2xl bg-red-50/90 text-red-600 border border-red-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Cpu className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
                Random Forest Model
              </div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">
                93.0% Overall Accuracy
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/75 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-white/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-300 flex items-center gap-5 group">
            <div className="w-16 h-16 rounded-2xl bg-red-50/90 text-red-600 border border-red-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <LineChart className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
                Probability Scoring
              </div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">
                Class 1 Risk Percentage
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
