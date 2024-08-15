import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpeg";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDetectClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      console.log("isLoggedIn " + isLoggedIn);
      navigate("/file_upload");
    } else {
      console.log("is not logged in");
      navigate("/login");
    }
  };

  return (
    <div className="bg-white h-screen overflow-hidden min-h-screen">
      <div className="relative h-full isolate px-6 pt-5 lg:px-8">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-55"></div>
        <img
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center bg-no-repeat"
          src={bg}
          alt="pandemic background"
        />
        <div className="relative z-10">
          <div className="relative z-10">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-100/20 hover:ring-gray-100">
                  Read a lot more on monkeypox.{" "}
                  <a
                    href="https://rb.gy/1bafn8"
                    className="font-semibold text-indigo-600"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read it <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Monkeypox Detection
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  Instantly assess your risk of monkeypox by uploading an image
                  of your skin concerns. A quick system to detect monkeypox.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/detect"
                    onClick={handleDetectClick}
                    className="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Detect
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true">
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
