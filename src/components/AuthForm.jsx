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
  const handleLabelClick = (inputName) => {
    document.querySelector(`input[name="${inputName}"]`).focus();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {type === "register" && (
        <div className="relative">
          <label
            onClick={() => handleLabelClick("username")}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all cursor-text ${
              focusedField === "username" || formData.username
                ? "-top-[3%] left-2 bg-white rounded-lg  text-gray-500"
                : "text-gray-400"
            }`}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus("username")}
            onBlur={handleBlur}
            className="block w-full p-2 pt-3 border rounded"
            required
          />
        </div>
      )}
      <div className="relative">
        <label
          onClick={() => handleLabelClick("email")}
          className={`absolute left-3 cursor-text top-1/2 transform -translate-y-1/2 transition-all ${
            focusedField === "email" || formData.email
              ? "-top-[3%] left-2 bg-white rounded-lg  text-gray-500"
              : "text-gray-400"
          }`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          className="block w-full p-2 pt-3 border rounded"
          required
        />
      </div>
      <div className="relative">
        <label
          onClick={() => handleLabelClick("password")}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all ${
            focusedField === "password" || formData.password
              ? "-top-[3%] left-2 bg-white rounded-lg  text-gray-500"
              : "text-gray-400"
          }`}>
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
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
            onClick={() => handleLabelClick("confirmPassword")}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all cursor-text ${
              focusedField === "confirmPassword" || formData.confirmPassword
                ? "-top-[3%] left-2 bg-white rounded-lg text-gray-500"
                : "text-gray-400"
            }`}>
            Confirm Password
          </label>
          <input
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
