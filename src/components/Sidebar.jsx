import React from "react";

const Sidebar = ({ isOpen, onClose, history }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-3000 ease-in-out md:static md:translate-x-0 md:w-[54%] md:px-8 md:pb-8 md:bg-gray-100 overflow-y-scroll md:overflow-y-auto bg-white scroll-m-7`}>
      <div className="flex justify-between items-center mx-4 sticky top-0 bg-white z-10">
        <div className="flex text-lg text-gray-500 sm:hidden py-4">History</div>
        <button onClick={onClose} className="md:hidden">
          {/* Close Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="bg-white sm:bg-transparent h-full sm:h-auto">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No history</p>
        ) : (
          history.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <span className="text-blue-500 mr-4 text-lg font-semibold">
                  {file.prediction.confidence.toFixed(2)}%
                </span>
                <div>
                  <p
                    className={`text-gray-700 font-semibold ${
                      file.prediction.label === "Negative"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>
                    {file.prediction.label}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(file.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={`data:${file.image.contentType};base64,${file.image.buffer}`}
                  alt="Prediction"
                  className="h-16 w-16 object-cover rounded"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
