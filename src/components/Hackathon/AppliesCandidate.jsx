import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import getAppliedCandidate from "../../actions/Dashboard/getAppliedCandidate";
import { Navigate, useNavigate, useLocation } from "react-router";

const AppliesCandidate = () => {
  const [appliedCandidate, setAppliedCandidate] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id_job_post = location.state?.id_job_post;
  console.log(id_job_post);

  const appliedCandidateData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        id_job_post: id_job_post,
      };
      const response = await getAppliedCandidate(data);
      console.log("Applied candidate  data", response);
      if (response?.data?.code === 1000)
        setAppliedCandidate(response?.data?.candidate);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    appliedCandidateData();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden ">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-ascrollbar ">
        <div className="flex gap-3 mt-8">
          <img src={arrowLeft} className="w-6 h-6" onClick={handleBack} />
          <span className="text-sm font-bold text-blue-700">
            Applies Candidate
          </span>
        </div>
        {appliedCandidate &&
          appliedCandidate.map((data) => (
            <div className="flex border rounded-2xl shadow-lg w-full h-[80px] mt-4 p-2 bg-white justify-between ">
              <div className="flex gap-10 mt-4  px-4 ">
                <img
                  src={data.profile_pic}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-blue-700 font-bold text-sm">Name</span>
                  <span>{data.student_name}</span>
                </div>
                <div className="flex flex-col mx-14">
                  <span className="text-blue-700 font-bold text-sm">
                    Mob.No
                  </span>
                  <span>{data.mobile_no}</span>
                </div>
                <div className="flex flex-col mx-14">
                  <span className="text-blue-700 font-bold text-sm">
                    Email ID
                  </span>
                  <span>{data.email_id}</span>
                </div>
              </div>
              <div>
                <img src={arrowLeft} className="mx-4 mt-2" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppliesCandidate;
