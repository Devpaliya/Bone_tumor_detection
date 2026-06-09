import { useEffect, useState } from "react";

export default function HistoryPage({
  setPage,
  previousPage,
  setSelectedPatient
}) {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  useEffect(() => {

    fetch("https://bone-tumor-detection-1.onrender.com/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));

  }, []);

  const filteredHistory = history.filter((item) => {

    const matchesSearch =

      item.patient_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.doctorName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesRisk =
      riskFilter === "All" ||
      item.prediction === riskFilter;

    return matchesSearch && matchesRisk;

  });

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-cyan-400">
            Prediction History
          </h1>

          <p className="text-slate-400 mt-2">
            Search, filter and view patient records
          </p>

        </div>

       <button
  onClick={() => setPage(previousPage)}
  className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold"
>
  Back
</button>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Patient or Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 outline-none focus:border-cyan-400"
        />

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-3"
        >
          <option>All</option>
          <option>High Risk</option>
          <option>Low Risk</option>
        </select>

      </div>

      {/* Results Count */}
      <div className="mb-6 text-slate-400">

        Records Found: {filteredHistory.length}

      </div>

      {/* History Cards */}
      <div className="space-y-6">

        {filteredHistory.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center text-slate-400">

            No Records Found

          </div>

        ) : (

          filteredHistory.map((item, index) => (

            <div
              key={index}
              onClick={() => {
                setSelectedPatient(item);
                setPage("patientDetails");
              }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex justify-between items-center cursor-pointer hover:border-cyan-400 hover:scale-[1.01] transition"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {item.patient_name}
                </h2>

                <p className="text-slate-400 mt-2">
                  Age : {item.age}
                </p>

                <p className="text-slate-400 mt-1">
                  Doctor : {item.doctorName || "N/A"}
                </p>

              </div>

              <div className="text-right">

                <h2
                  className={`text-2xl font-bold ${
                    item.prediction === "High Risk"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {item.prediction}
                </h2>

                <p className="text-slate-300 mt-2">
                  Tumor Size : {item.tumor_size}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}