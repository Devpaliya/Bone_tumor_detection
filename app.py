from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

client = MongoClient(
    "mongodb+srv://paliyadev82_db_user:4cdJavs1MqqQhzuS@cluster07.t9wtd0q.mongodb.net/?retryWrites=true&w=majority&appName=cluster07"
)

db = client["bone_tumor_db"]

predictions_collection = db["predictions"]
doctors_collection = db["doctors"]
password_requests = db["password_requests"]

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# SCHEMAS
# =========================

class PatientData(BaseModel):
    doctorName: str
    doctorEmail: str

    patient_name: str
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


class DoctorData(BaseModel):
    fullName: str
    hospitalName: str
    medicalId: str
    specialization: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str
    
class ForgotPasswordData(BaseModel):
    email: str
    newPassword: str

class PasswordResetRequest(BaseModel):
    email: str
# =========================
# REGISTER
# =========================

@app.post("/register")
def register_doctor(data: DoctorData):

    existing = doctors_collection.find_one({
        "email": data.email
    })

    if existing:
        return {
            "success": False,
            "message": "Doctor already exists"
        }

    doctors_collection.insert_one({
        "fullName": data.fullName,
        "hospitalName": data.hospitalName,
        "medicalId": data.medicalId,
        "specialization": data.specialization,
        "email": data.email,
        "password": data.password,
        "approved": False,
        "isBlocked": False
        
    })

    return {
        "success": True,
        "message": "Registration Successful"
    }

@app.put("/forgot-password")
def forgot_password(data: ForgotPasswordData):

    doctor = doctors_collection.find_one({
        "email": data.email
    })

    if not doctor:
        return {
            "success": False,
            "message": "Email not found"
        }

    doctors_collection.update_one(
        {"email": data.email},
        {
            "$set": {
                "password": data.newPassword
            }
        }
    )

    return {
        "success": True,
        "message": "Password Updated Successfully"
    }

@app.post("/request-password-reset")
def request_password_reset(data: PasswordResetRequest):

    doctor = doctors_collection.find_one(
        {"email": data.email}
    )

    if not doctor:
        return {
            "success": False,
            "message": "Doctor not found"
        }

    password_requests.insert_one({
    "email": data.email,
    "approved": False,
    "completed": False,
    "createdAt": datetime.utcnow()
})

    return {
        "success": True,
        "message": "Request Sent To Admin"
    }

@app.get("/admin/password-requests")
def get_password_requests():

    requests = []

    for item in password_requests.find():

        item["_id"] = str(item["_id"])

        requests.append(item)

    return requests

@app.put("/approve-password-reset/{request_id}")
def approve_password_reset(request_id: str):

    request = password_requests.find_one(
        {"_id": ObjectId(request_id)}
    )

    if not request:
        return {
            "success": False,
            "message": "Request not found"
        }

    password_requests.update_one(
        {"_id": ObjectId(request_id)},
        {
            "$set": {
                "approved": True
            }
        }
    )

    return {
        "success": True,
        "message": "Password Reset Approved"
    }

@app.put("/reset-password")
def reset_password(data: ForgotPasswordData):

    request = password_requests.find_one({
        "email": data.email,
        "approved": True,
        "completed": False
    })

    if not request:
        return {
            "success": False,
            "message": "Waiting for Admin Approval"
        }

    doctors_collection.update_one(
        {"email": data.email},
        {
            "$set": {
                "password": data.newPassword
            }
        }
    )

    password_requests.update_one(
        {"_id": request["_id"]},
        {
            "$set": {
                "completed": True
            }
        }
    )

    return {
        "success": True,
        "message": "Password Updated Successfully"
    }
@app.get("/password-reset-status/{email}")
def password_reset_status(email: str):

    request = password_requests.find_one(
        {
            "email": email,
            "completed": False
        },
        sort=[("_id", -1)]
    )

    if not request:
        return {
            "status": "No Request"
        }

    if request.get("approved", False):
        return {
            "status": "Approved"
        }

    return {
        "status": "Pending"
    }

@app.get("/admin/password-request-count")
def password_request_count():

    count = password_requests.count_documents({
        "approved": False
    })

    return {
        "count": count
    }

@app.get("/password-reset-status/{email}")
def password_reset_status(email: str):

    request = password_requests.find_one(
        {
            "email": email,
            "completed": False
        },
        sort=[("_id", -1)]
    )

    if not request:
        return {
            "status": "No Request"
        }

    if request.get("approved", False):
        return {
            "status": "Approved"
        }

    return {
        "status": "Pending"
    }
# =========================
# LOGIN
# =========================

@app.post("/login")
def login_doctor(data: LoginData):

    doctor = doctors_collection.find_one({
        "email": data.email
    })

    if not doctor:
        return {
            "success": False,
            "message": "Invalid Email"
        }

    if not doctor.get("approved", False):
        return {
            "success": False,
            "message": "Waiting for Admin Approval"
        }

    if doctor.get("isBlocked", False):
        return {
            "success": False,
            "message": "Account Blocked By Admin"
        }

    if doctor["password"] != data.password:
        return {
            "success": False,
            "message": "Invalid Password"
        }

    return {
        "success": True,
        "message": "Login Successful",
        "fullName": doctor["fullName"],
        "hospitalName": doctor["hospitalName"],
        "medicalId": doctor["medicalId"],
        "specialization": doctor["specialization"],
        "email": doctor["email"]
    }

    

