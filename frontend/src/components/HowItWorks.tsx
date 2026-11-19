import { ClipboardList, Binary, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Data",
      description:
        "Provide the required demographic, clinical, and lifestyle information.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Model Analysis",
      description:
        "The information is validated and processed before being analyzed by our trained Random Forest model.",
      icon: Binary,
    },
    {
      number: "03",
      title: "View Your Result",
      description:
        "Receive your personalized 10-year CHD risk probability with detailed breakdown and risk classification.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50/70 px-4 sm:px-6 lg:px-8 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-red-600 mb-3">
            Workflow Process
          </h2>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            A simple 3-step process to generate an educational risk assessment.
          </p>
        </div>

        {/* 3 Numbered Steps Grid (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col items-start"
              >
                {/* Step Number & Icon Header */}
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-red-600/20">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
