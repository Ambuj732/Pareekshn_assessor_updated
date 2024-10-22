import React, { useState, useEffect } from "react";
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
import paidcorner from "../../assets/Hackathon/paidcorner.png";
import checkring from "../../assets/Hackathon/checkring.png";
import download from "../../assets/Hackathon/download.png";
import cost from "../../assets/Hackathon/cost.png";
import total from "../../assets/Hackathon/total.png";
import totalcandidate from "../../assets/Hackathon/totalcandidate.png";
import costtorecruit from "../../assets/Hackathon/costtorecruit.png";
import completedHackathon from "../../actions/Hackathon/completedHackathon";
import login from "../../actions/LoginScreens/login";

function CompletedHackathon() {
  const [completedHackathonData, setCompletedHackathonData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loginData, setLoginData] = useState({});

  const getCompletedHackathonData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        status: 0,
      };
      const response = await completedHackathon(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000)
        setCompletedHackathonData(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getLoginData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        password: 123456,
        os: "android",
        username: "Kool@Tech",
      };
      const response = await login(data);
      if (response?.data?.code === 1000)
        setLoginData(response?.data?.corp_profile);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getCompletedHackathonData();
  }, []);

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("User :: ", users);
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;
  return (
    <div className=" h-screen flex">
      <CorporateHackathonSidebar />
      <div className=" h-screen w-full">
        <div className="w-full p-4 overflow-y-scroll no-scrollbar">
          <div className="flex items-center justify-between mb-2 mt-2 ml-2 w-full">
            <span className="font-semibold text-[#1C4481] text-2xl">
              Dashboard/{" "}
              <span className="text-[18px]">Completed Hackathon</span>
            </span>
            <div className="flex items-center w-1/5 justify-between">
              <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
                <img
                  src={pic}
                  alt=""
                  className="h-10 m-1 w-10 border rounded-full px-1"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-[#305187]">Welcome</span>
                  <span className="font-medium">{corporate_userid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] pt-7 mx-5 h-auto flex flex-col py-2 gap-8 rounded-3xl">
          {completedHackathonData.length > 0 &&
            completedHackathonData.map((data) => (
              <div
                className={`w-[calc(100%-40px)] shadow-completedHackathon h-fit mx-auto px-2 pb-2 bg-white rounded-3xl`}
              >
                <div className="flex h-1/2 items-center justify-between p-6">
                  <div className="flex w-2/3 gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1C4481] text-lg">
                        {data.hackthon_title}
                      </span>
                      <span className="text-sm text-[#1C4481] font-medium">
                        {data.sector_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center cursor-pointer border border-[#4F9B52] h-10 w-fit px-3 bg-[#4F9B52] gap-2 rounded-full">
                      <img src={checkring} alt="" className="h-7" />
                      <div className="flex items-center  gap-2 w-1/4">
                        <span className="text-white text-sm">Done</span>
                      </div>
                    </div>
                    <img src={download} alt="" className="h-10" />
                    <span className="text-[#1C4481] cursor-pointer font-medium">
                      View Result
                    </span>
                  </div>
                </div>
                <hr class="border-t-[1px] border-[#1C4481]" />
                <div className="flex px-6 py-2 w-full text-[#1C4481]">
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={total} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Total Candidate
                      </span>
                      <span className="font-semibold text-lg text-[#4A4A4A]">
                        {data.enrolled_student}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={totalcandidate} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Total Candidate Selected
                      </span>
                      <span className="font-semibold text-lg text-[#4A4A4A]">
                        {data.selected_student}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={costtorecruit} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Recruitment cost <br />
                        per candidate
                      </span>
                      <span className="font-semibold text-lg text-[#4A4A4A]">
                        {data.cost_per_candidate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={cost} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Total Cost
                      </span>
                      <span className="font-semibold text-lg text-[#4A4A4A]">
                        {data.total_cost}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 py-2  text-[#1C4481]">
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={date} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Date & Time
                      </span>
                      <span className="font-semibold">{data.date_of_exam}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={sector} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">Sector</span>
                      <span className="font-semibold">{data.sector_name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={location} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">
                        Location
                      </span>
                      <span className="font-semibold flex">
                        {data.city},{data.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-1/4">
                    <img src={level} alt="" className="h-8" />
                    <div className="flex flex-col text-[14px]">
                      <span className="text-[#1C4481] font-medium">Level</span>
                      <span className="font-semibold">
                        {data.level_difficulty_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CompletedHackathon;
