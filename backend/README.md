# 10-Year Coronary Heart Disease Risk Prediction - Backend API

FastAPI backend service for predicting 10-year risk of Coronary Heart Disease (CHD) using a pre-trained scikit-learn `RandomForestClassifier`.

---

## 🚀 How to Run the Backend Locally

### 1. Prerequisites
Ensure you have **Python 3.9+** installed on your system.

### 2. Navigate to the Backend Directory
```bash
cd backend
```

### 3. (Optional) Create and Activate a Virtual Environment
- **Windows (PowerShell):**
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```
- **macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Start the FastAPI Server
Run via Python module (recommended on Windows / PowerShell):
```powershell
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
*(If `uvicorn` executable script is added to your system PATH, you can also run `uvicorn main:app --reload` directly).*

The server will start at: `http://127.0.0.1:8000`

---

## 📌 API Endpoints & Usage

### 1. Root / Health Check
- **Endpoint:** `GET /`
- **Description:** Verifies that the API server is operational and model files are loaded.
- **Example Response:**
  ```json
  {
    "status": "ok",
    "message": "10-Year Coronary Heart Disease Risk Prediction API is running",
    "model_loaded": true,
    "feature_count": 15
  }
  ```

### 2. Risk Prediction Endpoint
- **Endpoint:** `POST /predict`
- **Description:** Accepts patient medical data, encodes inputs, formats features into a pandas DataFrame, and returns model predictions.
- **Interactive Documentation:** Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser to test endpoints via Swagger UI.

#### **Sample Input Payload:**
```json
{
  "gender": "Male",
  "age": 55,
  "education": 2,
  "currentSmoker": "Yes",
  "cigsPerDay": 10,
  "BPMeds": "No",
  "prevalentStroke": "No",
  "prevalentHyp": "Yes",
  "diabetes": "No",
  "totChol": 230,
  "sysBP": 145,
  "diaBP": 90,
  "BMI": 27.5,
  "heartRate": 75,
  "glucose": 90
}
```

#### **Sample Output Response:**
```json
{
  "prediction": 0,
  "probability": 0.31,
  "percentage": 31.0,
  "result_message": "Low Risk: The estimated 10-year risk of Coronary Heart Disease is 31.00%.",
  "disclaimer": "DISCLAIMER: This tool is intended solely for educational and research purposes. It is not a diagnostic tool and must not be used for medical advice or clinical decision-making. Please consult a certified healthcare professional for medical diagnoses."
}
```
