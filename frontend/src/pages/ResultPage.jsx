
export default function ResultPage({

  prediction,
  confidence,
  setPage

}) {
  

  const highRisk = prediction === "High Risk";

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Top Result Banner */}
      <div
        className={`rounded-3xl border p-8 flex justify-between items-center ${
          highRisk
            ? "bg-red-500/10 border-red-500"
            : "bg-green-500/10 border-green-500"
        }`}
      >

        <div className="flex items-center gap-6">

          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-5xl font-bold ${
              highRisk
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            !
          </div>

          <div>

            <h1
              className={`text-6xl font-bold mb-3 ${
                highRisk
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {prediction}
            </h1>

            <p className="text-slate-300 text-xl">
              Immediate clinical evaluation recommended.
            </p>

          </div>

        </div>

        {/* Score Circle */}
       

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Risk Contribution */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

          <h2 className="text-3xl font-bold mb-8">
            Feature Risk Contribution
          </h2>

          {[
            ["Tumor Size", 90],
            ["Cell Irregularity", 88],
            ["Metastasis Risk", 85],
            ["Growth Rate", 82],
            ["Inflammation", 70],
            ["Pain Score", 88],
            ["Calcification", 86],
            ["Bone Texture", 25]
          ].map(([name, value], index) => (

            <div key={index} className="mb-5">

              <div className="flex justify-between mb-2">

                <span className="text-slate-300">
                  {name}
                </span>

                <span className="font-bold">
                  {Math.floor(value / 13)}
                </span>

              </div>

              <div className="w-full bg-slate-800 rounded-full h-3">

                <div
                  className={`h-3 rounded-full ${
                    value > 70
                      ? "bg-red-500"
                      : value > 40
                      ? "bg-yellow-400"
                      : "bg-cyan-400"
                  }`}
                  style={{ width: `${value}%` }}
                ></div>

              </div>

            </div>

          ))}

        </div>

        {/* Risk Drivers */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

          <h2 className="text-3xl font-bold mb-8">
            Top Risk Drivers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            {[
              ["Tumor Size", "7"],
              ["Cell Irregularity", "7"],
              ["Metastasis Risk", "7"],
              ["Growth Rate", "7"],
              ["Inflammation", "6"],
              ["Pain Score", "7"]
            ].map(([title, score], index) => (

              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div className="w-28 h-28 rounded-full border-8 border-cyan-400 flex items-center justify-center text-4xl font-bold text-cyan-400">

                  {score}

                </div>

                <p className="text-center mt-4 text-slate-300">
                  {title}
                </p>

              </div>

            ))}

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 mt-8 text-slate-300">

            Tumor size, cell irregularity, and metastasis
            risk are the strongest predictors in the AI model.

          </div>

        </div>

      </div>

      {/* Recommended Tests */}
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 mt-8">

        <h2 className="text-3xl font-bold mb-8">
          Recommended Diagnostic Tests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            ["MRI with contrast", "Critical"],
            ["CT-guided biopsy", "Critical"],
            ["Bone scintigraphy", "High"],
            ["PET-CT scan", "High"],
            ["CBC & tumor markers", "Medium"],
            ["Plain X-ray", "Low"]
          ].map(([test, level], index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >

              <h3 className="text-2xl font-bold mb-4">
                {test}
              </h3>

              <span
                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  level === "Critical"
                    ? "bg-red-500/20 text-red-400"
                    : level === "High"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : level === "Medium"
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "bg-green-500/20 text-green-300"
                }`}
              >
                {level}
              </span>

              <p className="text-slate-400 mt-5 leading-7">

                Recommended diagnostic procedure for
                further tumor analysis and evaluation.

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-5 mt-10">

        <button
          onClick={() => setPage("prediction")}
          className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-2xl font-bold text-lg"
        >
          New Prediction
        </button>

        <button
          onClick={() => window.print()}
          className="border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-2xl font-bold text-lg transition"
        >
          Print Report
        </button>

      </div>

    </div>
  );
}