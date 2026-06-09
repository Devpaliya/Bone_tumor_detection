import { useEffect } from "react";
import { useState } from "react";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionPage from "./pages/PredictionPage";
import HistoryPage from "./pages/HistoryPage";
import ResultPage from "./pages/ResultPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import ManageDoctorsPage from "./pages/ManageDoctorsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordRequestsPage from "./pages/PasswordRequestsPage";

import "./print.css";

function App() {
  const [page, setPage] = useState(
  localStorage.getItem("page") || "home"
   );

  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [previousPage, setPreviousPage] = useState("");
  useEffect(() => {
  localStorage.setItem("page", page);
}, [page]);

  return (
    <>
      {page === "home" && (
        <HomePage setPage={setPage} />
      )}

      {page === "login" && (
        <LoginPage setPage={setPage} />
      )}

      {page === "register" && (
        <RegisterPage setPage={setPage} />
      )}

     {page === "dashboard" && (
  <DashboardPage
    setPage={setPage}
    setPreviousPage={setPreviousPage}
  />
)}

    {page === "admin" && (
  <AdminPage
    setPage={setPage}
    setPreviousPage={setPreviousPage}
  />
)}

      {page === "prediction" && (
        <PredictionPage
          setPage={setPage}
          setPrediction={setPrediction}
          setConfidence={setConfidence}
        />
      )}
      {page === "forgotPassword" && (
  <ForgotPasswordPage
    setPage={setPage}
  />
)}
{page === "passwordRequests" && (
  <PasswordRequestsPage
    setPage={setPage}
  />
)}
      {page === "adminLogin" && (
         <AdminLoginPage setPage={setPage} />
       )} 

      {page === "result" && (
        <ResultPage
          prediction={prediction}
          confidence={confidence}
          setPage={setPage}
        />
      )}

   {page === "history" && (
  <HistoryPage
    setPage={setPage}
    previousPage={previousPage}
    setSelectedPatient={setSelectedPatient}
  />
)}

      {page === "profile" && (
        <ProfilePage setPage={setPage} />
      )}

      {page === "manageDoctors" && (
        <ManageDoctorsPage setPage={setPage} />
      )}

     {page === "patientDetails" && (
  <PatientDetailsPage
    patient={selectedPatient}
    setPage={setPage}
  />
)}
    </>
  );
}

export default App;