@app.get("/doctors")
def get_doctors():

    doctors = []

    for doctor in doctors_collection.find():

        doctor["_id"] = str(doctor["_id"])

        doctors.append(doctor)

    return doctors
# =========================
# AI LOGIC
# =========================

def predict(data):

    score = (
        data["age"] +
        data["tumor_size"] +
        data["bone_density"] +
        data["bone_texture"] +
        data["cell_irregularity"] +
        data["calcification"] +
        data["growth_rate"] +
        data["pain_score"] +
        data["inflammation"] +
        data["metastasis_risk"] +
        data["biomarker"]
    )

    if score > 50:
        return "High Risk"

    return "Low Risk"


# =========================
# PREDICTION
# =========================

@app.post("/predict")
def predict_tumor(data: PatientData):

    input_data = data.dict()

    score = (
        input_data["age"] +
        input_data["tumor_size"] +
        input_data["bone_density"] +
        input_data["bone_texture"] +
        input_data["cell_irregularity"] +
        input_data["calcification"] +
        input_data["growth_rate"] +
        input_data["pain_score"] +
        input_data["inflammation"] +
        input_data["metastasis_risk"] +
        input_data["biomarker"]
    )

    result = predict(input_data)

    predictions_collection.insert_one({
        **input_data,
        "prediction": result,
        "createdAt": datetime.utcnow()
    })

    return {
        "prediction": result,
        "confidence": score
    }
   
@app.put("/block-doctor/{doctor_id}")
def block_doctor(doctor_id: str):

    doctors_collection.update_one(
        {"_id": ObjectId(doctor_id)},
        {"$set": {"isBlocked": True}}
    )

    return {"success": True}


@app.put("/unblock-doctor/{doctor_id}")
def unblock_doctor(doctor_id: str):

    doctors_collection.update_one(
        {"_id": ObjectId(doctor_id)},
        {"$set": {"isBlocked": False}}
    )

    return {"success": True}

@app.put("/approve-doctor/{doctor_id}")
def approve_doctor(doctor_id: str):

    doctors_collection.update_one(
        {"_id": ObjectId(doctor_id)},
        {"$set": {"approved": True}}
    )

    return {
        "success": True
    }

@app.delete("/doctor/{doctor_id}")
def delete_doctor(doctor_id: str):

    doctors_collection.delete_one(
        {"_id": ObjectId(doctor_id)}
    )

    return {
        "success": True
    }
# =========================
# HISTORY
# =========================

@app.get("/history")
def get_history():

    records = []

    for item in predictions_collection.find().sort("_id", -1):

        item["_id"] = str(item["_id"])

        records.append(item)

    return records


@app.get("/doctor/stats/{email}")
def doctor_stats(email: str):

    total = predictions_collection.count_documents(
        {"doctorEmail": email}
    )

    high = predictions_collection.count_documents({
        "doctorEmail": email,
        "prediction": "High Risk"
    })

    low = predictions_collection.count_documents({
        "doctorEmail": email,
        "prediction": "Low Risk"
    })

    return {
        "total_predictions": total,
        "high_risk": high,
        "low_risk": low
    }

@app.get("/doctor/recent/{email}")
def recent_patients(email: str):

    patients = []

    for item in predictions_collection.find(
        {"doctorEmail": email}
    ).sort("_id", -1).limit(5):

        item["_id"] = str(item["_id"])

        patients.append(item)

    return patients
@app.get("/admin/doctor-analytics")
def doctor_analytics():

    result = []

    for doctor in doctors_collection.find():

        email = doctor["email"]

        total = predictions_collection.count_documents({
            "doctorEmail": email
        })

        high = predictions_collection.count_documents({
            "doctorEmail": email,
            "prediction": "High Risk"
        })

        low = predictions_collection.count_documents({
            "doctorEmail": email,
            "prediction": "Low Risk"
        })

        result.append({
            "doctor": doctor["fullName"],
            "total": total,
            "high": high,
            "low": low
        })

    return result
# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "message": "API is running"
    }

@app.get("/admin/stats")
def admin_stats():

    total_doctors = doctors_collection.count_documents({})

    approved_doctors = doctors_collection.count_documents({
        "approved": True
    })

    pending_doctors = doctors_collection.count_documents({
        "approved": False
    })

    blocked_doctors = doctors_collection.count_documents({
        "isBlocked": True
    })

    total_predictions = predictions_collection.count_documents({})

    high_risk = predictions_collection.count_documents({
        "prediction": "High Risk"
    })

    low_risk = predictions_collection.count_documents({
        "prediction": "Low Risk"
    })

    return {
        "doctors": total_doctors,
        "approved": approved_doctors,
        "pending": pending_doctors,
        "blocked": blocked_doctors,
        "predictions": total_predictions,
        "high_risk": high_risk,
        "low_risk": low_risk
    }

  


@app.get("/admin/recent-predictions")
def recent_predictions():

    records = []

    for item in predictions_collection.find().sort("_id", -1).limit(5):

        item["_id"] = str(item["_id"])

        records.append(item)

    return records