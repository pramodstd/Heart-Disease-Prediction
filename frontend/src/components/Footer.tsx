import { AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/80">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand & Subtitle Header */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-2xl text-gray-900 tracking-tight">
            Heart <span className="text-red-600">Wise</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            10-Year Coronary Heart Disease Risk Assessment Tool
          </p>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full max-w-4xl border-t border-gray-200/80 my-6" />

        {/* Centered Disclaimer */}
        <div className="max-w-4xl text-xs sm:text-sm text-gray-600 leading-relaxed px-4">
          <span className="inline-flex items-center gap-1 font-bold text-red-600 mr-1.5 align-baseline">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 inline-block mb-0.5" />
            <span>Important Disclaimer:</span>
          </span>
          <span>
            This tool is for educational and research purposes only. It is NOT intended as medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.
          </span>
        </div>

        {/* Copyright Subtext */}
        <div className="text-xs text-gray-400 font-medium mt-4">
          © {new Date().getFullYear()} Heart Wise. Built with Random Forest ML model for research purposes.
        </div>

      </div>
    </footer>
  );
}
