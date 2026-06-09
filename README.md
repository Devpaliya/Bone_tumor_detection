# 🦴 Bone Tumor Detection (Machine Learning Project)

This is an end-to-end Machine Learning project for predicting bone tumors (Benign vs Malignant) using a CSV-based dataset. The system uses a trained ML model with a FastAPI backend, React frontend, and MongoDB for storing predictions.

## 🚀 Features
- Predict tumor type (Benign / Malignant)
- Confidence score and risk level
- FastAPI backend for ML prediction
- React frontend for user input
- MongoDB database for storing results
- Clean UI for easy usage

## 🧠 Tech Stack
- Frontend: React, Tailwind CSS  
- Backend: FastAPI (Python)  
- Database: MongoDB  
- ML Model: Scikit-learn  
- Dataset: CSV-based  

## 📂 Project Structure
bone-tumor-detection/
├── frontend/
├── app.py
├── best_bone_tumor_model.joblib
├── bone_tumor_dataset_570.csv
├── requirements.txt
├── .gitignore
└── main.ipynb


## ⚙️ Setup

### 1. Clone repository
git clone https://github.com/your-username/bone-tumor-detection.git

cd bone-tumor-detection

### 2. Create virtual environment
python -m venv venv
venv\Scripts\activate

### 3. Install dependencies
pip install -r requirements.txt

### 4. Run backend
uvicorn app:app --reload

Open: https://bone-tumor-detection-1.onrender.com/docs

### 5. Run frontend
cd frontend
npm install
npm star

Open: http://localhost:3000

## 📊 Input Features
Age, Tumor Size (mm), Bone Density, Bone Texture Score, Cell Irregularity, Calcification Level, Tumor Growth Rate, Pain Score (0–10), Inflammation Index, Metastasis Risk, Biomarker Level

## 🎯 Output
- Result: Benign / Malignant  
- Confidence (%)  
- Risk Level  

## 👨‍💻 Author
Dev Paliya