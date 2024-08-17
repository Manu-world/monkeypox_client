import React, { createContext, useState, useEffect } from "react";
import { login, logout, register } from "../api/auth";

const AuthContext = createContext();

// src/contexts/AuthContext.js
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Add token state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("authToken");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken); // Set token from localStorage
    }
    setLoading(false);
  }, []);

  const handleLogin = async (userData) => {
    try {
      const { token, user } = await login(userData);
      console.log("context login", user);

      // Store the token correctly in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token); // Set token after login
    } catch (error) {
      console.error("Login failed", error.message);
      throw new Error("Invalid email or password"); // Throw error to be caught in the form
    }
  };

  const handleRegister = async (userData) => {
    try {
      const { token, user } = await register(userData);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token); // Set token after registration

      return { success: true, user, token }; // Return a success response
    } catch (error) {
      console.error("Registration failed", error);
      return {
        success: false,
        message: error.message || "Registration failed",
      }; // Return a failure response
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null); // Clear token on logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token, // Expose token to consumers
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
