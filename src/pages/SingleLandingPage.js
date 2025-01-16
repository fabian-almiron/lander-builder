import React from "react";

const SingleLandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
      <p className="text-lg mb-6">This is a simple landing page template.</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-400">
        Get Started
      </button>
    </div>
  );
};

export default SingleLandingPage;