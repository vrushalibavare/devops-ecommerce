import React from "react";

const BackgroundSection = () => {
  return (
    <div
      className="bg-section"
      style={{
        backgroundImage: "url('/assets/bg.jpg')",
        height: "200px", // Adjusted height
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default BackgroundSection;
