// frontend-react/src/components/BackgroundSection.jsx
import React from "react";
import bgImage from "../assets/bg.jpg";

const BackgroundSection = () => (
  <div
    className="h-64 bg-cover bg-center rounded-md mx-6 mb-8"
    style={{ backgroundImage: `url(${bgImage})` }}
    aria-label="Background image section"
  />
);

export default BackgroundSection;
