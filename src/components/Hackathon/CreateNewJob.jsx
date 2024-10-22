import React from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useNavigate } from "react-router";
const CreateNewJob = () => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate("/dashboard/createjob");
  };
  return (
    <div className="h-screen flex overflow-hidden font-custom">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-ascrollbar ">
        <div className="flex items-center justify-center h-screen  flex-col gap-4">
          <div className="flex flex-col text-[#000000] text-sm font-bold">
            <span className="mx-7">No Job Posted Yet</span>
            <span>create new job in one click</span>
          </div>
          <button
            className="border rounded-3xl py-3 px-16 bg-[#1C4481] text-[#FFFFFF]"
            onClick={goToPage}
          >
            Create new Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewJob;
