import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-rose-700 py-7 px-6 sm:py-9 sm:px-10 text-center text-white shadow-lg shadow-red-600/20">
          
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Activity className="w-3.5 h-3.5" />
              <span>Take Assessment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Check Your Predicted Risk?
            </h2>

            <p className="mt-2 text-sm sm:text-base text-red-100 max-w-2xl mx-auto leading-relaxed">
              Complete the risk assessment form to receive an educational
              10-year CHD risk prediction.
            </p>

            <div className="mt-5">
              <Link
                href="/predictor"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 text-sm sm:text-base font-bold text-red-700 bg-white hover:bg-red-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Start Risk Assessment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
