// src/components/AuthForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "register") {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      // For registration, send all fields
      const { email, password, username } = formData;
      try {
        await register({ email, password, username });
        navigate("/login");
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    } else if (type === "login") {
      // For login, send only email and password
      const { email, password } = formData;
      try {
        await login({ email, password });
        navigate("/file_upload");
      } catch (err) {
        setError(err.message || "Invalid email or password");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {type === "register" && (
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
      </div>
      {type === "register" && (
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
