export default function ProfilePage({ setPage }) {

  const doctor = JSON.parse(
    localStorage.getItem("doctor")
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          Doctor Profile
        </h1>

        <button
          onClick={() => setPage("dashboard")}
          className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold"
        >
          Back
        </button>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-3xl">

        <h2 className="text-3xl font-bold mb-8">
          Profile Information
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            <span className="font-bold text-cyan-400">
              Name:
            </span>
            {" "}
            {doctor?.fullName}
          </p>

          <p>
            <span className="font-bold text-cyan-400">
              Email:
            </span>
            {" "}
            {doctor?.email}
          </p>

          <p>
            <span className="font-bold text-cyan-400">
              Hospital:
            </span>
            {" "}
            {doctor?.hospitalName}
          </p>

          <p>
            <span className="font-bold text-cyan-400">
              Medical ID:
            </span>
            {" "}
            {doctor?.medicalId}
          </p>

          <p>
            <span className="font-bold text-cyan-400">
              Specialization:
            </span>
            {" "}
            {doctor?.specialization}
          </p>

        </div>

      </div>

    </div>
  );
}