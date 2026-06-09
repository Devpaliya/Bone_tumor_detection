
import React, { useEffect, useState } from "react";

export default function DashboardPage({
  setPage,
  setPreviousPage
}) {

  const [stats, setStats] = useState({
    total_predictions: 0,
    high_risk: 0,
    low_risk: 0
  });

  const [recentPatients, setRecentPatients] = useState([]);

  const doctor = JSON.parse(
  localStorage.getItem("doctor") || "{}"
);

useEffect(() => {

  if (!doctor.email) return;

  fetch(
    `http://127.0.0.1:8000/doctor/stats/${doctor.email}`
  )
    .then(res => res.json())
    .then(data => setStats(data));

  fetch(
    `http://127.0.0.1:8000/doctor/recent/${doctor.email}`
  )
    .then(res => res.json())
    .then(data => setRecentPatients(data));

}, [doctor.email]);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-cyan-400">
            Doctor Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome to OncoBone AI
          </p>

        </div>

        <button
          onClick={() => setPage("home")}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

      {/* Doctor Card */}
      <div className="mb-8 bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-xl text-slate-400">
          Logged In Doctor
        </h2>

        <h1 className="text-3xl font-bold text-cyan-400">
          {doctor.fullName}
        </h1>

        <p className="text-slate-400 mt-2">
          {doctor.email}
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.total_predictions}
          </h2>

          <p className="text-slate-400 mt-3">
            Total Predictions
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-red-400">
            {stats.high_risk}
          </h2>

          <p className="text-slate-400 mt-3">
            High Risk Cases
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-400">
            {stats.low_risk}
          </h2>

          <p className="text-slate-400 mt-3">
            Low Risk Cases
          </p>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <button
          onClick={() => setPage("prediction")}
          className="bg-cyan-400 text-black p-6 rounded-3xl font-bold hover:bg-cyan-300 transition"
        >
          🔬 New Prediction
        </button>

       <button
  onClick={() => {
    setPreviousPage("dashboard");
    setPage("history");
  }}
  className="border border-cyan-400 text-cyan-300 p-6 rounded-3xl hover:bg-cyan-400 hover:text-black transition"
>
  📋 Prediction History
</button>

        <button
          onClick={() => setPage("profile")}
          className="border border-cyan-400 text-cyan-300 p-6 rounded-3xl hover:bg-cyan-400 hover:text-black transition"
        >
          👨‍⚕️ My Profile
        </button>

        

      </div>

      {/* Recent Patients */}
      <div className="mt-12 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

        <div className="px-8 py-5 border-b border-slate-800">

          <h2 className="text-2xl font-bold text-cyan-400">
            Recent Patients
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>
                <th className="text-left p-4">
                  Patient
                </th>

                <th className="text-left p-4">
                  Result
                </th>
              </tr>

            </thead>

            <tbody>

              {recentPatients.length === 0 ? (

                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center text-slate-400"
                  >
                    No patients found
                  </td>
                </tr>

              ) : (

                recentPatients.map((patient) => (

                  <tr
                    key={patient._id}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4">
                      {patient.patient_name}
                    </td>

                    <td className="p-4">
                      {patient.prediction}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
