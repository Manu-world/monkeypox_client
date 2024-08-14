// src/pages/RegisterPage.js
import React from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded-md shadow-md py-10 justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <AuthForm type="register" />
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
