import { useEffect, useState } from "react";

export default function PasswordRequestsPage({
  setPage
}) {

  const [requests, setRequests] =
    useState([]);

  useEffect(() => {

    fetch(
      "https://bone-tumor-detection-1.onrender.com/admin/password-requests"
    )
      .then((res) => res.json())
      .then((data) => setRequests(data));

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-yellow-400">
          Password Reset Requests
        </h1>

        <button
          onClick={() => setPage("admin")}
          className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold"
        >
          Back
        </button>

      </div>

      <table className="w-full bg-slate-900 rounded-2xl overflow-hidden">

        <thead>

          <tr className="bg-slate-800">

            <th className="p-4">
              Doctor Email
            </th>

            <th className="p-4">
              Status
            </th>

            <th className="p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {requests.map((item) => (

            <tr
              key={item._id}
              className="border-b border-slate-800"
            >

              <td className="p-4">
                {item.email}
              </td>

              <td className="p-4">

                {item.approved
                  ? "Approved"
                  : "Pending"}

              </td>

              <td className="p-4">

                {!item.approved && (

                  <button
                    onClick={async () => {

                      await fetch(
                        `https://bone-tumor-detection-1.onrender.com/approve-password-reset/${item._id}`,
                        {
                          method: "PUT"
                        }
                      );

                      window.location.reload();

                    }}
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Approve
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}