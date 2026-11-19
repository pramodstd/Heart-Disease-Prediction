"use client";

import { useState } from "react";
import IntakeForm, { FormData, FormErrors } from "./IntakeForm";
import RiskResultCard, { PredictionResult } from "./RiskResultCard";
import ModelPerformance from "./ModelPerformance";
import { Activity, Heart } from "lucide-react";

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

export default function PredictorConsole() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

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

    // 1. Demographics
    if (!formData.gender) newErrors.gender = "Gender is required.";

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum <= 0) {
        newErrors.age = "Age must be a positive number.";
      }
    }

    if (!formData.education) {
      newErrors.education = "Education level is required.";
    } else {
      const eduNum = Number(formData.education);
      if (![1, 2, 3, 4].includes(eduNum)) {
        newErrors.education = "Education must be between 1 and 4.";
      }
    }

    if (!formData.currentSmoker) {
      newErrors.currentSmoker = "Current smoker status is required.";
    }

    // 2. Vitals & Labs
    if (!formData.sysBP) {
      newErrors.sysBP = "Systolic BP is required.";
    } else if (Number(formData.sysBP) <= 0) {
      newErrors.sysBP = "Systolic BP must be positive.";
    }

    if (!formData.diaBP) {
      newErrors.diaBP = "Diastolic BP is required.";
    } else if (Number(formData.diaBP) <= 0) {
      newErrors.diaBP = "Diastolic BP must be positive.";
    }

    if (!formData.totChol) {
      newErrors.totChol = "Total Cholesterol is required.";
    } else if (Number(formData.totChol) <= 0) {
      newErrors.totChol = "Cholesterol must be positive.";
    }

    if (!formData.glucose) {
      newErrors.glucose = "Glucose level is required.";
    } else if (Number(formData.glucose) <= 0) {
      newErrors.glucose = "Glucose must be positive.";
    }

    if (!formData.BMI) {
      newErrors.BMI = "BMI is required.";
    } else if (Number(formData.BMI) <= 0) {
      newErrors.BMI = "BMI must be positive.";
    }

    if (!formData.heartRate) {
      newErrors.heartRate = "Heart rate is required.";
    } else if (Number(formData.heartRate) <= 0) {
      newErrors.heartRate = "Heart rate must be positive.";
    }

    // 3. History & Risk Factors
    if (formData.cigsPerDay === "") {
      newErrors.cigsPerDay = "Cigarettes / day is required.";
    } else if (Number(formData.cigsPerDay) < 0) {
      newErrors.cigsPerDay = "Cigarettes / day cannot be negative.";
    }

    if (!formData.BPMeds) newErrors.BPMeds = "BP medication status is required.";
    if (!formData.prevalentHyp) newErrors.prevalentHyp = "Hypertension status is required.";
    if (!formData.diabetes) newErrors.diabetes = "Diabetes status is required.";
    if (!formData.prevalentStroke) newErrors.prevalentStroke = "Prior stroke status is required.";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errJson;
        try {
          errJson = await response.json();
        } catch {
          errJson = null;
        }

        if (response.status === 422 && errJson?.detail) {
          const detailMsg = Array.isArray(errJson.detail)
            ? errJson.detail.map((d: { msg: string }) => d.msg).join(", ")
            : "Validation error on server input data.";
          setApiError(`Invalid input data: ${detailMsg}`);
        } else {
          setApiError(errJson?.detail || "Could not reach the prediction service. Confirm the backend is running.");
        }
        setResult(null);
        return;
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch {
      setApiError("Could not reach the prediction service. Confirm the backend is running.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillSample = () => {
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
    <div className="space-y-6">
      
      {/* Centered Top Console Header */}
      <div className="text-center max-w-3xl mx-auto py-4 sm:py-6 space-y-3">
        {/* Live Heart Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/90 shadow-xs mb-2">
          <div className="relative flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-600 fill-red-600 animate-heartbeat" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-xs font-extrabold tracking-wider uppercase text-gray-800">
            Live Clinical AI Predictor Console
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Heart <span className="text-red-600">Wise</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Complete the form below to calculate your 10-year coronary heart disease risk
          probability. Our AI model will analyze your health factors and provide a
          personalized assessment.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_370px] gap-6 items-start">
        
        {/* Left Side: Patient Intake Form */}
        <IntakeForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFillSample={handleFillSample}
          handleReset={handleReset}
        />

        {/* Right Side: Sticky Risk Estimate & Model Performance Rail */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <RiskResultCard
            result={result}
            isLoading={isLoading}
            apiError={apiError}
          />

          <ModelPerformance />
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="text-center text-xs text-rose-900/60 font-semibold pt-2">
        Decision-support and educational use only · not a diagnostic device.
      </div>

    </div>
  );
}
