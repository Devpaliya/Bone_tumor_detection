import { useState } from "react";
import axios from "axios";

function App() {
  const fieldInfo = {
    age: "Age (years)",
    tumor_size_mm: "Tumor Size (mm)",
    bone_density: "Bone Density (0 - 1)",
    bone_texture_score: "Bone Texture Score (0 - 1)",
    cell_irregularity: "Cell Irregularity (0 - 1)",
    calcification_level: "Calcification Level (0 - 1)",
    tumor_growth_rate: "Tumor Growth Rate (0 - 1)",
    pain_score: "Pain Score (0 - 10)",
    inflammation_index: "Inflammation Index (0 - 1)",
    metastasis_risk: "Metastasis Risk (0 - 1)",
    biomarker_level: "Biomarker Level (0 - 1)"
  };

  const [form, setForm] = useState({
    age: "",
    tumor_size_mm: "",
    bone_density: "",
    bone_texture_score: "",
    cell_irregularity: "",
    calcification_level: "",
    tumor_growth_rate: "",
    pain_score: "",
    inflammation_index: "",
    metastasis_risk: "",
    biomarker_level: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedData = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)])
      );

      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formattedData
      );

      setResult(res.data);
    } catch (err) {
      alert("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center p-6">
      
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          🦴 Bone Tumor Detection
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Clinical decision support system
        </p>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="text-sm text-gray-600">
                {fieldInfo[key]}
              </label>

              <input
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl text-lg font-semibold transition shadow-md 
          ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {loading ? "Analyzing..." : "Predict Tumor"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl shadow bg-gray-50 border text-center">
            
            <h2 className="text-2xl font-bold">
              {result.result === "Malignant" ? "⚠️" : "✅"} Result:{" "}
              <span
                className={
                  result.result === "Malignant"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {result.result}
              </span>
            </h2>

            <div className="mt-4 flex justify-between text-gray-700 text-lg">
              <p>Confidence: {result.confidence}%</p>
              <p>Risk: {result.risk}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;