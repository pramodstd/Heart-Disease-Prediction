"use client";

import { useState, useRef } from "react";
import {
  User,
  Activity,
  FileSpreadsheet,
  Stethoscope,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  LineChart,
} from "lucide-react";

export interface FormData {
  gender: string;
  age: string;
  education: string;
  currentSmoker: string;
  cigsPerDay: string;
  BPMeds: string;
  prevalentStroke: string;
  prevalentHyp: string;
  diabetes: string;
  totChol: string;
  sysBP: string;
  diaBP: string;
  BMI: string;
  heartRate: string;
  glucose: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
  percentage: number;
  result_message?: string;
  result?: string;
  disclaimer: string;
}

const initialFormData: FormData = {
  gender: "",
  age: "",
  education: "",
  currentSmoker: "",
  cigsPerDay: "",
  BPMeds: "",
  prevalentStroke: "",
  prevalentHyp: "",
  diabetes: "",
  totChol: "",
  sysBP: "",
  diaBP: "",
  BMI: "",
  heartRate: "",
  glucose: "",
};

export default function PredictorForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (apiError) setApiError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Personal Information Validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum <= 0) {
        newErrors.age = "Age must be a positive number.";
      }
    }

    if (!formData.education) {
      newErrors.education = "Education Level is required.";
    } else {
      const eduNum = Number(formData.education);
      if (![1, 2, 3, 4].includes(eduNum)) {
        newErrors.education = "Education must be between 1 and 4.";
      }
    }

    // 2. Lifestyle Validation
    if (!formData.currentSmoker) {
      newErrors.currentSmoker = "Current Smoker status is required.";
    }

    if (formData.cigsPerDay === "") {
      newErrors.cigsPerDay = "Cigarettes Per Day is required.";
    } else {
      const cigsNum = Number(formData.cigsPerDay);
      if (isNaN(cigsNum) || cigsNum < 0) {
        newErrors.cigsPerDay = "Cigarettes Per Day cannot be negative.";
      }
    }

    // 3. Medical History Validation
    if (!formData.BPMeds) {
      newErrors.BPMeds = "Blood Pressure Medication status is required.";
    }
    if (!formData.prevalentStroke) {
      newErrors.prevalentStroke = "Previous Stroke status is required.";
    }
    if (!formData.prevalentHyp) {
      newErrors.prevalentHyp = "Hypertension status is required.";
    }
    if (!formData.diabetes) {
      newErrors.diabetes = "Diabetes status is required.";
    }

    // 4. Clinical Measurements Validation
    if (!formData.totChol) {
      newErrors.totChol = "Total Cholesterol is required.";
    } else {
      const cholNum = Number(formData.totChol);
      if (isNaN(cholNum) || cholNum <= 0) {
        newErrors.totChol = "Total Cholesterol must be positive.";
      }
    }

    if (!formData.sysBP) {
      newErrors.sysBP = "Systolic Blood Pressure is required.";
    } else {
      const sysNum = Number(formData.sysBP);
      if (isNaN(sysNum) || sysNum <= 0) {
        newErrors.sysBP = "Systolic Blood Pressure must be positive.";
      }
    }

    if (!formData.diaBP) {
      newErrors.diaBP = "Diastolic Blood Pressure is required.";
    } else {
      const diaNum = Number(formData.diaBP);
      if (isNaN(diaNum) || diaNum <= 0) {
        newErrors.diaBP = "Diastolic Blood Pressure must be positive.";
      }
    }

    if (!formData.BMI) {
      newErrors.BMI = "BMI is required.";
    } else {
      const bmiNum = Number(formData.BMI);
      if (isNaN(bmiNum) || bmiNum <= 0) {
        newErrors.BMI = "BMI must be positive.";
      }
    }

    if (!formData.heartRate) {
      newErrors.heartRate = "Heart Rate is required.";
    } else {
      const hrNum = Number(formData.heartRate);
      if (isNaN(hrNum) || hrNum <= 0) {
        newErrors.heartRate = "Heart Rate must be positive.";
      }
    }

    if (!formData.glucose) {
      newErrors.glucose = "Glucose Level is required.";
    } else {
      const glucoseNum = Number(formData.glucose);
      if (isNaN(glucoseNum) || glucoseNum <= 0) {
        newErrors.glucose = "Glucose Level must be positive.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      setResult(null);
      return;
    }

    setIsLoading(true);

    // Prepare JSON payload with numerical types where required
    const payload = {
      gender: formData.gender,
      age: Number(formData.age),
      education: Number(formData.education),
      currentSmoker: formData.currentSmoker,
      cigsPerDay: Number(formData.cigsPerDay),
      BPMeds: formData.BPMeds,
      prevalentStroke: formData.prevalentStroke,
      prevalentHyp: formData.prevalentHyp,
      diabetes: formData.diabetes,
      totChol: Number(formData.totChol),
      sysBP: Number(formData.sysBP),
      diaBP: Number(formData.diaBP),
      BMI: Number(formData.BMI),
      heartRate: Number(formData.heartRate),
      glucose: Number(formData.glucose),
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = null;
        }

        if (response.status === 422 && errorData?.detail) {
          const detailMsg = Array.isArray(errorData.detail)
            ? errorData.detail.map((d: { msg: string }) => d.msg).join(", ")
            : "Validation error on server input data.";
          setApiError(`Invalid input data: ${detailMsg}`);
        } else {
          setApiError(
            errorData?.detail ||
              "An error occurred while processing the prediction."
          );
        }
        setResult(null);
        return;
      }

      const data: PredictionResult = await response.json();
      setResult(data);

      // Smooth scroll to result card
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setApiError("Unable to connect to the prediction service. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoData = () => {
    setFormData({
      gender: "Male",
      age: "55",
      education: "2",
      currentSmoker: "Yes",
      cigsPerDay: "10",
      BPMeds: "No",
      prevalentStroke: "No",
      prevalentHyp: "Yes",
      diabetes: "No",
      totChol: "230",
      sysBP: "145",
      diaBP: "90",
      BMI: "27.5",
      heartRate: "75",
      glucose: "90",
    });
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Top Action Bar (Demo Data & Reset) */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-red-50/60 p-4 sm:p-5 rounded-2xl border border-red-100">
          <div className="text-xs sm:text-sm text-gray-700 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>Quick testing option for clinical evaluations</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFillDemoData}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition shadow-2xs cursor-pointer disabled:opacity-50"
            >
              Fill Demo Patient
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition cursor-pointer disabled:opacity-50"
              title="Reset Form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Personal Information Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">1. Personal Information</h3>
              <p className="text-xs text-gray-500 font-medium">Demographic characteristics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.gender
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 55"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.age
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.age && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.age}
                </p>
              )}
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Education Level <span className="text-red-500">*</span>
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.education
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Education Level</option>
                <option value="1">1 (Some High School)</option>
                <option value="2">2 (High School / GED)</option>
                <option value="3">3 (Some College / Vocational)</option>
                <option value="4">4 (College Degree)</option>
              </select>
              {errors.education && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.education}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. Lifestyle Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">2. Lifestyle</h3>
              <p className="text-xs text-gray-500 font-medium">Smoking habits and exposure</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Smoker */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Current Smoker <span className="text-red-500">*</span>
              </label>
              <select
                name="currentSmoker"
                value={formData.currentSmoker}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.currentSmoker
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.currentSmoker && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.currentSmoker}
                </p>
              )}
            </div>

            {/* Cigarettes Per Day */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Cigarettes Per Day <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="cigsPerDay"
                value={formData.cigsPerDay}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 10 (or 0 if non-smoker)"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.cigsPerDay
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.cigsPerDay && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.cigsPerDay}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Medical History Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">3. Medical History</h3>
              <p className="text-xs text-gray-500 font-medium">Pre-existing cardiovascular & metabolic conditions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Blood Pressure Medication */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                BP Medication <span className="text-red-500">*</span>
              </label>
              <select
                name="BPMeds"
                value={formData.BPMeds}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.BPMeds
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.BPMeds && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.BPMeds}
                </p>
              )}
            </div>

            {/* Previous Stroke */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Previous Stroke <span className="text-red-500">*</span>
              </label>
              <select
                name="prevalentStroke"
                value={formData.prevalentStroke}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.prevalentStroke
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.prevalentStroke && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.prevalentStroke}
                </p>
              )}
            </div>

            {/* Hypertension */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Hypertension <span className="text-red-500">*</span>
              </label>
              <select
                name="prevalentHyp"
                value={formData.prevalentHyp}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.prevalentHyp
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.prevalentHyp && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.prevalentHyp}
                </p>
              )}
            </div>

            {/* Diabetes */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Diabetes <span className="text-red-500">*</span>
              </label>
              <select
                name="diabetes"
                value={formData.diabetes}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.diabetes
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.diabetes && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.diabetes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 4. Clinical Measurements Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">4. Clinical Measurements</h3>
              <p className="text-xs text-gray-500 font-medium">Physiological and laboratory diagnostic values</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Cholesterol */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Total Cholesterol <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(mg/dL)</span>
              <input
                type="number"
                step="any"
                name="totChol"
                value={formData.totChol}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 230"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.totChol
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.totChol && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.totChol}
                </p>
              )}
            </div>

            {/* Systolic Blood Pressure */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Systolic BP <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(mmHg)</span>
              <input
                type="number"
                step="any"
                name="sysBP"
                value={formData.sysBP}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 145"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.sysBP
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.sysBP && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.sysBP}
                </p>
              )}
            </div>

            {/* Diastolic Blood Pressure */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Diastolic BP <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(mmHg)</span>
              <input
                type="number"
                step="any"
                name="diaBP"
                value={formData.diaBP}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 90"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.diaBP
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.diaBP && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.diaBP}
                </p>
              )}
            </div>

            {/* BMI */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                BMI <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(kg/m²)</span>
              <input
                type="number"
                step="any"
                name="BMI"
                value={formData.BMI}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 27.5"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.BMI
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.BMI && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.BMI}
                </p>
              )}
            </div>

            {/* Heart Rate */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Heart Rate <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(bpm)</span>
              <input
                type="number"
                step="any"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 75"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.heartRate
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.heartRate && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.heartRate}
                </p>
              )}
            </div>

            {/* Glucose Level */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Glucose Level <span className="text-red-500">*</span>
              </label>
              <span className="block text-xs text-gray-400 font-medium mb-2">(mg/dL)</span>
              <input
                type="number"
                step="any"
                name="glucose"
                value={formData.glucose}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="e.g. 90"
                className={`w-full px-4 py-3 rounded-xl border text-base transition focus:outline-hidden bg-white ${
                  errors.glucose
                    ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {errors.glucose && (
                <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.glucose}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Server Connection Error Alert */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl flex items-center gap-3.5 shadow-xs">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <p className="text-base font-bold">Prediction Error</p>
              <p className="text-sm text-red-700 font-medium">{apiError}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col items-center justify-center pt-2 pb-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[320px] px-10 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-extrabold text-lg rounded-2xl shadow-lg shadow-red-600/25 hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Predict 10-Year CHD Risk</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

        {/* Form Bottom Disclaimer */}
        <p className="text-center text-xs text-gray-500 font-medium max-w-2xl mx-auto pt-2">
          This tool is developed for educational and research purposes only and does
          not provide a medical diagnosis.
        </p>
      </form>

      {/* RESULT CARD SECTION */}
      {result && (
        <div
          ref={resultRef}
          className="scroll-mt-24 pt-6 animate-fade-in"
        >
          <div
            className={`p-8 sm:p-10 rounded-3xl border shadow-xl ${
              result.prediction === 1
                ? "bg-gradient-to-br from-amber-50/90 via-white to-red-50/60 border-amber-200/90 shadow-amber-500/10"
                : "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 border-emerald-200/90 shadow-emerald-500/10"
            }`}
          >
            {/* Header Tag & Icon */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200/80">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
                    result.prediction === 1
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {result.prediction === 1 ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
                    Your Prediction Result
                  </h3>
                  <p
                    className={`text-2xl font-extrabold tracking-tight ${
                      result.prediction === 1 ? "text-amber-800" : "text-emerald-800"
                    }`}
                  >
                    {result.prediction === 1
                      ? "Higher predicted 10-year CHD risk"
                      : "Lower predicted 10-year CHD risk"}
                  </p>
                </div>
              </div>

              {/* Prediction Class Pill Badge */}
              <div
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-xs ${
                  result.prediction === 1
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                Risk Class {result.prediction}
              </div>
            </div>

            {/* Probability Score Card & Progress Bar */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <LineChart className="w-4 h-4 text-red-600" />
                  <span>Estimated CHD Risk Probability</span>
                </div>
                <div
                  className={`text-3xl font-extrabold tracking-tight ${
                    result.prediction === 1 ? "text-amber-600" : "text-emerald-600"
                  }`}
                >
                  {Math.round(result.percentage)}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden p-0.5 border border-gray-200/60">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    result.percentage < 20
                      ? "bg-emerald-500"
                      : result.percentage < 50
                      ? "bg-amber-500"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${Math.min(Math.max(result.percentage, 5), 100)}%` }}
                />
              </div>

              {/* Readable Backend Result Message */}
              <p className="text-sm sm:text-base font-semibold text-gray-800 pt-1">
                {result.result_message || result.result}
              </p>
            </div>

            {/* Disclaimers & Model Note */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 bg-white/70 p-5 rounded-2xl border border-gray-200/60">
              <p className="flex items-start gap-2 text-gray-700 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{result.disclaimer}</span>
              </p>
              <p className="text-gray-500 font-medium pl-6">
                Note: This result is generated by a machine-learning model and should
                not be interpreted as a clinical diagnosis.
              </p>
            </div>

            {/* Assess Another Patient Action */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleFillDemoData}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-2xs hover:shadow-xs transition"
              >
                <RotateCcw className="w-4 h-4 text-red-600" />
                <span>Test Another Patient</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
