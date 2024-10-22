import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaBriefcase,
  FaMapMarker,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
} from "react-icons/fa";
import hand from "../../assets/Hackathon/hand.jpg";
import sound from "../../assets/Hackathon/sound.jpg";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import jobPostDetails from "../../actions/Dashboard/jobPostDetails";
import login from "../../actions/LoginScreens/login";

const JobDetailsPage = () => {
  const [postDetails, setPostDetails] = useState({});
  const [loginData, setLoginData] = useState({});

  const getJobPostDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: 2,
        id_job_post: 42,
      };
      console.log(data);
      const response = await jobPostDetails(data);
      console.log(response);
      if (response?.data?.code === 1000)
        setPostDetails(response?.data?.job_post);
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
    getLoginData();
    getJobPostDetails();
  }, []);
  return (
    <div className=" h-screen flex ">
      <CorporateHackathonSidebar />
      <div className="w-full  overflow-y-scroll no-scrollbar">
        <div className="w-full p-4 overflow-y-scroll no-scrollbar">
          <div className="flex items-center justify-between mb-2 mt-2 ml-2 w-full">
            <span className="font-semibold text-[#1C4481] text-2xl">
              Dashboard/ <span className="text-[18px]">Job Detail Page</span>
            </span>
            <div className="flex items-center w-1/5 justify-between">
              <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
                <img
                  src={loginData.cover_photo_link}
                  alt=""
                  className="h-10 m-1 rounded-full px-1"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-[#305187]">Welcome</span>
                  <span className="font-medium">
                    {loginData.corporate_userid}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto  flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] ">
          <div className=" mx-auto  mt-2">
            <div className="flex gap-7 ">
              <div className="flex flex-col gap-2">
                <div className="bg-white p-5 shadow-xl border-2 rounded-lg mb-10">
                  <h3 className="text-2xl text-blue-900 font-bold">
                    Job Details
                  </h3>
                  <p className="text-lg font-semibold py-2">
                    {postDetails.corp_name}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <FaBriefcase className="mr-2" />{" "}
                    {postDetails.experience_range}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    {/* <FaInr className="mr-2" /> Not Disclosed */}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 flex items-center">
                      <FaMapMarker className="mr-2" /> {postDetails.city},
                      {postDetails.street_address}, {postDetails.state} (All
                      Areas)
                    </p>
                    {/* <a href="#" className="text-blue-600">
                    Send me jobs like this
                  </a> */}
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      Posted: {postDetails.posted_by}day ago | Openings: 1 |
                      Applicants: 47
                    </p>
                    {/* <div className="flex">
                    <button className="bg-transparent border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2">
                      Register to Apply
                    </button>
                    <button className="bg-blue-700 text-white rounded-full px-4 py-2">
                      Login to Apply
                    </button>
                  </div> */}
                  </div>
                </div>

                <div className="bg-white p-5 shadow-lg rounded-lg mb-10">
                  <h3 className="text-2xl text-blue-900 font-bold">
                    Job description
                  </h3>
                  <p className="text-lg font-semibold py-3 underline">
                    {postDetails.department_name}
                  </p>
                  {/* <p className="text-gray-700">
                  Desired Experience Range: <strong>6 - 10 years</strong>
                </p> */}
                  {/* <p className="text-gray-700">
                  Location of Requirement:{" "}
                  <strong>
                    Bangalore / Pune / Chennai / Mumbai / PAN India
                  </strong>
                </p> */}
                  {/* <p className="text-gray-700">
                  <strong>Must-Have:</strong>
                </p>
                <p className="text-gray-700 font-bold">Read more</p> */}
                  <div className="flex gap-10">
                    <div>
                      <p className="text-gray-700">
                        <strong>Key Skill</strong>
                      </p>
                      <p className="text-gray-500">
                        Skills highlighted with ‘‘ are preferred keyskills
                      </p>
                      {postDetails &&
                        postDetails?.skill?.map((data) => (
                          <div className="flex flex-wrap mt-3">
                            <button className="border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2 mb-2">
                              {data.skill_name}
                            </button>
                          </div>
                        ))}
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Education</strong>
                      </p>
                      <p className="text-gray-500">
                        Education highlighted with ‘‘ are preferred Education
                      </p>
                      {postDetails &&
                        postDetails?.education?.map((data) => (
                          <div className="flex flex-wrap mt-3">
                            <button className="border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2 mb-2">
                              {data.highest_qualification}
                            </button>
                          </div>
                        ))}
                    </div>
                    <div className="">
                      <p className="text-gray-700">
                        <strong>Question</strong>
                      </p>
                      <p className="text-gray-500">
                        Question highlighted with ‘‘ are preferred Question
                      </p>
                      <div className="flex">
                        {postDetails &&
                          postDetails?.questions?.map((data) => (
                            <div className=" flex mt-3">
                              <button className=" text-nowrap border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2 mb-2">
                                {data.question}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />
                  <div className="flex space-x-4">
                    <FaFacebookSquare className="text-blue-700 text-2xl" />
                    <FaTwitterSquare className="text-blue-700 text-2xl" />
                    <FaLinkedin className="text-blue-700 text-2xl" />
                  </div>
                </div>

                <div className="bg-white p-5 shadow-lg rounded-lg mb-10">
                  <h3 className="text-2xl text-blue-900 font-bold">
                    About the company
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">
                      {postDetails.corp_name}
                    </p>
                    <button className="bg-blue-700 text-white rounded-full px-4 py-2">
                      + Follow
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-3">
                    <button className="border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2 mb-2">
                      Forbes Global 2000
                    </button>
                    <button className="border-2 border-blue-700 text-blue-700 rounded-full px-4 py-2 mr-2 mb-2">
                      Fortune India 500 (2019)
                    </button>
                  </div>
                  <hr className="my-4" />
                  {/* <div>
                  <h4 className="text-xl font-bold">Overview</h4>
                  <p className="text-gray-700">
                    Tata Consultancy Services is an IT services, consulting and
                    business solutions organization that has been partnering
                    with many of the world’s largest businesses for the past 50
                    years. We believe innovation and collective knowledge can
                    transform all our futures with greater purpose.
                  </p>
                  <h4 className="text-xl font-bold py-3">
                    Want to be a global change-maker? Join our team.
                  </h4>
                </div> */}
                  <div className="flex gap-20 mt-4">
                    <iframe
                      width="330"
                      height="200"
                      src="https://www.youtube.com/embed/mRrFKU8s8U8?si=2j9vMspY0fCv-aJI"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                    <iframe
                      width="330"
                      height="200"
                      src="https://www.youtube.com/embed/mRrFKU8s8U8?si=2j9vMspY0fCv-aJI"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xl font-bold">Company Info</h4>
                    <p>
                      <strong>Link:</strong>{" "}
                      <a href="#" className="text-blue-600">
                        Tata Consultancy Services website
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong> {postDetails.city},{" "}
                      {postDetails.state}
                    </p>
                  </div>
                </div>

                {/* <div className="bg-white p-5 shadow-lg rounded-lg">
                <h3 className="text-2xl text-blue-900 font-bold">
                  Beware of imposters!
                </h3>
                <p className="text-gray-700">
                  Naukri.com does not promise a job or an interview in exchange
                  of money. Fraudsters may ask you to pay in the pretext of
                  registration fee, Refundable Fee
                </p>
              </div> */}
              </div>

              {/* <div className="space-y-10">
              <div className="bg-white  shadow-lg rounded-lg">
                <img
                  src={sound}
                  alt="Sidebar Image 1"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="bg-white  shadow-lg rounded-lg">
                <img
                  src={sound}
                  alt="Sidebar Image 2"
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
