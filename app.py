from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from pymongo import MongoClient

app = FastAPI()

# ✅ CORS (IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔁 Redirect root → docs
@app.get("/")
def redirect_to_docs():
    return RedirectResponse(url="/docs")


# ✅ Load ML model
model = joblib.load("best_bone_tumor_model.joblib")


# ✅ MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["bone_tumor_db"]
collection = db["predictions"]


# ✅ Input schema
class InputData(BaseModel):
    age: float
    tumor_size_mm: float
    bone_density: float
    bone_texture_score: float
    cell_irregularity: float
    calcification_level: float
    tumor_growth_rate: float
    pain_score: float
    inflammation_index: float
    metastasis_risk: float
    biomarker_level: float


# ✅ Prediction API
@app.post("/predict")
def predict(data: InputData):
    try:
        features = np.array([[ 
            data.age,
            data.tumor_size_mm,
            data.bone_density,
            data.bone_texture_score,
            data.cell_irregularity,
            data.calcification_level,
            data.tumor_growth_rate,
            data.pain_score,
            data.inflammation_index,
            data.metastasis_risk,
            data.biomarker_level
        ]])

        prediction = model.predict(features)[0]
        prob = model.predict_proba(features)[0][1]

        result = "Malignant" if prediction == 1 else "Benign"
        confidence = round(prob * 100, 2)

        if prob < 0.4:
            risk = "Low"
        elif prob < 0.7:
            risk = "Medium"
        else:
            risk = "High"

        # ✅ Save to MongoDB
        document = {
            "age": data.age,
            "tumor_size_mm": data.tumor_size_mm,
            "bone_density": data.bone_density,
            "bone_texture_score": data.bone_texture_score,
            "cell_irregularity": data.cell_irregularity,
            "calcification_level": data.calcification_level,
            "tumor_growth_rate": data.tumor_growth_rate,
            "pain_score": data.pain_score,
            "inflammation_index": data.inflammation_index,
            "metastasis_risk": data.metastasis_risk,
            "biomarker_level": data.biomarker_level,
            "result": result,
            "confidence": confidence,
            "risk": risk
        }

        collection.insert_one(document)

        return {
            "result": result,
            "confidence": confidence,
            "risk": risk
        }

    except Exception as e:
        return {"error": str(e)}