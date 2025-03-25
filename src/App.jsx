import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axiosInstance from "./API/axios";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

import EditQuestion from "./pages/EditQuestion/EditQuestion";

import { UserContext } from "./Context/UserProvider";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail";
import ProtectedRoute from "./context/ProtectedRoutes";

function App() {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axiosInstance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({ user_name: data.user_name, user_id: data.user_id });
    } catch (error) {
      setError("Failed to authenticate. Please log in again.");
      navigate("/users/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="loader">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/questions/update/:question_id"
          element={<EditQuestion />}
        />
        <Route path="questions/:question_id" element={<QuestionDetail />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
            <HomePage />
           </ProtectedRoute>
          }
        />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
            <AskQuestion />
           </ProtectedRoute>
          }
        />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
