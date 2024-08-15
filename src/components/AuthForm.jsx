import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // Track which input is focused

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const { email, password, username } = formData;
      try {
        await register({ email, password, username });
        navigate("/login");
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    } else if (type === "login") {
      const { email, password } = formData;
      try {
        await login({ email, password });
        navigate("/file_upload");
      } catch (err) {
        setError(err.message || "Invalid email or password");
      }
    }
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {type === "register" && (
        <div className="relative">
          <label
            htmlFor="username"
            className={`absolute left-3 transition-all duration-300 ${
              focusedField === "username" || formData.username
                ? "text-sm font-normal -top-3 bg-slate-50 text-gray-500"
                : "text-base top-1/2 -translate-y-1/2 text-gray-400"
            }`}>
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus("username")}
            onBlur={handleBlur}
            className="block w-full p-2 pt-3 border rounded"
            autoComplete="username"
            required
          />
        </div>
      )}
      <div className="relative">
        <label
          htmlFor="email"
          className={`absolute left-3 transition-all duration-300 ${
            focusedField === "email" || formData.email
              ? "text-sm font-normal -top-3 bg-slate-50 text-gray-500"
              : "text-base top-1/2 -translate-y-1/2 text-gray-400"
          }`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          className="block w-full p-2 pt-3 border rounded"
          autoComplete="email"
          required
        />
      </div>
      <div className="relative">
        <label
          className={`absolute left-3 transition-all duration-300 ${
            focusedField === "password" || formData.password
              ? "text-sm font-normal -top-3 bg-slate-50 text-gray-500"
              : "text-base top-1/2 -translate-y-1/2 text-gray-400"
          }`}
          htmlFor="password">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => handleFocus("password")}
          onBlur={handleBlur}
          className="block w-full p-2 pt-3 border rounded pr-10"
          required
        />
        <button
          type="button"
          className="absolute top-[30%] right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {type === "register" && (
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className={`absolute left-3 transition-all duration-300 ${
              focusedField === "confirmPassword" || formData.confirmPassword
                ? "text-sm font-normal -top-3 bg-slate-50 text-gray-500"
                : "text-base top-1/2 -translate-y-1/2 text-gray-400"
            }`}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={handleBlur}
            className="block w-full p-2 pt-3 border rounded pr-10"
            required
          />
          <button
            type="button"
            className="absolute top-[30%] right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
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
