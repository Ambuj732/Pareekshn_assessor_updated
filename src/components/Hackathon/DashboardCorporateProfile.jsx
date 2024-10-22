import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import close from "../../assets/Hackathon/close.png";
import twoperson from "../../assets/Hackathon/twoperson.png";
import bannertitle from "../../assets/Hackathon/bannertitle.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import time from "../../assets/Hackathon/time.png";
import bannersize from "../../assets/Hackathon/bannersize.png";
import edit from "../../assets/Hackathon/edit.png";
import profileedit from "../../assets/Hackathon/profileedit.png";
import intersect from "../../assets/Hackathon/intersect.png";
import pen from "../../assets/Hackathon/pen.png";
import city from "../../assets/Hackathon/city.png";
import state from "../../assets/Hackathon/state.png";
import password from "../../assets/Hackathon/password.png";
import tablet from "../../assets/Hackathon/tablet.png";
import location1 from "../../assets/Hackathon/location1.png";
import user from "../../assets/Hackathon/user.png";
import email from "../../assets/Hackathon/email.png";
import getCorporateProfileData from "../../actions/Dashboard/getCorporateProfile";
import EditDashboardCorporateProfile from "./EditDashboardCorporateProfile";
import updateCorpProfilePicWeb from "../../actions/Dashboard/updateCorpProfilePicWeb";

function DashboardCorporateProfile() {
  const [corporateProfile, setCorporateProfile] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [errors, setErrors] = useState(null);

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("User :: ", user);
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  const getCorporateData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User data is--- :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        req_by: 1,
      };
      console.log("data is ", data);
      const response = await getCorporateProfileData(data);
      console.log(response);
      if (response?.data?.code === 1000)
        setCorporateProfile(response?.data?.corp_profile);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const editPage = () => {
    setEditProfile(true);
  };

  const closeModal = () => {
    setEditProfile(false);
  };

  const handleFileChange = async (event, formData) => {
    const file = event.target.files[0];
    const fileBase64 = await getBase64(file);
    //console.log(fileBase64);
    if (file) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        //console.log(user);
        const data = {
          id_corp: user?.id,
          usercode: user?.token,
          file: fileBase64,
        };
        const response = await updateCorpProfilePicWeb(data);
        if (response.data.code === 1000) {
          setCorporateProfile((prevProfile) => ({
            ...prevProfile,
            profile_pic: response?.data?.pic,
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrors([error.message]);
      }
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  };

  useEffect(() => {
    getCorporateData();
  }, []);
  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 mt-2 ml-2">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Corporate Profile</span>
          </span>
          <div className="flex items-center w-1/5 justify-between">
            <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
              <img
                src={pic}
                alt=""
                className="h-10 w-10 border m-1 rounded-full px-1"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[#305187]">Welcome</span>
                <span className="font-medium">{corporate_userid}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen flex justify-center items-center rounded-3xl">
          <div className="bg-white min-h-screen ps-8 flex flex-col gap-6 py-4 pe-4 w-full m-4 rounded-3xl">
            <div>
              <div className="flex justify-between w-11/12">
                <span className="text-sm">Upload Profile Image</span>

                <div
                  className="border border-[#1C4481] rounded-full w-20 flex items-center justify-center font-medium"
                  onClick={editPage}
                >
                  <div className="flex items-center cursor-pointer gap-2 py-1 ">
                    <img src={pen} alt="" className="h-[22px]" />
                    <span onClick={editPage}>Edit</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-32 w-32 flex items-center justify-center rounded-full relative bg-[#D9D9D9]">
                  <img
                    src={corporateProfile.profile_pic}
                    alt="blank"
                    className="h-[125px] absolute text-center object-fill rounded-full Object-fit"
                  />
                  <img
                    src={profileedit}
                    alt=""
                    className="absolute bg-[#1C4481] rounded-full h-8 p-1 border-white border-[2px] outline-[1px] outline-white bottom-2 right-0 cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={user} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate name</label>
                      </div>
                      <input
                        disabled
                        placeholder="Corporate Name"
                        className="text-[#1C4481] text-sm outline-none px-4"
                        value={corporateProfile.corporate_name}
                      />
                      {}
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex  flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={email} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate email</label>
                      </div>
                      <input
                        disabled
                        placeholder="Enter your Email"
                        className="text-[#1C4481] outline-none text-sm px-4"
                        value={corporateProfile.corporate_email}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex  flex-col gap-1 ">
                      <div className="flex justify-start gap-2">
                        <img src={tablet} alt="" className=" w-5" />
                        <label className="text-nowrap">
                          {" "}
                          Corporate Phone Number
                        </label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="Corporate Mobile Number"
                        value={corporateProfile.corporate_mob}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 flex-col justify-center">
                    <div className="flex flex-col gap-1 ">
                      <div className="flex justify-start gap-2">
                        <img src={location1} alt="" className=" w-5" />

                        <label className="text-nowrap">
                          Corporate Location
                        </label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="Corporate Location"
                        value={corporateProfile.corporate_location}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex  flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={user} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate UserId</label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="Corporte User ID"
                        value={corporateProfile.corporate_userid}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={user} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate Stage</label>
                      </div>

                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="Corporate Stage"
                        value={corporateProfile.corporate_stage}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={state} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate State</label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="State"
                        value={corporateProfile.state}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={city} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate City</label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="City"
                        value={corporateProfile.city}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={city} alt="" className=" w-5" />
                        <label className="text-nowrap">
                          Corporate Founded Year
                        </label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-7"
                        placeholder="Founded Year"
                        value={corporateProfile.founded_year}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={city} alt="" className=" w-5" />
                        <label className="text-nowrap">Corporate Size</label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-7"
                        placeholder="Corporate Size"
                        value={corporateProfile.corporate_size}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2  flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start gap-2">
                        <img src={city} alt="" className=" w-5" />
                        <label className="text-nowrap">
                          Corporate Industry
                        </label>
                      </div>
                      <input
                        disabled
                        className="text-[#1C4481] outline-none text-sm px-4"
                        placeholder="Industry Related to"
                        value={corporateProfile.industry}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {editProfile && (
          <EditDashboardCorporateProfile
            closeModal={closeModal}
            state={corporateProfile.state}
            city={corporateProfile.city}
            foundedYear={corporateProfile.founded_year}
            corporateSizes={corporateProfile.corporate_size}
            corporateStages={corporateProfile.corporate_stage}
            industrys={corporateProfile.industry}
            location={corporateProfile.corporate_location}
            names={corporateProfile.corporate_name}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardCorporateProfile;
