import React, { useEffect, useState } from "react";

export default function AdminPage({ setPage, setPreviousPage }) {
  const [stats, setStats] = useState({
    doctors: 0,
    approved: 0,
    pending: 0,
    blocked: 0,
    predictions: 0,
    high_risk: 0,
    low_risk: 0
  });

  const [recentPredictions, setRecentPredictions] = useState([]);
  const [doctorAnalytics, setDoctorAnalytics] = useState([]);
  const [passwordCount, setPasswordCount] = useState(0);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, ...data })))
      .catch((err) => console.error("Error fetching stats:", err));

    fetch("http://127.0.0.1:8000/admin/recent-predictions")
      .then((res) => res.json())
      .then((data) => setRecentPredictions(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching predictions:", err));
      fetch(
  "http://127.0.0.1:8000/admin/doctor-analytics"
)
  .then((res) => res.json())
  .then((data) => setDoctorAnalytics(data))
  .catch((err) => console.log(err));
  
  fetch("http://127.0.0.1:8000/admin/password-request-count")
  .then((res) => res.json())
  .then((data) => setPasswordCount(data.count))
  .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-10 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">OncoBone AI</h1>
          <p className="text-slate-400 text-sm">Admin Control Panel</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            setPage("home");
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">Admin Dashboard</h1>
          <p className="text-slate-400 text-lg">
            Monitor doctors, predictions, and hospital AI system
          </p>
        </div>

        {/* Unified Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Registered Doctors</p>
            <h2 className="text-5xl font-bold text-green-400 mt-3">{stats.doctors}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Approved Doctors</p>
            <h2 className="text-5xl font-bold text-emerald-400 mt-3">{stats.approved}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Pending Doctors</p>
            <h2 className="text-5xl font-bold text-yellow-400 mt-3">{stats.pending}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Blocked Doctors</p>
            <h2 className="text-5xl font-bold text-red-500 mt-3">{stats.blocked}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Total Predictions</p>
            <h2 className="text-5xl font-bold text-blue-400 mt-3">{stats.predictions}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">High Risk Cases</p>
            <h2 className="text-5xl font-bold text-red-400 mt-3">{stats.high_risk}</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm uppercase font-semibold">Low Risk Cases</p>
            <h2 className="text-5xl font-bold text-teal-400 mt-3">{stats.low_risk}</h2>
          </div>
        </div>

        {/* Action Cards */}
       {/* Action Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

  {/* Doctors Management */}
  <div className="bg-slate-900 rounded-3xl border border-slate-800 flex flex-col justify-between p-8">
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Doctors Management
      </h2>

      <p className="text-slate-400 mb-6">
        Manage all registered doctors in the system.
      </p>
    </div>

    <button
      onClick={() => setPage("manageDoctors")}
      className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-300 w-fit transition"
    >
      Open Manage Doctors
    </button>
  </div>

  {/* Prediction History */}
  <div className="bg-slate-900 rounded-3xl border border-slate-800 flex flex-col justify-between p-8">
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Prediction History
      </h2>

      <p className="text-slate-400 mb-6">
        View all patient predictions stored in MongoDB.
      </p>
    </div>

    <button
      onClick={() => {
        setPreviousPage("admin");
        setPage("history");
      }}
      className="border border-cyan-400 text-cyan-300 px-6 py-3 rounded-xl hover:bg-cyan-400 hover:text-black w-fit transition"
    >
      Open History
    </button>
  </div>

  {/* Password Reset Requests */}
  <div className="bg-slate-900 rounded-3xl border border-slate-800 flex flex-col justify-between p-8">

    <div>

      <div className="flex items-center gap-3 mb-2">

        <h2 className="text-2xl font-bold">
          Password Reset Requests
        </h2>

        {passwordCount > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {passwordCount}
          </div>
        )}

      </div>

      <p className="text-slate-400 mb-6">
        Approve doctor password reset requests.
      </p>

    </div>

    <button
      onClick={() => setPage("passwordRequests")}
      className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 w-fit transition"
    >
      Manage Requests
    </button>

  </div>

</div>
          {/* Doctor Analytics */}
<div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden mb-10">

  <div className="px-8 py-5 border-b border-slate-800">

    <h2 className="text-2xl font-bold text-cyan-400">
      Doctor Analytics
    </h2>

  </div>

  <table className="w-full">

    <thead className="bg-slate-800">

      <tr>
        <th className="p-4 text-left">Doctor</th>
        <th className="p-4 text-left">Total</th>
        <th className="p-4 text-left">High Risk</th>
        <th className="p-4 text-left">Low Risk</th>
      </tr>

    </thead>

    <tbody>

      {doctorAnalytics.map((doctor, index) => (

        <tr
          key={index}
          className="border-t border-slate-800"
        >

          <td className="p-4">
            {doctor.doctor}
          </td>

          <td className="p-4">
            {doctor.total}
          </td>

          <td className="p-4 text-red-400">
            {doctor.high}
          </td>

          <td className="p-4 text-green-400">
            {doctor.low}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
        {/* Recent Predictions */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-cyan-400">Recent Predictions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-slate-300">
                <tr>
                  <th className="text-left p-4">Patient</th>
                  <th className="text-left p-4">Doctor</th>
                  <th className="text-left p-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-slate-400">
                      No prediction records found
                    </td>
                  </tr>
                ) : (
                  recentPredictions.map((item) => (
                    <tr key={item._id || Math.random().toString()} className="border-t border-slate-800 hover:bg-slate-800/50 transition">
                      <td className="p-4 font-medium">{item.patient_name || "Unknown"}</td>
                      <td className="p-4 text-slate-300">{item.doctorName || "N/A"}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.prediction?.toLowerCase().includes("high") 
                            ? "bg-red-500/20 text-red-400" 
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {item.prediction || "No Data"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
