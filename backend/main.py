import os
from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Base directory for loading model files
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "final_random_forest_model.pkl"
FEATURE_NAMES_PATH = BASE_DIR / "final_feature_names.pkl"

# Load trained Random Forest model and feature names list
try:
    model = joblib.load(MODEL_PATH)
    feature_names = joblib.load(FEATURE_NAMES_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model artifacts from {BASE_DIR}: {e}")

app = FastAPI(
    title="10-Year Coronary Heart Disease Risk Prediction API",
    description="Backend service predicting 10-year risk of CHD using a trained scikit-learn RandomForestClassifier.",
    version="1.0.0"
)

# Enable Cross-Origin Resource Sharing (CORS) for future frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://heart-disease-prediction-six-psi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientData(BaseModel):
    gender: str = Field(..., description="Gender: 'Male' or 'Female'")
    age: int = Field(..., gt=0, le=120, description="Age in years (positive integer)")
    education: int = Field(..., ge=1, le=4, description="Education level (1 to 4)")
    currentSmoker: str = Field(..., description="Current smoker: 'Yes' or 'No'")
    cigsPerDay: float = Field(..., ge=0, description="Carettes smoked per day (non-negative)")
    BPMeds: str = Field(..., description="Blood pressure medication: 'Yes' or 'No'")
    prevalentStroke: str = Field(..., description="Prevalent stroke history: 'Yes' or 'No'")
    prevalentHyp: str = Field(..., description="Prevalent hypertension: 'Yes' or 'No'")
    diabetes: str = Field(..., description="Diabetes status: 'Yes' or 'No'")
    totChol: float = Field(..., gt=0, description="Total cholesterol in mg/dL (positive value)")
    sysBP: float = Field(..., gt=0, description="Systolic blood pressure in mmHg (positive value)")
    diaBP: float = Field(..., gt=0, description="Diastolic blood pressure in mmHg (positive value)")
    BMI: float = Field(..., gt=0, description="Body Mass Index (positive value)")
    heartRate: float = Field(..., gt=0, description="Heart rate in bpm (positive value)")
    glucose: float = Field(..., gt=0, description="Glucose level in mg/dL (positive value)")

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v: str) -> str:
        v_str = str(v).strip().capitalize()
        if v_str not in ["Male", "Female"]:
            raise ValueError("gender must be 'Male' or 'Female'")
        return v_str

    @field_validator("currentSmoker", "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes")
    @classmethod
    def validate_yes_no(cls, v: str, info) -> str:
        v_str = str(v).strip().capitalize()
        if v_str not in ["Yes", "No"]:
            raise ValueError(f"{info.field_name} must be 'Yes' or 'No'")
        return v_str


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="Predicted class: 0 (Low Risk) or 1 (High Risk)")
    probability: float = Field(..., description="Probability of class 1 (CHD Risk)")
    percentage: float = Field(..., description="Probability expressed as a percentage")
    result_message: str = Field(..., description="Human-readable risk assessment result message")
    disclaimer: str = Field(..., description="Educational/non-diagnostic disclaimer")


@app.get("/", tags=["Health Check"])
def read_root():
    return {
        "status": "ok",
        "message": "10-Year Coronary Heart Disease Risk Prediction API is running",
        "model_loaded": model is not None,
        "feature_count": len(feature_names)
    }


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict_risk(patient: PatientData):
    try:
        # Encode categorical variables as per model training rules
        # gender: Female = 0, Male = 1
        gender_encoded = 1 if patient.gender == "Male" else 0

        # Yes/No fields: No = 0, Yes = 1
        current_smoker_encoded = 1 if patient.currentSmoker == "Yes" else 0
        bp_meds_encoded = 1 if patient.BPMeds == "Yes" else 0
        prevalent_stroke_encoded = 1 if patient.prevalentStroke == "Yes" else 0
        prevalent_hyp_encoded = 1 if patient.prevalentHyp == "Yes" else 0
        diabetes_encoded = 1 if patient.diabetes == "Yes" else 0

        # Construct raw dictionary matching feature names
        encoded_dict = {
            "gender": gender_encoded,
            "age": patient.age,
            "education": patient.education,
            "currentSmoker": current_smoker_encoded,
            "cigsPerDay": patient.cigsPerDay,
            "BPMeds": bp_meds_encoded,
            "prevalentStroke": prevalent_stroke_encoded,
            "prevalentHyp": prevalent_hyp_encoded,
            "diabetes": diabetes_encoded,
            "totChol": patient.totChol,
            "sysBP": patient.sysBP,
            "diaBP": patient.diaBP,
            "BMI": patient.BMI,
            "heartRate": patient.heartRate,
            "glucose": patient.glucose,
        }

        # Create Pandas DataFrame ordered explicitly by loaded feature_names
        df = pd.DataFrame([encoded_dict])[feature_names]

        # Model inference
        prediction = int(model.predict(df)[0])
        probability = float(model.predict_proba(df)[0][1])
        percentage = round(probability * 100, 2)

        if prediction == 1:
            result_message = f"High Risk: The estimated 10-year risk of Coronary Heart Disease is {percentage:.2f}%."
        else:
            result_message = f"Low Risk: The estimated 10-year risk of Coronary Heart Disease is {percentage:.2f}%."

        disclaimer = (
            "DISCLAIMER: This tool is intended solely for educational and research purposes. "
            "It is not a diagnostic tool and must not be used for medical advice or clinical decision-making. "
            "Please consult a certified healthcare professional for medical diagnoses."
        )

        return PredictionResponse(
            prediction=prediction,
            probability=round(probability, 4),
            percentage=percentage,
            result_message=result_message,
            disclaimer=disclaimer
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during prediction processing: {str(e)}"
        )
