import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function AdminLoginPage({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  
  const checkPassword = (password) => {

  setHasLength(password.length >= 8);
  setHasUpper(/[A-Z]/.test(password));
  setHasLower(/[a-z]/.test(password));
  setHasNumber(/[0-9]/.test(password));
  setHasSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(password));

};

  const handleLogin = () => {

    if (
      email === "paliyadev82@gmail.com" &&
      password === "8520"
    ) {

      localStorage.setItem(
        "adminAuth",
        "true"
      );

      setPage("admin");

    } else {

      alert("Invalid Admin Credentials");

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 w-[450px]">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-4"
        />

       <div className="relative mb-6">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => {
  setPassword(e.target.value);
  checkPassword(e.target.value);
}}
    className="w-full bg-slate-800 text-white p-4 rounded-xl"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

       <button
  onClick={handleLogin}
  className="w-full bg-cyan-400 text-black py-4 rounded-xl font-bold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-500/30"
>
  Login
</button>

      <button
  onClick={() => setPage("home")}
  className="w-full mt-4 bg-slate-800 text-white py-4 rounded-xl font-bold border border-slate-700 transition-all duration-300 hover:bg-slate-800 hover:text-white"
>
  Back
</button>

      </div>

    </div>
  );
}