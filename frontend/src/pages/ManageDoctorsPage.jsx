import { useEffect, useState } from "react";

export default function ManageDoctorsPage({ setPage }) {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          Manage Doctors
        </h1>

        <button
          onClick={() => setPage("admin")}
          className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold"
        >
          Back
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-2xl overflow-hidden">

          <thead>

            <tr className="bg-slate-800">

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Hospital</th>
              <th className="p-4">Medical ID</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Status</th>
              <th className="p-4">Block Status</th>
              <th className="p-4">Action</th>
              

            </tr>

          </thead>

          <tbody>

            {doctors.map((doctor) => (

              <tr
                key={doctor._id}
                className="border-b border-slate-800"
              >

               <td className="p-4">{doctor.fullName}</td>
<td className="p-4">{doctor.email}</td>
<td className="p-4">{doctor.hospitalName}</td>
<td className="p-4">{doctor.medicalId}</td>
<td className="p-4">{doctor.specialization}</td>

<td className="p-4">
  {doctor.approved ? "Approved" : "Pending"}
</td>

<td className="p-4">
  {doctor.isBlocked ? "Blocked" : "Active"}
</td>

<td className="p-4 flex gap-2">

  {!doctor.approved && (
    <button
      onClick={async () => {
        await fetch(
          `http://127.0.0.1:8000/approve-doctor/${doctor._id}`,
          {
            method: "PUT"
          }
        );

        window.location.reload();
      }}
      className="bg-green-500 px-3 py-2 rounded"
    >
      Approve
    </button>
  )}

  {doctor.isBlocked ? (
    <button
      onClick={async () => {
        await fetch(
          `http://127.0.0.1:8000/unblock-doctor/${doctor._id}`,
          {
            method: "PUT"
          }
        );

        window.location.reload();
      }}
      className="bg-blue-500 px-3 py-2 rounded"
    >
      Unblock
    </button>
  ) : (
    <button
      onClick={async () => {
        await fetch(
          `http://127.0.0.1:8000/block-doctor/${doctor._id}`,
          {
            method: "PUT"
          }
        );

        window.location.reload();
      }}
      className="bg-red-500 px-3 py-2 rounded"
    >
      Block
    </button>
  )}
<button
  onClick={async () => {

    if (!window.confirm("Delete this doctor?"))
      return;

    await fetch(
      `http://127.0.0.1:8000/doctor/${doctor._id}`,
      {
        method: "DELETE"
      }
    );

    window.location.reload();

  }}
  className="bg-red-700 px-3 py-2 rounded"
>
  Delete
</button>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}