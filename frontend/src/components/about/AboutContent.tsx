"use client";

import {
  BarChart3,
  Cpu,
  TrendingUp,
  FileText,
  Wrench,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Database,
  Users,
  Activity,
  BarChart,
  Shield,
  Layers,
  Code2,
} from "lucide-react";

export default function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* -------------------------------------------------- */}
      {/* PAGE HEADER */}
      {/* -------------------------------------------------- */}
      <div className="text-center space-y-3 pt-2 sm:pt-4">
        {/* Live Heart Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/90 shadow-xs mb-1">
          <div className="relative flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-600 fill-red-600 animate-heartbeat" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-xs font-extrabold tracking-wider uppercase text-gray-800">
            Live Clinical AI Model · IT3051 Methodology
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          About Our <span className="text-red-600">Methodology</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Understanding the data, preprocessing, and machine-learning approach behind
          the HeartWise 10-year CHD risk prediction system.
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* CARD 1 — 📊 Dataset & Features */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Dataset & Features
          </h2>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
          HeartWise uses the Kaggle Cardiovascular Dataset.
        </p>

        {/* Dataset Stats Bullets / Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 font-medium">
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>Approximately 11,000 original records</span>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>16 original columns</span>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>Target: <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-bold text-gray-900">TenYearCHD</code></span>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>361 rows with missing target values removed</span>
          </div>
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 sm:col-span-2 flex items-center gap-2 font-bold text-red-950">
            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>Final labelled dataset: 10,639 records</span>
          </div>
        </div>

        {/* Target & Class Distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs sm:text-sm">
            <h3 className="font-bold text-gray-900 text-sm">Target Definition</h3>
            <ul className="space-y-1 text-gray-700">
              <li><strong className="text-gray-900">0</strong> = No CHD within 10 years</li>
              <li><strong className="text-gray-900">1</strong> = CHD within 10 years</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs sm:text-sm">
            <h3 className="font-bold text-gray-900 text-sm">Class Distribution</h3>
            <ul className="space-y-1 text-gray-700">
              <li><strong className="text-gray-900">84.65%</strong> Class 0</li>
              <li><strong className="text-gray-900">15.35%</strong> Class 1</li>
            </ul>
          </div>
        </div>

        {/* 15 Input Features Grouped */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-gray-900 text-sm">Final 15 Input Features</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="font-bold text-red-600 text-xs uppercase tracking-wider">Demographics</h4>
              <ul className="space-y-1 text-gray-700 font-medium">
                <li>• Age</li>
                <li>• Gender</li>
                <li>• Education Level</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="font-bold text-red-600 text-xs uppercase tracking-wider">Lifestyle</h4>
              <ul className="space-y-1 text-gray-700 font-medium">
                <li>• Current Smoker</li>
                <li>• Cigarettes Per Day</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="font-bold text-red-600 text-xs uppercase tracking-wider">Medical History</h4>
              <ul className="space-y-1 text-gray-700 font-medium">
                <li>• BP Medication</li>
                <li>• Previous Stroke</li>
                <li>• Hypertension</li>
                <li>• Diabetes</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="font-bold text-red-600 text-xs uppercase tracking-wider">Clinical Measurements</h4>
              <ul className="space-y-1 text-gray-700 font-medium">
                <li>• Total Cholesterol</li>
                <li>• Systolic BP</li>
                <li>• Diastolic BP</li>
                <li>• BMI</li>
                <li>• Heart Rate</li>
                <li>• Glucose</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CARD 2 — 🤖 Machine Learning Model */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Machine Learning Model
          </h2>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
          Four models were evaluated during the data mining phase:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs sm:text-sm font-bold text-gray-800">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">Logistic Regression</div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">Decision Tree</div>
          <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200">Random Forest</div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">SVM</div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            Random Forest gave the strongest overall performance and was selected for further optimization.
          </p>
          <p>
            Decision Tree had the highest baseline recall.
          </p>
        </div>

        {/* Small Light-Gray Inner Box: Final Random Forest Settings */}
        <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Final Random Forest</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-gray-800">
            <div className="p-2.5 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-sans">n_estimators</span>
              <span className="font-bold text-gray-900 text-sm">200</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-sans">max_depth</span>
              <span className="font-bold text-gray-900 text-sm">None</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-sans">min_samples_split</span>
              <span className="font-bold text-gray-900 text-sm">2</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-sans">min_samples_leaf</span>
              <span className="font-bold text-gray-900 text-sm">1</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CARD 3 — 📈 Final Model Performance */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Final Model Performance
          </h2>
        </div>

        {/* 5 Simple Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <div className="text-[10px] font-bold uppercase text-gray-400">Accuracy</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">93.00%</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <div className="text-[10px] font-bold uppercase text-gray-400">Precision</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">98.37%</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <div className="text-[10px] font-bold uppercase text-gray-400">Recall</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">55.35%</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <div className="text-[10px] font-bold uppercase text-gray-400">F1-score</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">70.84%</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] font-bold uppercase text-gray-400">ROC-AUC</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">96.15%</div>
          </div>
        </div>

        {/* Confusion Matrix Numbers */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm uppercase tracking-wider text-gray-500">
            Confusion Matrix Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-500 block font-semibold">True Negatives</span>
              <span className="text-lg font-bold text-gray-900 mt-0.5 block">1798</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-500 block font-semibold">False Positives</span>
              <span className="text-lg font-bold text-gray-900 mt-0.5 block">3</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-500 block font-semibold">False Negatives</span>
              <span className="text-lg font-bold text-gray-900 mt-0.5 block">146</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <span className="text-gray-500 block font-semibold">True Positives</span>
              <span className="text-lg font-bold text-gray-900 mt-0.5 block">181</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          The final tuned Random Forest without pulsePressure was selected as the final model.
        </p>
      </section>

      {/* -------------------------------------------------- */}
      {/* CARD 4 — 📋 Model Card */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Model Card
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-700">
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 text-sm">Intended Use</h3>
            <p className="leading-relaxed">
              HeartWise is an educational machine-learning project developed to demonstrate 10-year CHD risk prediction.
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <h3 className="font-bold text-gray-900 text-sm">Limitations</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                <span>The dataset is imbalanced.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                <span>The model may not generalize equally to all populations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                <span>False negatives still occur.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                <span>The model has not undergone clinical validation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                <span>The prediction threshold is 0.5.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-1 pt-2">
            <h3 className="font-bold text-gray-900 text-sm">Disclaimer</h3>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium leading-relaxed">
              This system is for educational and research purposes only. It is not a medical diagnosis and must not replace professional medical advice.
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CARD 5 — 🔧 Technical Implementation */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Technical Implementation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Column 1: Technology Stack */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
              Technology Stack
            </h3>

            <div className="space-y-2">
              <div>
                <span className="font-bold text-gray-900 block text-xs">Frontend:</span>
                <ul className="text-gray-600 pl-2 space-y-0.5 mt-0.5">
                  <li>• Next.js</li>
                  <li>• React</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-gray-900 block text-xs">Backend:</span>
                <ul className="text-gray-600 pl-2 space-y-0.5 mt-0.5">
                  <li>• FastAPI</li>
                  <li>• Python</li>
                  <li>• Pydantic</li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-gray-900 block text-xs">Machine Learning:</span>
                <ul className="text-gray-600 pl-2 space-y-0.5 mt-0.5">
                  <li>• scikit-learn</li>
                  <li>• pandas</li>
                  <li>• joblib</li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-gray-900 block text-xs">Development:</span>
                <ul className="text-gray-600 pl-2 space-y-0.5 mt-0.5">
                  <li>• Databricks</li>
                  <li>• GitHub</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: System Flow */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
              System Flow
            </h3>

            <div className="space-y-2 font-medium text-gray-800">
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">User Input</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">Next.js Frontend</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">FastAPI Backend</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">Input Validation & Encoding</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">Random Forest Model</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">Prediction + Probability</div>
              <div className="text-center text-red-600 font-bold">↓</div>
              <div className="p-2.5 rounded-lg bg-red-50 text-red-700 font-bold border border-red-200">Result Display</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
