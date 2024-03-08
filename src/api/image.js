// src/api/image.js
import axios from "axios";

const API_URL = "https://monkeypox-api.onrender.com/api/images/";

export const predictImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // Ensure the token is added here
    },
  };
  try {
    const response = await axios.post(`${API_URL}predict`, formData, config);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserHistory = async () => {
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

  if (!token) {
    throw new Error("No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Make the GET request
    const response = await axios.get(`${API_URL}history`, config);

    // Handle the response
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something else happened in setting up the request
      console.error("Error:", error.message);
    }
    throw error;
  }
};

// src/api/image.js

export const downloadUserHistoryPDF = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // Important to handle binary data
  };

  try {
    const response = await axios.get(`${API_URL}history/pdf`, config);
    // Create a new Blob from the response
    const blob = new Blob([response.data], { type: "application/pdf" });
    // Create a link element, set its href to the Blob URL, and click it
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "user_history.pdf";
    link.click();
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};
