import React from "react";
import pen from "../../assets/Hackathon/pen.png";
import start from "/start.png";
import pack from "/pack.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import code from "/code.png";

import CorporateHackathonSidebar from "./CorporateHackathonSidebar";

const UnpostedJob = () => {
  return (
    <div className="h-screen flex overflow-hidden ">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-ascrollbar ">
        <div className="flex items-center justify-center gap-7 mt-7">
          <button className="border p-2 px-7 rounded-3xl  text-white bg-blue-800">
            Posted Jobs
          </button>
          <button className="border p-2 px-10 rounded-3xl  text-blue-800 bg-white">
            Unposted Jobs
          </button>
        </div>
        <div className="flex items-center justify-between px-4 mt-3 mb-7">
          <span className="text-blue-600"> UnPosted Jobs</span>
          <button className="  text-white border p-2 px-7 rounded-3xl bg-blue-800">
            Posted New Jobs
          </button>
        </div>
        <div className="w-full h-60 bg-white rounded-3xl mb-7">
          <div className="flex h-1/2 items-center justify-between p-6">
            <div className="flex flex-col mt-2">
              <span className="text-[#1C4481] font-bold">
                Android Developer
              </span>
              <span className="text-sm text-[#1C4481] font-medium">
                Industry-1
              </span>
              <span className="#292929 text-sm">
                This job has many responsivities
              </span>
              <span className="#292929 text-sm">UI Design</span>
              <span className="#292929 text-sm">Android Studio Knowledge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className=" flex border border-blue-950 p-2 px-4 rounded-3xl  text-blue-700 bg-white gap-3">
                Edit
                <img src={pen} className="w-5 h-5" />
              </div>

              <button className="border p-2 px-8 rounded-3xl  text-white bg-blue-950">
                Publish Job
              </button>
            </div>
          </div>
          <hr class="border-t-[1px] border-[#1C4481]" />
          <div className="flex justify-between p-6  text-[#1C4481]">
            <div className="flex items-center gap-2">
              <img src={pack} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481  font-bold">Created Date</span>
                <span className="font-semibold">05-02-2024</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={code} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Department</span>
                <span className="font-semibold">Department-3</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={duration} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">
                  Exeperience Range
                </span>
                <span className="font-semibold">Less than one year</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={passcode} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Active Days</span>
                <span className="font-semibold">30 Days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-60 bg-white rounded-3xl mb-7">
          <div className="flex h-1/2 items-center justify-between p-6">
            <div className="flex flex-col mt-2">
              <span className="text-[#1C4481] font-bold">
                Android Developer
              </span>
              <span className="text-sm text-[#1C4481] font-medium">
                Industry-1
              </span>
              <span className="#292929 text-sm">
                This job has many responsivities
              </span>
              <span className="#292929 text-sm">UI Design</span>
              <span className="#292929 text-sm">Android Studio Knowledge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className=" flex border border-blue-950 p-2 px-4 rounded-2xl  text-blue-700 bg-white gap-3">
                Edit
                <img src={pen} className="w-5 h-5" />
              </div>

              <button className="border p-2 px-8 rounded-2xl  text-white bg-blue-950">
                Publish Job
              </button>
            </div>
          </div>
          <hr class="border-t-[1px] border-[#1C4481]" />
          <div className="flex justify-between p-6  text-[#1C4481]">
            <div className="flex items-center gap-2">
              <img src={pack} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481  font-bold">Created Date</span>
                <span className="font-semibold">05-02-2024</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={code} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Department</span>
                <span className="font-semibold">Department-3</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={duration} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">
                  Exeperience Range
                </span>
                <span className="font-semibold">Less than one year</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={passcode} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Active Days</span>
                <span className="font-semibold">30 Days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-60 bg-white rounded-3xl mb-7">
          <div className="flex h-1/2 items-center justify-between p-6">
            <div className="flex flex-col mt-2">
              <span className="text-[#1C4481] font-bold">
                Android Developer
              </span>
              <span className="text-sm text-[#1C4481] font-medium">
                Industry-1
              </span>
              <span className="#292929 text-sm">
                This job has many responsivities
              </span>
              <span className="#292929 text-sm">UI Design</span>
              <span className="#292929 text-sm">Android Studio Knowledge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className=" flex border border-blue-950 p-2 px-4 rounded-2xl  text-blue-700 bg-white gap-3">
                Edit
                <img src={pen} className="w-5 h-5" />
              </div>

              <button className="border p-2 px-8 rounded-2xl  text-white bg-blue-950">
                Publish Job
              </button>
            </div>
          </div>
          <hr class="border-t-[1px] border-[#1C4481]" />
          <div className="flex justify-between p-6  text-[#1C4481]">
            <div className="flex items-center gap-2">
              <img src={pack} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481  font-bold">Created Date</span>
                <span className="font-semibold">05-02-2024</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={code} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Department</span>
                <span className="font-semibold">Department-3</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={duration} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">
                  Exeperience Range
                </span>
                <span className="font-semibold">Less than one year</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={passcode} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Active Days</span>
                <span className="font-semibold">30 Days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-60 bg-white rounded-3xl mb-7">
          <div className="flex h-1/2 items-center justify-between p-6">
            <div className="flex flex-col mt-2">
              <span className="text-[#1C4481] font-bold">
                Android Developer
              </span>
              <span className="text-sm text-[#1C4481] font-medium">
                Industry-1
              </span>
              <span className="#292929 text-sm">
                This job has many responsivities
              </span>
              <span className="#292929 text-sm">UI Design</span>
              <span className="#292929 text-sm">Android Studio Knowledge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className=" flex border border-blue-950 p-2 px-4 rounded-2xl  text-blue-700 bg-white gap-3">
                Edit
                <img src={pen} className="w-5 h-5" />
              </div>

              <button className="border p-2 px-8 rounded-2xl  text-white bg-blue-950">
                Publish Job
              </button>
            </div>
          </div>
          <hr class="border-t-[1px] border-[#1C4481]" />
          <div className="flex justify-between p-6  text-[#1C4481]">
            <div className="flex items-center gap-2">
              <img src={pack} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481  font-bold">Created Date</span>
                <span className="font-semibold">05-02-2024</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={code} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Department</span>
                <span className="font-semibold">Department-3</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={duration} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">
                  Exeperience Range
                </span>
                <span className="font-semibold">Less than one year</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={passcode} alt="" className="h-8" />
              <div className="flex flex-col text-[12px]">
                <span className="text-#1C4481 font-bold">Active Days</span>
                <span className="font-semibold">30 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnpostedJob;
