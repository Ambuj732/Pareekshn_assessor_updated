import React, { useState, useEffect } from "react";
import pen from "../../assets/Hackathon/pen.png";
import pack from "/pack.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import code from "/code.png";
import getFetchCreatedJob from "../../actions/Dashboard/getFetchCreatedJob";
import getPublishJob from "../../actions/Dashboard/getPublishJob";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import publishJobPost from "../../actions/Dashboard/publishJobPost";
import { Navigate, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { FaPen } from "react-icons/fa";
//import queryString from "query-string";
const PostedJob = () => {
  const [fetchCreatedJob, setFetchCreatedJob] = useState([]);
  const [errors, setErrors] = useState(null);
  const [postedPage, setPostedPage] = useState(false);
  const [publishJobData, setPublishJobData] = useState([]);
  const navigate = useNavigate();
  const buttonStyling = `flex space-x-3 mr-2 font-semibold bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 text-gray-100 rounded-3xl ring-2 ring-blue-200 px-6 py-2 hover:bg-white  hover:text-white hover:ring-slate-300 mx-3.5`;

  const getFetchCreatedData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
      };
      const response = await getFetchCreatedJob(data);
      //console.log("completed data", response);
      if (response?.data?.code === 1000) {
        setFetchCreatedJob(response?.data?.jobs);
      }
      //console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getFetchPublishData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
      };
      const response = await getPublishJob(data);
      //console.log("published data", response);
      if (response?.data?.code === 1000)
        setPublishJobData(response?.data?.jobs);
      //console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const publishJobHandler = async (id) => {
    try {
      console.log(id);
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        id_job_post: id,
      };
      const response = await publishJobPost(data);
      //console.log("Publish Job Post data", response);
      if (response?.data?.code === 1000) {
        getFetchCreatedData();
      }
    } catch (error) {
      console.log("Error while Publishing Job :: ", error);
      setErrors([error.message]);
    }
  };

  const goToPage = (data) => {
    const jobId = {
      id_job_post: data.id_job_post,
    };
    console.log(jobId);
    localStorage.setItem("job_id", JSON.stringify(jobId));
    navigate("/dashboard/appliescandidate", {
      state: { id_job_post: data.id_job_post },
    });
  };
  const setPostedJobPage = () => {
    getFetchPublishData();
    setPostedPage(true);
  };
  const editJobHandler = (jobid) => {
    const encoded_jobid = window.btoa(jobid);
    //const q = queryString.parse('q='+jobid, {parseNumbers: true});
    navigate("/dashboard/createjob?q=" + encoded_jobid);
  };
  const jogDetailPage = () => {
    navigate("/job-details-page");
  };

  useEffect(() => {
    getFetchCreatedData();
    //getFetchPublishData();
  }, []);
  return (
    <div className="h-screen flex overflow-hidden ">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-ascrollbar">
        <div className="flex items-center justify-center gap-7 mt-7">
          <div
            className={`"border p-2 px-7 rounded-3xl cursor-pointer ${
              postedPage
                ? "bg-[#1C4481] text-white"
                : " text-[#1C4481] bg-white border-[#1C4481] "
            }`}
          >
            <span
              className=" font-medium"
              onClick={() => {
                setPostedJobPage(true);
              }}
            >
              Published Jobs
            </span>
          </div>
          <div
            className={`"border p-2 px-10 rounded-3xl cursor-pointer ${
              postedPage
                ? "bg-white text-[#1C4481] border-[#1C4481]"
                : "bg-[#1C4481] text-white"
            }`}
          >
            <span
              className=" font-medium"
              onClick={() => {
                setPostedPage(false);
              }}
            >
              Unpublished Jobs
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 mt-3 mb-7">
          {/* <span className="text-blue-600"> Published Jobs</span> */}
          {/* <Link to={"/dashboard/createnewjob"}> */}
          <Link to={"/dashboard/createjob"}>
            <button className="  text-white border p-2 px-7 rounded-3xl bg-blue-800">
              Post a new job
            </button>
          </Link>
        </div>
        {publishJobData &&
          publishJobData.map((data, index) => {
            // console.log(data);
            return (
              data.is_publish == true &&
              postedPage == true && (
                <>
                  <div
                    className="w-full h-60 bg-white rounded-3xl mb-7"
                    id={index + 1}
                  >
                    <div className="flex h-1/2 items-center justify-between p-6">
                      <div
                        className="flex flex-col mt-2 cursor-pointer"
                        onClick={jogDetailPage}
                      >
                        <span className="text-[#1C4481] font-bold">
                          {data.job_title}
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          {data.industry_name}
                        </span>
                        <span className="#292929 text-sm">
                          {data.state}, {data.city}
                        </span>
                        <span className="#292929 text-sm">{data.emp_type}</span>
                        <span className="#292929 text-sm">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                data.job_description.substring(0, 250)
                              ),
                            }}
                          />
                        </span>
                        {/* <span className="#292929 text-sm">
                          {data.skill.map((skilldata, index) => (
                              <span key={index}
                              className="#292929 text-sm">
                                  {skilldata.skill_name} &nbsp;
                              </span>
                          ))}
                        </span> */}
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="border border-blue-950 p-2 px-4 rounded-3xl  text-blue-700 bg-white "
                          onClick={() => goToPage(data)}
                        >
                          View Candidate
                        </button>
                        <button className="border p-2 px-8 rounded-3xl  text-white bg-green-600">
                          Published
                        </button>
                      </div>
                    </div>
                    <hr class="border-t-[1px] border-[#1C4481]" />
                    <div className="flex justify-between p-6  text-[#1C4481]">
                      <div className="flex items-center gap-2">
                        <img src={pack} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481  font-bold">
                            Created Date
                          </span>
                          <span className="font-semibold">{data.add_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Department
                          </span>
                          <span className="font-semibold">
                            {data.department_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={duration} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Exeperience Range
                          </span>
                          <span className="font-semibold">
                            {data.experience_range}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">Salary</span>
                          <span className="font-semibold">
                            {data.min_salary} - {data.max_salary} Lakhs
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={passcode} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Active Days
                          </span>
                          <span className="font-semibold">
                            {data.no_of_days}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            );
          })}

        {fetchCreatedJob &&
          fetchCreatedJob.map((data, index) => {
            //console.log(data);
            return (
              data.is_publish == false &&
              postedPage == false && (
                <>
                  <div
                    className="w-full h-60 bg-white rounded-3xl mb-7"
                    id={index + 1}
                  >
                    <div className="flex h-1/2 items-center justify-between p-6">
                      <div className="flex flex-col mt-2">
                        <span className="text-[#1C4481] font-bold">
                          {data.job_title}
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          {data.industry_name}
                        </span>
                        <span className="#292929 text-sm">
                          {data.state}, {data.city}
                        </span>
                        <span className="#292929 text-sm">{data.emp_type}</span>
                        <span className="#292929 text-sm">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                data.job_description.substring(0, 250)
                              ),
                            }}
                          />
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="place-items-center">
                          <button
                            className={buttonStyling}
                            onClick={() => editJobHandler(data?.id)}
                          >
                            <FaPen size="1rem" /> <p>Edit Job</p>
                          </button>
                        </div>
                        <button
                          className="border p-2 px-8 rounded-3xl  text-white bg-blue-950"
                          onClick={() => publishJobHandler(data.id_job_post)}
                        >
                          Publish Job
                        </button>
                      </div>
                    </div>
                    <hr class="border-t-[1px] border-[#1C4481]" />
                    <div className="flex justify-between p-6  text-[#1C4481]">
                      <div className="flex items-center gap-2">
                        <img src={pack} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481  font-bold">
                            Created Date
                          </span>
                          <span className="font-semibold">{data.add_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Department
                          </span>
                          <span className="font-semibold">
                            {data.department_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={duration} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Exeperience Range
                          </span>
                          <span className="font-semibold">
                            {data.experience_range}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">Salary</span>
                          <span className="font-semibold">
                            {data.min_salary} - {data.max_salary} Lakhs
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={passcode} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Active Days
                          </span>
                          <span className="font-semibold">
                            {data.no_of_days}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            );
          })}
      </div>
    </div>
  );
};

export default PostedJob;
