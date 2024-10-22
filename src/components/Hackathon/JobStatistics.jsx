import React, { useState, useEffect, useRef } from "react";
import pen from "../../assets/Hackathon/pen.png";
import Chart from "chart.js/auto";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import getJobPostState from "../../actions/Dashboard/getJobPostState";
import login from "../../actions/LoginScreens/login";

const HackathonStatistics = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loginData, setLoginData] = useState({});

  const [errors, setErrors] = useState(null);
  const chartRef = useRef(null);
  const chartRefs = useRef(null);

  const getJobStaticData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
      };
      const response = await getJobPostState(data);
      if (response?.data?.code === 1000) setStates(response?.data?.jobs);
    } catch (error) {
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
    getJobStaticData();
  }, []);

  useEffect(() => {
    if (states.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const job = states.map((data) => data.job_title);
      const appliedCandidate = states.map((data) => data.applied_candidate);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Jobs",
              data: job,
              borderColor: "blue",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Applied Candidate",
              data: appliedCandidate,
              borderColor: "green",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [states]);

  useEffect(() => {
    if (states.length > 0 && chartRefs.current) {
      const ctx = chartRefs.current.getContext("2d");
      const appliedCandidate = states.map((data) => data.applied_candidate);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Applied Candidate",
              data: appliedCandidate,
              borderColor: "green",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              fill: false,
              barThickness: 20,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [states]);

  const filterDataByDate = () => {
    if (startDate && endDate) {
      const filtered = states.filter((data) => {
        const jobDate = new Date(data.posted_date);
        return jobDate >= new Date(startDate) && jobDate <= new Date(endDate);
      });
      setFilteredStates(filtered);
    } else {
      setFilteredStates(states);
    }
  };

  useEffect(() => {
    filterDataByDate();
  }, [startDate, endDate, states]);

  const users = JSON.parse(localStorage.getItem("user"));
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="w-full  overflow-y-scroll no-scrollbar">
        <div className="w-full p-4 overflow-y-scroll no-scrollbar">
          <div className="flex items-center justify-between mb-2 mt-2 ml-2 w-full">
            <span className="font-semibold text-[#1C4481] text-2xl">
              Dashboard/ <span className="text-[18px]">Job Statistics</span>
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
        <div className="h-auto  flex flex-col border rounded-2xl p-5 mx-5 bg-[#e0e9f6]">
          <div className="flex justify-between items-center gap-4 mb-5 p-1">
            <div className="border rounded-xl shadow-lg w-3/5 bg-white h-[300px]">
              <canvas ref={chartRef}></canvas>
            </div>
            <div className="border rounded-xl shadow-lg bg-white w-2/5 h-[300px]">
              <canvas ref={chartRefs}></canvas>
            </div>
          </div>
          <div className="flex flex-col border rounded-2xl bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">All Job Lists</span>
              <div className="flex items-center gap-4">
                <span className="font-semibold">Start Date:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <span className="font-semibold">End Date:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={filterDataByDate}
                  className="border border-black rounded-2xl px-4 py-2"
                >
                  Filter
                </button>
                {/* <div className="flex justify-around items-center gap-2 border border-black rounded-2xl px-2">
                <span>Date</span>
                <img src={pen} alt="pen icon" />
              </div> */}
              </div>
            </div>
            <div className="w-full h-[250px] overflow-y-scroll border">
              <table className="table-auto w-full">
                <thead className="bg-blue-300 text-black sticky top-0">
                  <tr>
                    <th className="text-sm p-4">Job Title</th>
                    <th className="text-sm p-4">Industry</th>
                    <th className="text-sm p-4">Department</th>
                    <th className="text-sm p-4">Experience Range</th>
                    <th className="text-sm p-4">Salary Range</th>
                    <th className="text-sm p-4">Applied Candidate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStates &&
                    filteredStates.map((data) => (
                      <tr
                        key={data.id}
                        className="text-center border-b border-blue-500"
                      >
                        <td className="p-2">{data.job_title}</td>
                        <td className="p-2">{data.industry_name}</td>
                        <td className="p-2">{data.department_name}</td>
                        <td className="p-2">{data.experience_range}</td>
                        <td className="p-2">
                          {data.min_salary} to {data.max_salary}
                        </td>
                        <td className="p-2">{data.applied_candidate}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonStatistics;
