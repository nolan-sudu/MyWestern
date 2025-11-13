import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // form submission errors
  const [emailError, setEmailError] = useState(""); // live email validation
  const [passwordError, setPasswordError] = useState(""); // live password validation
  const { login } = useAuth();
  const navigate = useNavigate();

  // Live validation for email
  useEffect(() => {
    if (email && !email.endsWith("@uwo.ca")) {
      setEmailError("Email must be a @uwo.ca address.");
    } else {
      setEmailError("");
    }
  }, [email]);

  // Live validation for password
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[-_.\$])/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one capital letter and one special character (-, _, ., $)."
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check for live validation errors before submitting
    if (name.length > 20) {
      setError("Full name must be 20 characters or less.");
      return;
    }
    if (email.length > 16) {
      setError("Email must be 16 characters or less.");
      return;
    }
    if (emailError || passwordError) {
      setError("Please fix the errors above before submitting.");
      return;
    }

    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to Home
      </button>

      <div className="register-form-wrapper">
        <h1>Join MyWestern Now!</h1>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={28}
            required
          />
          <input
            type="email"
            placeholder="Email (@uwo.ca)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={16}
            required
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={25}
            required
          />
          {passwordError && <p className="error-text">{passwordError}</p>}

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}




