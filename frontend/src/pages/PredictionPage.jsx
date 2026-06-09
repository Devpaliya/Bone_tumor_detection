import React, { useState } from "react";

export default function PredictionPage({

  setPage,
  setPrediction,
  setConfidence

}) {

  const [formData, setFormData] = useState({
    patient_name: "",
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEnter = (e) => {

    if (e.key === "Enter") {

      const form = e.target.form;

      const index = Array.prototype.indexOf.call(
        form,
        e.target
      );

      if (form.elements[index + 1]) {

        form.elements[index + 1].focus();

      } else {

        handleSubmit();
      }

      e.preventDefault();
    }
  };

 const handleSubmit = async () => {
  try {
    setLoading(true);

    const doctor = JSON.parse(
      localStorage.getItem("doctor")
    );

    const response = await fetch(
      "http://127.0.0.1:8000/predict",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          doctorName: doctor.fullName,
          doctorEmail: doctor.email,

          patient_name: formData.patient_name,
          age: Number(formData.age),
          tumor_size: Number(formData.tumor_size),
          bone_density: Number(formData.bone_density),
          bone_texture: Number(formData.bone_texture),
          cell_irregularity: Number(formData.cell_irregularity),
          calcification: Number(formData.calcification),
          growth_rate: Number(formData.growth_rate),
          pain_score: Number(formData.pain_score),
          inflammation: Number(formData.inflammation),
          metastasis_risk: Number(formData.metastasis_risk),
          biomarker: Number(formData.biomarker)
        })
      }
    );

    const data = await response.json();

    setPrediction(data.prediction);

    setConfidence(data.confidence);

    setLoading(false);

    setPage("result");

  } catch (error) {

    console.log(error);

    setLoading(false);

    alert("Prediction Failed");
  }
};

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Top Navbar */}
      <div className="bg-slate-900 text-white px-10 py-5 flex justify-between items-center shadow-lg">

        <div>

          <h1 className="text-3xl font-bold text-cyan-400">
            OncoBone AI
          </h1>

          <p className="text-slate-400 text-sm">
            Bone Tumor Detection System
          </p>

        </div>

        <button
          onClick={() => setPage("dashboard")}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
        >
          Back
        </button>

      </div>

      <div className="max-w-7xl mx-auto p-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800 mb-3">
            Patient Prediction Form
          </h1>

          <p className="text-slate-500 text-lg">
            Enter patient clinical information for tumor risk analysis
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Card Header */}
          <div className="bg-cyan-500 text-white px-10 py-6">

            <h2 className="text-3xl font-bold">
              Patient Clinical Details
            </h2>

          </div>

          {/* Form */}
          <form className="p-10">

            {/* Patient Info */}
            <div className="mb-10">

              <h3 className="text-2xl font-bold text-slate-700 mb-6">
                Patient Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-slate-600 font-semibold mb-2">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    name="patient_name"
                    placeholder="Enter Patient Name"
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
                  />

                </div>

                <div>

                  <label className="block text-slate-600 font-semibold mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter Age"
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
                  />

                </div>

              </div>

            </div>

            {/* Medical Data */}
            <div>

              <h3 className="text-2xl font-bold text-slate-700 mb-6">
                Tumor Analysis Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[
                  "tumor_size",
                  "bone_density",
                  "bone_texture",
                  "cell_irregularity",
                  "calcification",
                  "growth_rate",
                  "pain_score",
                  "inflammation",
                  "metastasis_risk",
                  "biomarker"
                ].map((key) => (

                  <div key={key}>

                    <label className="block text-slate-600 font-semibold mb-2 capitalize">
                      {key.replaceAll("_", " ")}
                    </label>

                    <input
                      type="number"
                      name={key}
                      placeholder={`Enter ${key.replaceAll("_", " ")}`}
                      onChange={handleChange}
                      onKeyDown={handleEnter}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-cyan-500"
                    />

                  </div>

                ))}

              </div>

            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-10 bg-cyan-500 hover:bg-cyan-600 text-white py-5 rounded-2xl text-xl font-bold transition"
            >

              {loading ? "Analyzing Patient Data..." : "Predict Tumor Risk"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}