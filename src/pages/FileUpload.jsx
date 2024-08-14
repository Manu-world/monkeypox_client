import React, { useState, useContext, useEffect } from "react";
import {
  predictImage,
  getUserHistory,
  downloadUserHistoryPDF,
} from "../api/image";
import AuthContext from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData = await getUserHistory(token);
        setHistory(historyData);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const result = await predictImage(file, token);
      setResult(result);
      const updatedHistory = await getUserHistory(token);
      setHistory(updatedHistory);
    } catch (err) {
      console.error(err);
      setError("Failed to predict the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadUserHistoryPDF(token);
    } catch (err) {
      console.error("Failed to download PDF", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Handle navigation to home or login screen here
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onMenuClick={toggleSidebar} onLogout={handleLogout} />
      <div className="flex justify-center items-center h-screen w-full bg-gray-100 overflow-y-clip">
        <div className="w-[80%] bg-white h-[80vh] rounded-lg shadow-lg flex overflow-y-scroll scroll-smooth">
          <div className="w-full md:w-[46%] p-8 flex flex-col justify-center items-center">
            {/* File Upload Section */}
            <div className="w-full">
              <div className="w-full h-40 border-4 border-dashed border-blue-500 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-4 text-gray-500">
                  Prediction Result
                </h3>
                {result ? (
                  <div>
                    {loading ? (
                      <p className="text-gray-500">Predicting...</p>
                    ) : (
                      <>
                        <p className={`text-gray-500`}>
                          Label:{" "}
                          <span
                            className={`${
                              result.label === "Negative"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                            {result.label}
                          </span>
                        </p>
                        <p className="text-gray-500">
                          Confidence: {result.confidence.toFixed(2)}%
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="my-3">
                    <p className="text-gray-500">Select a file and hit Check</p>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-gray-500 px-4 py-2 rounded-lg my-2 border-2 border-blue-500 w-full"
                />
                <div className="w-full flex justify-center mt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {loading ? "Predicting..." : "Check"}
                  </button>
                </div>
              </form>
              <hr className="w-full border-gray-300 my-4" />
              <div className="w-full flex gap-2 items-center justify-center mt-4">
                <p className="text-gray-500 text-center">
                  Download history as a PDF
                </p>
                <button
                  onClick={handleDownloadPDF}
                  className="bg-blue-500 text-white p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            history={history}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
