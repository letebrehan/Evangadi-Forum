import React, { useState } from "react";
import axiosInstance from "../../API/axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import topImage from "../../assets/images/top.svg"; // Image for the login page

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Both fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/users/login", formData);
      setSuccessMessage(response.data.msg);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log("Login error:", error);
      setError(
        error.response?.data?.msg || "Something went wrong! Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <section className={styles.loginContainer}>
      <div className={styles.leftWrapper}>
        <div className={styles.formContainer}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {successMessage && (
              <div className={styles.success}>{successMessage}</div>
            )}

            <h3 className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot your password?</Link>
            </h3>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <h3>
            Don't have an account? <Link to="/users/register">Sign up</Link>
          </h3>
        </div>
      </div>

      {/* About and image section */}
      <div className={styles.rightWrapperLogin}>
        <div className={styles.overridephoto}>
          <img src={topImage} alt="Top Courses and Job Training" />
          <div className={styles.textContainer}>
            <h1>
              <span>5 Stage</span> Unique Learning Method
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
