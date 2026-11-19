"use client";

import { useState } from "react";
import { Clock, ShieldAlert, ShieldCheck, Info, Loader2, BarChart3, HeartHandshake } from "lucide-react";

export interface PredictionResult {
  prediction: number;
  probability: number;
  percentage: number;
  result_message?: string;
  result?: string;
  disclaimer: string;
}

interface RiskResultCardProps {
  result: PredictionResult | null;
  isLoading: boolean;
  apiError: string | null;
}

export default function RiskResultCard({
  result,
  isLoading,
  apiError,
}: RiskResultCardProps) {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState<boolean>(true);

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-xl shadow-gray-200/50 rounded-3xl p-6 sm:p-7 text-center space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <span className="text-xs uppercase font-extrabold tracking-widest text-red-600">
          Risk Estimate
        </span>
        <span className="text-xs text-gray-400 font-semibold">
          10-year horizon
        </span>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-12 space-y-4">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-gray-800">Evaluating Patient Profile...</p>
          <p className="text-xs text-gray-400">Running Random Forest Inference</p>
        </div>
      ) : apiError ? (
        /* Error State */
        <div className="py-8 px-4 bg-red-50/80 border border-red-200 rounded-2xl space-y-3">
          <ShieldAlert className="w-10 h-10 text-red-600 mx-auto" />
          <h4 className="text-sm font-bold text-red-900">Service Alert</h4>
          <p className="text-xs text-red-700 font-medium leading-relaxed">
            {apiError}
          </p>
        </div>
      ) : !result ? (
        /* Empty State (Before Prediction) */
        <div className="py-6 space-y-6">
          {/* Dashed Circular Gauge with Clock Icon */}
          <div className="w-36 h-36 rounded-full border-2 border-dashed border-gray-300 mx-auto flex items-center justify-center p-4">
            <Clock className="w-10 h-10 text-gray-300 stroke-[1.5]" />
          </div>

          <p className="text-xs sm:text-sm font-medium text-gray-500 leading-relaxed max-w-xs mx-auto">
            Complete the intake and select <span className="font-bold text-gray-900">Assess risk</span> to generate a 10-year CHD probability.
          </p>
        </div>
      ) : (
        /* Result State (After Prediction) */
        <div className="space-y-5 animate-fade-in text-left">
          
          {/* Circular SVG Probability Gauge */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="9"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="9"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * Math.min(Math.max(result.percentage, 0), 100)) / 100}
                strokeLinecap="round"
                fill="transparent"
                className={`transition-all duration-1000 ease-out ${
                  result.prediction === 1 ? "text-red-600" : "text-emerald-500"
                }`}
              />
            </svg>

            {/* Inner Circular Percentage Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {Math.round(result.percentage)}%
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-gray-400 mt-0.5">
                10-YEAR PROBABILITY
              </span>
            </div>
          </div>

          {/* Readable Result Message */}
          <div className="text-center space-y-2">
            <p className="text-base font-extrabold text-gray-900">
              {result.prediction === 1
                ? "Higher predicted 10-year CHD risk"
                : "Lower predicted 10-year CHD risk"}
            </p>
          </div>

          {/* PERSONALIZED HEALTH MESSAGE BOX (Matching reference layout) */}
          <div
            className={`p-4 rounded-2xl border space-y-1 shadow-2xs ${
              result.prediction === 1
                ? "bg-amber-50/80 border-amber-200 text-amber-900"
                : "bg-emerald-50/80 border-emerald-200 text-emerald-900"
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <HeartHandshake className={`w-4 h-4 ${result.prediction === 1 ? 'text-amber-600' : 'text-emerald-600'}`} />
              <span>
                {result.prediction === 1
                  ? "Elevated Cardiovascular Risk Profile"
                  : "Your heart health looks good!"}
              </span>
            </div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed pl-6">
              {result.prediction === 1
                ? "Consider reviewing your vitals and consulting a healthcare professional for personalized guidance."
                : "Keep up the healthy habits — small wins add up."}
            </p>
          </div>

          {/* SEE ADVANCED DETAILS TOGGLE SWITCH CARD (Matching reference switch style) */}
          <div className="bg-white border border-red-100/90 p-4 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  See advanced details
                </span>
                <span className="text-[11px] text-gray-500 font-medium leading-snug block">
                  View exact probability, risk metrics, and model information.
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-hidden ${
                showAdvancedDetails ? "bg-red-600" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={showAdvancedDetails}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-xs ${
                  showAdvancedDetails ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Result Details Breakdown Table (Visible when Toggle Switch is ON) */}
          {showAdvancedDetails && (
            <div className="bg-gray-50/90 rounded-2xl border border-gray-100 p-4 space-y-2.5 text-xs animate-fade-in">
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-semibold text-gray-500">Probability of CHD</span>
                <span className="font-bold text-gray-900">{result.percentage.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-semibold text-gray-500">Predicted Class</span>
                <span className="font-bold text-gray-900">{result.prediction}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-semibold text-gray-500">Decision Threshold</span>
                <span className="font-bold text-gray-900">0.500</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-semibold text-gray-500">Model</span>
                <span className="font-bold text-gray-900">Tuned Random Forest</span>
              </div>
            </div>
          )}

          {/* Disclaimers */}
          <div className="space-y-2 text-left pt-2">
            <p className="text-[11px] text-gray-500 leading-relaxed flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{result.disclaimer}</span>
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5 pl-5">
              <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>This result is generated by a machine-learning model and should not replace professional medical advice.</span>
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
