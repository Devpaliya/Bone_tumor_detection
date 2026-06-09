import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function LoginPage({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  
  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

     if (data.success) {

  localStorage.setItem(
    "doctor",
    JSON.stringify(data)
  );

  alert("Login Successful");

  setPage("dashboard");
}
      else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Server Connection Failed");

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-2">
          Doctor Login
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to access OncoBone AI
        </p>

        <div className="space-y-5">

          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
  <label className="block text-slate-300 mb-2">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      value={password}
     onChange={(e) => setPassword(e.target.value)}

      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleLogin();
        }
      }}
      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

  </div>
</div>
 <button
            onClick={handleLogin}
            className="w-full border border-cyan-400 text-cyan-300 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition"
          >
            Login
          </button>
<button
  onClick={() => setPage("forgotPassword")}
 className="w-full mt-5 border border-cyan-400 text-cyan-300 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition"
>
  Forgot Password?
</button>
          <button
            onClick={() => setPage("register")}
            className="w-full mt-5 border border-cyan-400 text-cyan-300 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition"
          >
            Register Doctor
          </button>

         

          <button
            onClick={() => setPage("home")}
            className="w-full border border-cyan-400 text-cyan-300 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition"
          >
            Back To Home
          </button>

        </div>

      </div>

    </div>
  );
}