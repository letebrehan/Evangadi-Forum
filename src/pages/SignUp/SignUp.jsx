import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";
import styles from "./SignUp.module.css";

import topImage from "../../assets/images/top.svg";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    firs_tname: "",
    last_name: "",
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

    // Basic validation
    if (
      !formData.user_name ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/users/register", formData);
      setSuccessMessage(response.data.msg);
      // Reset form after successful registration
      setFormData({
        user_name: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      navigate("/users/login");
      console.log(response);
    } catch (error) {
      setError(
        error.response ? error.response.data.msg : "Something went wrong!"
      );
    }

    setLoading(false);
  };

  return (
    <section className={styles.registerContainer}>
      <div className={styles.leftwrapper}>
        <div className={styles.formContainer}>
          <h1>Join The Network</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                name="user_name"
                placeholder="Username"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

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

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Registering..." : "Agree and Join"}
            </button>
          </form>
          <h3 className={styles.terms}>
            I agree to the
            <Link
              className="create"
              to="https://www.evangadi.com/legal/privacy/"
              target="_blank"
            >
              privacy policy
            </Link>
            and{" "}
            <Link
              className="create"
              to="https://www.evangadi.com/legal/terms/"
              target="_blank"
            >
              terms of service.
            </Link>
          </h3>
          <h3>
            Already have an account? <Link to={"users/login"}>Log in</Link>
          </h3>
        </div>
      </div>
      {/* about and image  */}
      <div className={styles.rightWrapper}>
        <img src={topImage} alt="Access top courses and job training" />

        <div className={styles.textContainer}>
          <h1>
            Access To <span>Top Courses And Job Training</span>
          </h1>
        </div>
        <h4>
          Whether you are willing to share your knowledge or looking to meet
          mentors of your own, start by joining the network here.
        </h4>
      </div>
    </section>
  );
}

export default Register;
