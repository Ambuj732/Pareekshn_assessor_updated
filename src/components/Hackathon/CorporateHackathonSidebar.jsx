import React, { useState } from "react";
import logo from "/logo.png";
import Clogo from "../../assets/Hackathon/Clogo.png";
import dashboard from "/Dashboard.png";
import user from "/userDashboard.png";
import stat from "/Stat.png";
import signout from "/signout.png";
import leftBanner from "/leftBanner.png";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../actions/LoginScreens/logout";
function CorporateHackathonSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
      };
      console.log(data, user);
      console.log("Logout Response ");
      const response = await logout(data);
      if (response.data.code === 1000) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("id_corp");
        sessionStorage.removeItem("usercode_corp");
        setTimeout(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.log("Error while logging out user :: ", user);
    }
  };

  return (
    <div className="bg-[#2F5185] h-screen w-[22%] flex flex-col justify-between">
      <div>
        <img src={Clogo} alt="" className="h-20 m-2 bg-[#2F5185]" />
        <div className="py-4 flex flex-col">
          <Link to={"/dashboard"}>
            <div className="flex items-center w-4/5 cursor-pointer h-12 rounded-e-full bg-white text-[#1C4481] gap-2 py-2 px-4">
              <img src={dashboard} alt="" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </Link>
          <div
            onClick={() => {
              const open = isMenuOpen3;
              setIsMenuOpen3(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={stat} alt="" />
            <span className="">Profile</span>
          </div>
          {isMenuOpen3 && (
            <div className="flex flex-col items-center">
              <Link to={"/corporate-profile"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">My Profile</span>
                  </div>
                </div>
              </Link>
              <Link to={"/add-documents"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Documents</span>
                  </div>
                </div>
              </Link>
              <Link to={"/profile-overview"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Profile overview</span>
                  </div>
                </div>
              </Link>
              <Link to={"/add-employee"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Employees</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
          <div
            onClick={() => {
              const open = isMenuOpen;
              setIsMenuOpen(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={stat} alt="" />
            <span className="text-nowrap">Hackathon Status</span>
          </div>
          {isMenuOpen && (
            <div className="flex flex-col items-center">
              <Link to={"/next-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Upcoming Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/completed-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Completed Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/pending-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Pending Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/rejected-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Rejected Hackathon</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div
            onClick={() => {
              const open = isMenuOpen1;
              setIsMenuOpen1(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={user} alt="" />
            <span className="">Job Post</span>
          </div>

          {isMenuOpen1 && (
            <div className="flex flex-col items-center">
              <Link to={"/dashboard/postedjob"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className=""> Jobs</span>
                  </div>
                </div>
              </Link>
              {/* <Link to={"/dashboard/createnewjob"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Create New Job</span>
                  </div>
                </div>
              </Link> */}
            </div>
          )}

          <div
            onClick={() => {
              const open = isMenuOpen2;
              setIsMenuOpen2(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={user} alt="" />
            <span className="">Statistics</span>
          </div>

          {isMenuOpen2 && (
            <div className="flex flex-col items-center">
              <Link
                to={"/dashboard/hackathonstatistics"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Hackathon Statistics</span>
                  </div>
                </div>
              </Link>
              <Link to={"/dashboard/jobstatistics"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className=""> job Statistics</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div
            onClick={logoutHandler}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={signout} alt="" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <img src={leftBanner} alt="" className="p-4" />
    </div>
  );
}

export default CorporateHackathonSidebar;
