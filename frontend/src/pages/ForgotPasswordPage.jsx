import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function ForgotPasswordPage({ setPage }) {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [hasLength, setHasLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showRules, setShowRules] = useState(false);

  const checkPassword = (password) => {

  setHasLength(password.length >= 8);
  setHasUpper(/[A-Z]/.test(password));
  setHasLower(/[a-z]/.test(password));
  setHasNumber(/[0-9]/.test(password));
  setHasSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(password));

 };
  const sendRequest = async () => {

    if (!email) {
      alert("Enter Email");
      return;
    }

    const response = await fetch(
      "https://bone-tumor-detection-1.onrender.com/request-password-reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      }
    );

    const data = await response.json();

    alert(data.message);
  };
  const checkStatus = async () => {

  if (!email) {
    alert("Enter Email");
    return;
  }

  const response = await fetch(
    `https://bone-tumor-detection-1.onrender.com/password-reset-status/${email}`
  );

  const data = await response.json();

  setStatus(data.status);
};

  const resetPassword = async () => {

    if (!email || !newPassword || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "https://bone-tumor-detection-1.onrender.com/reset-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          newPassword
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      setPage("login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[500px]">

        <h1 className="text-4xl text-yellow-400 font-bold mb-8">
          Password Reset
        </h1>

        <input
          type="email"
          placeholder="Doctor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-4"
        />
        

        <button
          onClick={sendRequest}
          className="w-full bg-cyan-400 text-black py-4 rounded-xl font-bold mb-6"
        >
          Send Request To Admin
        </button>
        <button
  onClick={checkStatus}
  className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold mb-6"
>
  Check Approval Status
</button>
{status && (
  <div className="text-center text-yellow-400 font-bold mb-6">
    Status: {status}
  </div>
)}

       <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onFocus={() => setShowRules(true)}
    onChange={(e) => {
      setNewPassword(e.target.value);
      checkPassword(e.target.value);
      
    }}
    className="w-full p-4 rounded-xl bg-slate-800 text-white mb-4"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>
{showRules && (
  <div className="mb-3 text-xs bg-slate-800 border border-slate-700 p-2 rounded-lg">

    <p className={hasLength ? "text-green-400" : "text-red-400"}>
      ✓ 8+ chars
    </p>

    <p className={hasUpper ? "text-green-400" : "text-red-400"}>
      ✓ Uppercase
    </p>

    <p className={hasLower ? "text-green-400" : "text-red-400"}>
      ✓ Lowercase
    </p>

    <p className={hasNumber ? "text-green-400" : "text-red-400"}>
      ✓ Number
    </p>

    <p className={hasSpecial ? "text-green-400" : "text-red-400"}>
      ✓ Special
    </p>

  </div>
)}
       <div className="relative">

  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => {
      setConfirmPassword(e.target.value);
    }}
    className="w-full p-4 rounded-xl bg-slate-800 text-white mb-6"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

        <button
          onClick={resetPassword}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-bold"
        >
          Reset Password
        </button>

        <button
          onClick={() => setPage("login")}
          className="w-full mt-4 border border-cyan-400 text-cyan-300 py-4 rounded-xl"
        >
          Back To Login
        </button>

      </div>

    </div>
  );
}