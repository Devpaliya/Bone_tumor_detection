from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

# ✅ MongoDB Connection (FINAL CORRECT)
MONGO_URI = "mongodb+srv://paliyadev82_db_user:LjWSPw6hcKrXl03P@cluster07.t9wtd0q.mongodb.net/bone_db?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["bone_db"]
collection = db["predictions"]

app = FastAPI()

# ✅ CORS (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Input schema
class PatientData(BaseModel):
    age: int
    tumor_size: int
    bone_density: int
    bone_texture: int
    cell_irregularity: int
    calcification: int
    growth_rate: int
    pain_score: int
    inflammation: int
    metastasis_risk: int
    biomarker: int

# ✅ Prediction logic (simple)
def predict(data):
    score = sum(data.values())
    return "High Risk" if score > 50 else "Low Risk"

# ✅ API route
@app.post("/predict")
def predict_tumor(data: PatientData):
    try:
        input_data = data.dict()
        result = predict(input_data)

        # Save to MongoDB safely
        try:
            collection.insert_one({
                "input": input_data,
                "result": result
            })
        except Exception as db_error:
            print("MongoDB Error:", db_error)

        return {"prediction": result}

    except Exception as e:
        print("API Error:", e)
        return {"error": "Something went wrong"}

# ✅ Home route
@app.get("/")
def home():
    return {"message": "API is running"}