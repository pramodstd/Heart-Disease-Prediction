"use client";

import { AlertCircle, ArrowRight, FileCheck, RotateCcw, User, Activity, Stethoscope, Info } from "lucide-react";

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

interface IntakeFormProps {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleFillSample: () => void;
  handleReset: () => void;
}

export default function IntakeForm({
  formData,
  errors,
  isLoading,
  handleChange,
  handleSubmit,
  handleFillSample,
  handleReset,
}: IntakeFormProps) {
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-rose-100 shadow-xl shadow-rose-100/30 rounded-3xl p-6 sm:p-8 space-y-6">
      
      {/* HOW TO USE CARD (Top of Intake Panel matching reference with soft pink tint) */}
      <div className="bg-gradient-to-br from-red-50/70 via-rose-50/50 to-pink-50/60 border border-rose-100 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="text-xs uppercase font-extrabold tracking-widest text-red-600">
          How To Use
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-gray-800 font-medium">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              1
            </span>
            <span>Fill in the patient's measurements and history in the fields below.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              2
            </span>
            <span>Select <strong className="text-gray-900 font-bold">Assess risk</strong> to run the model on the entered values.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              3
            </span>
            <span>Read the 10-year CHD probability and risk level in the result panel.</span>
          </div>
        </div>

        {/* Mandatory Requirement Info Note */}
        <div className="bg-white/90 border border-rose-100 rounded-xl p-3.5 flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
          <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>
            All fields are required before a prediction can be generated. Complete records give the most reliable estimate.
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* SECTION 1 CARD: DEMOGRAPHICS */}
        <div className="bg-white/90 border border-rose-100/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100/60">
            <User className="w-4 h-4 text-red-600" />
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-red-600">
              Demographics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="61"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.age ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">years · 20–100</span>
              {errors.age && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Sex
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.gender ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">Biological sex</span>
              {errors.gender && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Education
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.education ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select level</option>
                <option value="1">1 · Some high school</option>
                <option value="2">2 · High school / GED</option>
                <option value="3">3 · Some college / vocational</option>
                <option value="4">4 · College degree</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">Attainment level 1–4</span>
              {errors.education && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.education}
                </p>
              )}
            </div>

            {/* Current Smoker */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Current smoker
              </label>
              <select
                name="currentSmoker"
                value={formData.currentSmoker}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.currentSmoker ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">Smokes at present</span>
              {errors.currentSmoker && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.currentSmoker}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2 CARD: VITALS & LABS */}
        <div className="bg-white/90 border border-rose-100/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100/60">
            <Activity className="w-4 h-4 text-red-600" />
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-red-600">
              Vitals & Labs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Systolic BP */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Systolic BP
              </label>
              <input
                type="number"
                step="any"
                name="sysBP"
                value={formData.sysBP}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="145"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.sysBP ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">mmHg · Systolic pressure</span>
              {errors.sysBP && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.sysBP}
                </p>
              )}
            </div>

            {/* Diastolic BP */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Diastolic BP
              </label>
              <input
                type="number"
                step="any"
                name="diaBP"
                value={formData.diaBP}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="90"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.diaBP ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">mmHg · Diastolic pressure</span>
              {errors.diaBP && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.diaBP}
                </p>
              )}
            </div>

            {/* Total Cholesterol */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Total Cholesterol
              </label>
              <input
                type="number"
                step="any"
                name="totChol"
                value={formData.totChol}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="230"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.totChol ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">mg/dL · Total serum cholesterol</span>
              {errors.totChol && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.totChol}
                </p>
              )}
            </div>

            {/* Glucose Level */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Glucose Level
              </label>
              <input
                type="number"
                step="any"
                name="glucose"
                value={formData.glucose}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="90"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.glucose ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">mg/dL · Blood glucose level</span>
              {errors.glucose && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.glucose}
                </p>
              )}
            </div>

            {/* BMI */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                BMI
              </label>
              <input
                type="number"
                step="any"
                name="BMI"
                value={formData.BMI}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="27.5"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.BMI ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">kg/m² · Body mass index</span>
              {errors.BMI && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.BMI}
                </p>
              )}
            </div>

            {/* Heart Rate */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Heart rate
              </label>
              <input
                type="number"
                step="any"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="75"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.heartRate ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">bpm · Resting heart rate</span>
              {errors.heartRate && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.heartRate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3 CARD: HISTORY & RISK FACTORS */}
        <div className="bg-white/90 border border-rose-100/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100/60">
            <Stethoscope className="w-4 h-4 text-red-600" />
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-red-600">
              History & Risk Factors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cigarettes / day */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Cigarettes / day
              </label>
              <input
                type="number"
                name="cigsPerDay"
                value={formData.cigsPerDay}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="10"
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.cigsPerDay ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              />
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">0 if non-smoker</span>
              {errors.cigsPerDay && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.cigsPerDay}
                </p>
              )}
            </div>

            {/* BP medication */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                BP medication
              </label>
              <select
                name="BPMeds"
                value={formData.BPMeds}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.BPMeds ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">On antihypertensives</span>
              {errors.BPMeds && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.BPMeds}
                </p>
              )}
            </div>

            {/* Hypertension */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Hypertension
              </label>
              <select
                name="prevalentHyp"
                value={formData.prevalentHyp}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.prevalentHyp ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">Prevalent diagnosis</span>
              {errors.prevalentHyp && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.prevalentHyp}
                </p>
              )}
            </div>

            {/* Diabetes */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Diabetes
              </label>
              <select
                name="diabetes"
                value={formData.diabetes}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.diabetes ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">Prevalent diagnosis</span>
              {errors.diabetes && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.diabetes}
                </p>
              )}
            </div>

            {/* Prior stroke */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Prior stroke
              </label>
              <select
                name="prevalentStroke"
                value={formData.prevalentStroke}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-[46px] px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-2xs w-full ${
                  errors.prevalentStroke ? "border-red-400 bg-red-50/20" : "border-slate-200"
                }`}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className="text-[11px] text-gray-400 font-medium mt-1 block">History of stroke</span>
              {errors.prevalentStroke && (
                <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.prevalentStroke}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* FORM ACTIONS */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Primary Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-[46px] px-7 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Assess risk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={handleFillSample}
              disabled={isLoading}
              className="h-[46px] px-6 bg-white hover:bg-rose-50/50 text-gray-800 border border-rose-200 font-bold text-sm rounded-2xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <FileCheck className="w-4 h-4 text-red-600" />
              <span>Load sample</span>
            </button>
          </div>

          {/* Text Button */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="h-[46px] px-4 text-gray-500 hover:text-gray-900 font-semibold text-sm transition flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear form</span>
          </button>
        </div>

      </form>
    </div>
  );
}
