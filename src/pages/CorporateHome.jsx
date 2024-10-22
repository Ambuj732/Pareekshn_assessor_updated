import React from "react";
import AboutPareekshn from "../components/Hackathon/AboutPareekshn";
import CorporateSignUp from "../components/Hackathon/CorporateSignUp";
import { Outlet } from "react-router";

function CorporateHome() {
  return (
    <div className="flex">
      <Outlet />
      <AboutPareekshn />
    </div>
  );
}

export default CorporateHome;
