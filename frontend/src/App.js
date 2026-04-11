import { useState } from "react";
import axios from "axios";

function App() {
  const fieldInfo = {
    age: "Age (years)",
    tumor_size_mm: "Tumor Size (mm)",
    bone_density: "Bone Density (0 - 10)",
    bone_texture_score: "Bone Texture Score (0 - 10)",
    cell_irregularity: "Cell Irregularity (0 - 10)",
    calcification_level: "Calcification Level (0 - 10)",
    tumor_growth_rate: "Tumor Growth Rate (0 - 10)",
    pain_score: "Pain Score (0 - 10)",
    inflammation_index: "Inflammation Index (0 - 10)",
    metastasis_risk: "Metastasis Risk (0 - 10)",
    biomarker_level: "Biomarker Level (0 - 10)"
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
        "https://bone-tumor-detection-vj6v.onrender.com/predict",
        formattedData
      );

      console.log("API RESPONSE:", res.data); // debug

      setResult(res.data);
    } catch (err) {
      console.error(err);
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
                min={key === "age" ? 0 : 0}
                max={key === "age" ? 120 : 10}
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

        {/* RESULT DISPLAY */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl shadow bg-gray-50 border text-center">
            
            <h2 className="text-2xl font-bold">
              {(result.prediction || result.result) === "Malignant" ? "⚠️" : "✅"} Result:{" "}
              <span
                className={
                  (result.prediction || result.result) === "Malignant"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {result.prediction || result.result || "No result"}
              </span>
            </h2>

            {/* OPTIONAL DETAILS */}
            <div className="mt-4 text-gray-700">
              {result.confidence && <p>Confidence: {result.confidence}%</p>}
              {result.risk && <p>Risk: {result.risk}</p>}
            </div>

            {/* DEBUG OUTPUT */}
            <div className="mt-4 bg-black text-green-400 p-3 rounded text-left text-sm">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;