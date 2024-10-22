import React from "react";
import avatar from "/avatar.png";
import profileComletion from "/profileCompletion.png";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import topad from "../../assets/Hackathon/topad.png";
import social from "../../assets/Hackathon/social.png";
import paid from "../../assets/Hackathon/paid.png";
import free from "../../assets/Hackathon/free.png";
import hackathon from "../../assets/Hackathon/hackathon.png";
import date from "../../assets/Hackathon/date.png";
import sector from "../../assets/Hackathon/sector.png";
import location from "../../assets/Hackathon/location.png";
import level from "../../assets/Hackathon/level.png";
import bottom from "../../assets/Hackathon/bottom.png";
import Progress from "./ProgressBar";
import updown from "../../assets/Hackathon/updown.png";
import top from "../../assets/Hackathon/top.png";
import avatarHackathon from "../../assets/Hackathon/avatar.png";
import downloadhack from "../../assets/Hackathon/downloadhack.png";

function HackathonDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* LeftSide */}
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4">
        <div className="flex items-center justify-between mb-14">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard
          </span>
          <div className="flex items-center w-1/5 justify-between">
            <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
              <img src={avatar} alt="" className="h-10 m-1" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[#305187]">Welcome</span>
                <span className="font-medium">User TP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen rounded-3xl">
          <div className="flex py-8 px-4">
            <div className="w-5/6 mx-4 h-fit flex  flex-col gap-4">
              <img src={topad} alt="" className="" />
              <div className="mt-6 flex flex-col gap-2">
                <div className="w-full h-fit bg-white rounded-3xl">
                  <div className="flex h-1/2 items-center justify-between p-6">
                    <div className="flex w-2/3 gap-2">
                      <img src={hackathon} alt="" className="h-1/3 w-1/3 " />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1C4481] text-lg">
                          Fresher UI/UX designer
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          UI/UX Designer
                        </span>
                        <span className="text-sm text-black">Level-Easy</span>
                        <span className="text-sm text-black">Sector - IT</span>
                      </div>
                    </div>
                    <div className="flex flex-col w-2/3 gap-4">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 w-1/2">
                          <img src={date} alt="" className="h-8" />
                          <div className="flex flex-col text-[13px]">
                            <span className="font-semibold text-[#1C4481]">
                              Date & Time
                            </span>
                            <span className="">12-07-2023 | 12:30 PM</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2">
                          <img src={location} alt="" className="h-8" />
                          <div className="flex flex-col text-[13px]">
                            <span className="font-semibold text-[#1C4481]">
                              Location
                            </span>
                            <span className="">Noida, Uttar Pradesh</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 w-1/2">
                          <img src={sector} alt="" className="h-8" />
                          <div className="flex flex-col text-[13px]">
                            <span className="font-semibold text-[#1C4481]">
                              Duration
                            </span>
                            <span className="">60 Mins</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-1/2">
                          <img src={level} alt="" className="h-8" />
                          <div className="flex flex-col text-[13px]">
                            <span className="font-semibold text-[#1C4481]">
                              Total Marks
                            </span>
                            <span className="">100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="border-t-[1px] border-[#1C4481]" />
                  <div className="flex">
                    <div className="border-2 border-[#A8CBFFB] h-56 m-6 w-1/2 rounded-2xl relative flex justify-center overflow-hidden ">
                      <div className="flex flex-col items-center w-32 p-1 rounded-md m-2 absolute right-1 bg-[#1C4481]">
                        <span className="text-[12px] text-white">
                          Appeared Students
                        </span>
                        <span className="text-white text-2xl font-semibold">
                          150
                        </span>
                      </div>
                      <Progress text="Enrolled" strength="255" />
                    </div>
                    <div className="border-2 border-[#A8CBFFB] h-56 m-6 w-1/2 rounded-2xl relative flex justify-center overflow-hidden ">
                      <div className="flex flex-col items-center w-32 p-1 rounded-md m-2 absolute left-1 bg-[#68954A]">
                        <span className="text-[12px] text-white">
                          Pass Students
                        </span>
                        <span className="text-white text-2xl font-semibold">
                          150
                        </span>
                      </div>
                      <div className="flex flex-col items-center w-32 p-1 rounded-md m-2 absolute right-1 bg-[#68954A]">
                        <span className="text-[12px] text-white">
                          Fail Students
                        </span>
                        <span className="text-white text-2xl font-semibold">
                          50
                        </span>
                      </div>
                      <Progress text="Total" strength="150" />
                    </div>
                  </div>
                  <div className="p-6 text-[#1C4481] flex flex-col gap-4">
                    <span className="font-semibold text-xl">
                      Top 10 Students List
                    </span>
                    <div className="flex items-center justify-center">
                      <div className="h-12 w-full bg-[#1C4481] flex items-center justify-around rounded-t-xl">
                        <div className="w-1/4 flex items-center justify-center ">
                          <div className="text-white flex gap-1 items-center ">
                            <span>Student Name</span>
                            <img src={updown} alt="" className="h-1/2" />
                          </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <div className="text-white flex gap-1 items-center">
                            <span>Marks or % Scored</span>
                            <img src={updown} alt="" className="h-1/2" />
                          </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <div className="text-white flex gap-1 items-center">
                            <span>Time Taken</span>
                            <img src={updown} alt="" className="h-1/2" />
                          </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center">
                          <div className="text-white flex gap-1 items-center">
                            <span>Actions</span>
                            <img src={updown} alt="" className="h-1/2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/4 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-2">
                          <img src={top} alt="" />
                          <img src={avatarHackathon} alt="" className="h-10" />
                          <span className="text-black">Rohit Sharma</span>
                        </div>
                      </div>
                      <div className="w-1/4 flex items-center justify-center">
                        <span>66 .00 (66%)</span>
                      </div>
                      <div className="w-1/4 flex items-center justify-center">
                        <span>01 : 25 Hrs</span>
                      </div>
                      <div className="w-1/4 flex justify-center items-center">
                        <div className="flex gap-1 items-center border-2 p-1 px-2 rounded-full border-[#1C4481]">
                          <img src={downloadhack} alt="" className="h-7" />
                          <span className="font-medium">Download CV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center bg-white w-[260px] p-6 rounded-3xl">
              <img src={gamer} alt="" className="h-48" />
              <img src={gamer} alt="" className="h-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackathonDashboard;
