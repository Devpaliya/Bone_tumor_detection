from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import joblib
import numpy as np

app = FastAPI()

# ✅ CORS (important for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB Atlas connection
client = MongoClient("mongodb+srv://paliyadev82_db_user:LjWSPw6hcKrXl03P@cluster07.t9wtd0q.mongodb.net/")
db = client["bone_tumor_db"]
collection = db["patients"]

# ✅ Load model
model = joblib.load("best_bone_tumor_model.joblib")


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


# ✅ API route
@app.post("/predict")
def predict(data: InputData):

    values = np.array([[ 
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

    prediction = model.predict(values)[0]
    confidence = model.predict_proba(values)[0].max()

    result = "Malignant" if prediction == 1 else "Benign"

    # ✅ Store in MongoDB
    record = data.dict()
    record["prediction"] = result
    record["confidence"] = round(confidence * 100, 2)

    collection.insert_one(record)

    return {
        "prediction": result,
        "confidence": round(confidence * 100, 2),
        "risk": "High" if result == "Malignant" else "Low"
    }