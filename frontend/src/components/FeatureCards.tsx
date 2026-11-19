import { HeartPulse, Cpu, Zap } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      title: "Clinical & Lifestyle Data",
      description:
        "Uses demographic, medical, and lifestyle indicators such as age, blood pressure, cholesterol, smoking status, BMI, and glucose.",
      icon: HeartPulse,
    },
    {
      title: "Machine Learning Powered",
      description:
        "Uses a trained Random Forest classification model to estimate 10-year CHD risk.",
      icon: Cpu,
    },
    {
      title: "Instant Results",
      description:
        "Receive a predicted class and model-estimated risk probability after submitting your health information.",
      icon: Zap,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-red-600 mb-3">
            System Highlights
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Key Features & Capabilities
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Engineered using machine-learning algorithms to process comprehensive
            health indicators efficiently.
          </p>
        </div>

        {/* 3 Responsive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-9 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-7 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-xs border border-red-100/80">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
