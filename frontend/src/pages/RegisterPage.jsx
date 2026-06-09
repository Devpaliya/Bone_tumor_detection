import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function RegisterPage({ setPage }) {

  const [formData, setFormData] = useState({
    fullName: "",
    hospitalName: "",
    medicalId: "",
    specialization: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    if (
      !formData.fullName ||
      !formData.hospitalName ||
      !formData.medicalId ||
      !formData.specialization ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please Fill All Fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords Do Not Match");
      return;
    }
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(formData.password)) {
  alert(
    "Password must contain:\n\n" +
    "• Minimum 8 characters\n" +
    "• One uppercase letter\n" +
    "• One lowercase letter\n" +
    "• One number\n" +
    "• One special character"
  );
  return;
}
    


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            hospitalName: formData.hospitalName,
            medicalId: formData.medicalId,
            specialization: formData.specialization,
            email: formData.email,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Doctor Registration Successful");
        setPage("login");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 w-full max-w-2xl">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-3">
          Doctor Registration
        </h1>

        <p className="text-slate-400 text-center mb-10">
          Register to access OncoBone AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Hospital Name
            </label>

            <input
              type="text"
              name="hospitalName"
              placeholder="Enter Hospital Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Medical ID
            </label>

            <input
              type="text"
              name="medicalId"
              placeholder="Enter Medical ID"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              placeholder="Orthopedic, Oncology..."
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          <div>
  <label className="block mb-2 text-slate-300">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter Password"
   onChange={(e) => {
  handleChange(e);
  checkPassword(e.target.value);
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

         <div className="md:col-span-2">
  <label className="block mb-2 text-slate-300">
    Confirm Password
  </label>
  <div className="md:col-span-2">
  
</div>

  <div className="relative">

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="Confirm Password"
 onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleRegister();
        }
      }}
      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
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
    <div className="mt-2 text-sm bg-slate-800 p-4 rounded-xl">

    <p className={hasLength ? "text-green-500" : "text-red-500"}>
      ✓ 8+ characters
    </p>

    <p className={hasUpper ? "text-green-500" : "text-red-500"}>
      ✓ Uppercase letter
    </p>

    <p className={hasLower ? "text-green-500" : "text-red-500"}>
      ✓ Lowercase letter
    </p>

    <p className={hasNumber ? "text-green-500" : "text-red-500"}>
      ✓ Number
    </p>

    <p className={hasSpecial ? "text-green-500" : "text-red-500"}>
      ✓ Special character
    </p>

  </div>

  </div>
</div>

        </div>

        <button
          onClick={handleRegister}
          className="w-full mt-10 bg-cyan-400 text-black py-4 rounded-2xl font-bold hover:bg-cyan-300 transition"
        >
          Register Doctor
        </button>

        <button
          onClick={() => setPage("login")}
          className="w-full mt-5 border border-cyan-400 text-cyan-300 py-4 rounded-2xl hover:bg-cyan-400 hover:text-black transition"
        >
          Back To Login
        </button>

      </div>

    </div>
  );
}