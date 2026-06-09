export default function PatientDetailsPage({
  patient,
  setPage
}) {

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        No Patient Selected
      </div>
    );
  }

  const formattedDate = patient.createdAt
    ? new Date(patient.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    : "N/A";

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <button
        onClick={() => setPage("history")}
        className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold mb-8"
      >
        Back
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Patient Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <p><strong>Name:</strong> {patient.patient_name || "N/A"}</p>
          <p><strong>Age:</strong> {patient.age || "N/A"}</p>

          <p><strong>Tumor Size:</strong> {patient.tumor_size || "N/A"}</p>
          <p><strong>Bone Density:</strong> {patient.bone_density || "N/A"}</p>

          <p><strong>Bone Texture:</strong> {patient.bone_texture || "N/A"}</p>
          <p><strong>Cell Irregularity:</strong> {patient.cell_irregularity || "N/A"}</p>

          <p><strong>Calcification:</strong> {patient.calcification || "N/A"}</p>
          <p><strong>Growth Rate:</strong> {patient.growth_rate || "N/A"}</p>

          <p><strong>Pain Score:</strong> {patient.pain_score || "N/A"}</p>
          <p><strong>Inflammation:</strong> {patient.inflammation || "N/A"}</p>

          <p><strong>Metastasis Risk:</strong> {patient.metastasis_risk || "N/A"}</p>
          <p><strong>Biomarker:</strong> {patient.biomarker || "N/A"}</p>

          <p>
            <strong>Prediction:</strong>{" "}
            <span
              className={
                patient.prediction === "High Risk"
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {patient.prediction}
            </span>
          </p>

          <p>
            <strong>Doctor:</strong>{" "}
            {patient.doctorName || "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {patient.doctorEmail || "N/A"}
          </p>

          <p>
            <strong>Date & Time:</strong>{" "}
            {formattedDate}
          </p>

        </div>

      </div>

    </div>
  );
}