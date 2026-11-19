import { Activity } from "lucide-react";

export default function ModelPerformance() {
  const metrics = [
    { label: "Accuracy", value: "93.0%" },
    { label: "ROC-AUC", value: "0.9615" },
    { label: "Precision", value: "98.37%" },
    { label: "Recall", value: "55.35%" },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-lg shadow-gray-200/40 rounded-3xl p-6 space-y-4">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-red-600" />
          Model Performance
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md">
          Random Forest
        </span>
      </div>

      {/* 2x2 Grid Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-gray-50/90 p-3.5 rounded-2xl border border-gray-100 text-center"
          >
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {m.label}
            </div>
            <div className="text-lg font-extrabold text-gray-900 mt-0.5">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-[11px] text-gray-400 font-semibold text-center pt-1">
        Final model test metrics
      </div>
    </div>
  );
}
