import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import profileComletion from "/profileCompletion.png";
import CorporateHackathonSidebar from "../Hackathon/CorporateHackathonSidebar";
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
import { Navigate, Outlet } from "react-router";
import hackathonStatisticsDashboard from "../../actions/Hackathon/hackathonStatisticsDashboard";
import completedHackathon from "../../actions/Hackathon/completedHackathon";
import upComingHackathon from "../../actions/Hackathon/upComingHackathon";
import CreateHackathon from "./CreateHackathon";
import { useNavigate } from "react-router";

function CorporateHackathonDashboard1() {
  const [loginData, setLoginData] = useState({});
  const [hackathonStaticData, setHackathonStaticData] = useState({});
  const [errors, setErrors] = useState({});
  const [Page, setPage] = useState(false);
  const [completedHackathonData, setCompletedHackathonData] = useState([]);
  const [upComingHackathonData, setupComingHackathonData] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User :: ", user);
  const corporate_userid = user?.corporate_userid;
  const pic = user?.profile_pic;

  const getHackathonStatisticsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.usercode,
        id_corp: user?.id,
      };
      const response = await hackathonStatisticsDashboard(data);
      if (response?.data?.code === 1000)
        setHackathonStaticData(response?.data?.dashboard_data);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

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

  const getupComingHackathonData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        status: 3,
      };
      const response = await upComingHackathon(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000)
        setupComingHackathonData(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const CreateHackathon = () => {
    navigate("/create-hackathon");
  };

  const hackathonDetailPage = () => {
    navigate("/hackathon-details-page");
  };
  useEffect(() => {
    getHackathonStatisticsData();
    getCompletedHackathonData();
    getupComingHackathonData();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* LeftSide */}
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-14">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard
          </span>
          <div className="flex items-center w-1/5 justify-between">
            <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
              <img
                src={pic}
                alt=""
                className="h-10 w-10 m-1 border rounded-full px-1"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[#305187]">Welcome</span>
                <span className="font-medium">{corporate_userid}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen rounded-3xl">
          <div className="flex py-8 px-4">
            <div className="w-5/6 mx-4 h-fit flex  flex-col gap-4">
              <img
                src={topad}
                alt=""
                className="cursor-pointer"
                onClick={CreateHackathon}
              />
              <div className="flex justify-between items-center">
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 w-[220px] h-28 rounded-xl flex justify-between px-4 py-2">
                  <div className="w-1/4 h-1/6 flex flex-col gap-2">
                    <img src={social} alt="" />
                    <div className="flex flex-col text-sm font-medium text-white">
                      <span>Total</span>
                      <span>Hackathon </span>
                    </div>
                  </div>
                  <div className="flex items-center w-1/3 justify-center">
                    <span className="text-3xl text-white font-medium">
                      {hackathonStaticData.total}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-600 w-[220px] h-28 rounded-xl flex justify-between px-4 py-2">
                  <div className="w-1/4 h-1/6 flex flex-col gap-2">
                    <img src={free} alt="" />
                    <div className="flex flex-col text-sm font-medium text-white">
                      <span>Free</span>
                      <span>Hackathon</span>
                    </div>
                  </div>
                  <div className="flex items-center w-1/3 justify-center">
                    <span className="text-3xl text-white font-medium">
                      {" "}
                      {hackathonStaticData.free}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-[220px] h-28 rounded-xl flex justify-between px-4 py-2 ">
                  <div className="w-1/2 h-1/6 flex flex-col gap-2">
                    <img src={paid} alt="" className="w-1/2" />
                    <div className="flex flex-col text-sm font-medium text-white ">
                      <span>Paid</span>
                      <span>Hackathon</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-1/3">
                    <span className="text-3xl text-white font-medium">
                      {hackathonStaticData.paid}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-center gap-7 mt-5 mb-2">
                  <div
                    className={`"border p-3 px-7 rounded-3xl border cursor-pointer ${
                      !Page
                        ? "bg-[#1C4481] text-white"
                        : " text-[#1C4481] bg-white border-[#1C4481] "
                    }`}
                  >
                    <span
                      className=" font-medium"
                      onClick={() => {
                        setPage(false);
                      }}
                    >
                      Completed Hackathon
                    </span>
                  </div>
                  <div
                    className={`"border p-3 px-7 rounded-3xl border cursor-pointer ${
                      !Page
                        ? "bg-white text-[#1C4481] border-[#1C4481]"
                        : "bg-[#1C4481] text-white"
                    }`}
                  >
                    <span
                      className=" font-medium"
                      onClick={() => {
                        setPage(true);
                      }}
                    >
                      Upcoming Hackathon
                    </span>
                  </div>
                </div>
                {completedHackathonData &&
                  completedHackathonData?.map((data) => {
                    if (data.fetching_status === 0 && Page == false) {
                      return (
                        <>
                          <div className="w-full h-fit bg-white rounded-3xl">
                            <div className="flex h-1/2 items-center justify-between p-6">
                              <div className="flex w-2/3 gap-2">
                                <img
                                  src={data.banner.banner_pic}
                                  alt=""
                                  className="h-1/3 w-1/3 border rounded-lg cursor-pointer"
                                  onClick={hackathonDetailPage}
                                />
                                <div className="flex flex-col">
                                  <span
                                    className="font-semibold text-[#1C4481] text-lg cursor-pointer"
                                    onClick={hackathonDetailPage}
                                  >
                                    {data.hackthon_title}
                                  </span>
                                  <span className="text-sm text-[#1C4481] font-medium">
                                    {data.sector_name}
                                  </span>
                                  <span className="text-sm text-[#7B7B7B]">
                                    Level-{data.level_difficulty_name}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <span className="text-white ">Free</span>
                                </div>
                              </div>
                            </div>
                            <hr class="border-t-[1px] border-[#1C4481]" />
                            <div className="flex justify-between p-6  text-[#1C4481]">
                              <div className="flex items-center gap-2">
                                <img src={date} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Date & Time</span>
                                  <span className="font-semibold">
                                    {data.date_of_exam} | {data.exam_start_time}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={sector} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Sector</span>
                                  <span className="font-semibold">
                                    {data.sector_name}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={location} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Location</span>
                                  <span className="font-semibold">
                                    {data.state}, {data.city}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={level} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Level</span>
                                  <span className="font-semibold">
                                    {data.level_difficulty_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                {upComingHackathonData.length > 0 &&
                  upComingHackathonData.map((data) => {
                    if (data.fetching_status === 3 && Page == true) {
                      return (
                        <>
                          <div className="w-full h-fit bg-white rounded-3xl">
                            <div className="flex h-1/2 items-center justify-between p-6">
                              <div className="flex w-2/3 gap-2">
                                <img
                                  src={data.banner.banner_pic}
                                  alt=""
                                  className="h-1/3 w-1/3 border rounded-lg"
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold text-[#1C4481] text-lg">
                                    {data.hackthon_title}
                                  </span>
                                  <span className="text-sm text-[#1C4481] font-medium">
                                    {data.sector_name}
                                  </span>
                                  <span className="text-sm text-[#7B7B7B]">
                                    Level-{data.level_difficulty_name}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <span className="text-white ">Free</span>
                                </div>
                              </div>
                            </div>
                            <hr class="border-t-[1px] border-[#1C4481]" />
                            <div className="flex justify-between p-6  text-[#1C4481]">
                              <div className="flex items-center gap-2">
                                <img src={date} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Date & Time</span>
                                  <span className="font-semibold">
                                    {data.date_of_exam} | {data.exam_start_time}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={sector} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Sector</span>
                                  <span className="font-semibold">
                                    {data.sector_name}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={location} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Location</span>
                                  <span className="font-semibold">
                                    {data.state}, {data.city}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={level} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Level</span>
                                  <span className="font-semibold">
                                    {data.level_difficulty_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}

                {/* <img src={bottom} alt="" className="mt-2" /> */}
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateHackathonDashboard1;
