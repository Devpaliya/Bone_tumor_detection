import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    age: "",
    tumor_size: "",
    bone_density: "",
    bone_texture: "",
    cell_irregularity: "",
    calcification: "",
    growth_rate: "",
    pain_score: "",
    inflammation: "",
    metastasis_risk: "",
    biomarker: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://bone-tumor-detection-vj6v.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const res = await response.json();
      setResult(res.prediction);
    } catch (error) {
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bone Tumor Detection</h1>

      {Object.keys(form).map((key) => (
        <div key={key}>
          <input
            type="number"
            name={key}
            placeholder={key}
            onChange={handleChange}
            style={{ margin: "5px", padding: "8px" }}
          />
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px" }}>
        Analyze
      </button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;