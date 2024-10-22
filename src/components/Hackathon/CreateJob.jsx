import React, { useState, useEffect, useCallback } from "react";
import { selectOptions } from "../../constants";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import close from "../../assets/Hackathon/close.png";
import getCreatedJob from "../../actions/Dashboard/createJob";
import { useNavigate } from "react-router";
import queryString from "query-string";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import getStates from "../../actions/LoginScreens/getStates";
import getCities from "../../actions/LoginScreens/getCities";
import getIndustry from "../../actions/MasterDataApi/getIndustry";
import getDepartments from "../../actions/MasterDataApi/getDepartments";
import getEducation from "../../actions/MasterDataApi/getEducation";
import getSkills from "../../actions/MasterDataApi/getSkills";
import getEmpTypes from "../../actions/MasterDataApi/getEmpTypes";
import getExperienceRange from "../../actions/MasterDataApi/getExperienceRange";
import getJobData from "../../actions/Dashboard/getJobData";
import deleteJobQuestion from "../../actions/Dashboard/deleteJobQuestion";
import login from "../../actions/LoginScreens/login";
import editJob from "../../actions/Dashboard/editJob";
import Editor from "react-simple-wysiwyg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const animatedComponents = makeAnimated();

const CreateJob = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  //const [errors, setErrors] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [industry, setIndustry] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employmenttype, setEmploymentType] = useState([]);
  const [exeperienceRange, setExeperienceRange] = useState([]);
  const [education, setEducation] = useState([]);
  const [edu_s, setEdu] = useState([]);
  const [skills, setSkill] = useState([]);
  const [htmlDescription, setHtml] = useState("");
  const navigate = useNavigate();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  //const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [sal_ranges, setSalranges] = useState([]);
  const [questionSet, setQuestions] = useState([]);
  const [skillDefaultValues, setskillDefaultValues] = useState([]);
  const [eduDefaultValues, seteduDefaultValues] = useState([]);
  const [loginData, setLoginData] = useState({});
  const [items, setItems] = useState([]);
  const [selectedEduOptions, setSelectedEduOptions] = useState([]);
  const [selectedSkillOptions, setSelectedSkillOptions] = useState([]);

  let option = [];
  let educations = [];
  let salrange = [];
  let min = 1;
  let max = 100;
  let emptyEdu = "";
  let emptySkill = "";
  let emptyDesc = "";
  //const skillDefaultValue = [];
  const parsed = queryString.parse(window.location.search);
  const querystr = parsed.q;
  // Retrieve the value of a specific query parameter
  console.log(querystr);
  let jobid = 0;
  if (querystr != undefined) {
    // jobid = window.atob(querystr);
    jobid = 60;
    console.log(jobid);
  }
  const user = JSON.parse(localStorage.getItem("user"));

  const preData = async () => {
    try {
      const indianStates = await getStates();
      setStates(indianStates?.data?.states);
    } catch (error) {
      console.log(
        "Error while getting highest qualification or states :: ",
        error
      );
    }
  };

  const getCitiesHandler = async (id) => {
    try {
      const data = {
        id_state: id,
      };
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    getCitiesHandler(e.target.value);
    //console.log("State :: ", e.target.value);
  };

  const handleInputQuestionChange = (e) => {
    setQuestions(e.target.value);
    reset({
      question: "",
    });
  };

  const handleQuestionSave = () => {
    const newObj = { id: items.length + 1, name: questionSet, id_ques: 0 };
    const newArray = [...items, newObj];
    setItems(newArray);
    reset({
      question: "",
    });
  };

  const handleDeleteClick = (idx, id_job_ques) => {
    const newArray1 = [...items];
    newArray1.splice(idx, 1);
    setItems(newArray1);
    if (jobid != 0) {
      deleteQuestion(jobid, id_job_ques);
    }
  };

  const deleteQuestion = async (jobid, id_job_ques) => {
    try {
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        id_job_post: jobid,
        id_job_ques: id_job_ques,
      };
      const response = await deleteJobQuestion(data);
      if (response?.data?.code === 1000) console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
    }
  };

  const handleEduChange = (edu_s) => {
    let edus = "";
    for (let m = 0; m < edu_s.length; m++) {
      edus = edu_s[m].value + "," + edus;
    }
    edus = edus.slice(0, -1);
    setSelectedEduOptions(edus);
  };

  const handleSkillChange = (options) => {
    console.log(options);
    let skils = "";
    for (let m = 0; m < options.length; m++) {
      skils = options[m].value + "," + skils;
    }
    skils = skils.slice(0, -1);
    setSelectedSkillOptions(skils);
  };
  if (selectedEduOptions.length == 0) {
    emptyEdu = "Please select education and can select more than one";
  } else {
    emptyEdu = "";
  }
  if (selectedSkillOptions?.length == 0) {
    emptySkill = "Please select skill and can select more than one";
  } else {
    emptySkill = "";
  }

  const createJobHandler = async (formData) => {
    try {
      let companyname_hidden = 0;
      let question_submit = [];
      console.log("form data is ", formData);
      if (formData.companyname_hidden == false) {
        companyname_hidden = 0;
      } else {
        companyname_hidden = 1;
      }
      for (let m = 0; m < items.length; m++) {
        question_submit.push({ question: items[m].name });
      }
      if (selectedEduOptions.length == 0) {
        emptyEdu = "Please select the education and can select more than one";
      } else {
        emptyEdu = "";
      }
      if (selectedSkillOptions.length == 0) {
        emptySkill = "Please select the skill and can select more than one";
      } else {
        emptySkill = "";
      }
      if (!htmlDescription) {
        emptyDesc = "Please write your job description";
      } else {
        emptyDesc = "";
      }
      if (jobid == 0) {
        const data = {
          id_experience_range: Number(formData?.exeperienceRange),
          zip: Number(formData?.zip),
          street_address: formData?.street,
          represent_name: formData?.Representname,
          education: selectedEduOptions,
          is_company_name_hidden: companyname_hidden,
          id_employment_type: Number(formData?.employmenttype),
          questions: JSON.stringify(question_submit),
          skills: selectedSkillOptions,
          id_corp: user?.id,
          max_salary: formData?.max_salary,
          id_city: Number(formData?.district),
          id_industry: Number(formData?.Industry),
          job_description: htmlDescription,
          no_of_days: Number(formData?.Days),
          id_department: Number(formData?.department),
          min_salary: formData?.max_salary,
          usercode: user?.token,
          id_state: Number(selectedState),
          job_title: formData?.jobtitle,
        };
        const response = await getCreatedJob(data);
      } else {
        const data = {
          id_experience_range: Number(formData?.exeperienceRange),
          zip: Number(formData?.zip),
          street_address: formData?.street,
          represent_name: formData?.Representname,
          education: selectedEduOptions,
          is_company_name_hidden: companyname_hidden,
          id_employment_type: Number(formData?.employmenttype),
          questions: JSON.stringify(items),
          skills: selectedSkillOptions,
          id_corp: user?.id,
          max_salary: formData?.max_salary,
          id_city: Number(formData?.district),
          id_industry: Number(formData?.Industry),
          job_description: htmlDescription,
          no_of_days: Number(formData?.Days),
          id_department: Number(formData?.department),
          min_salary: formData?.max_salary,
          usercode: user?.token,
          id_state: Number(selectedState),
          job_title: formData?.jobtitle,
          id_job_post: Number(jobid),
        };
        console.log("Data:", data); //return;
        const response = await editJob(data);
      }

      if (response?.data?.code === 1000) {
        navigate("/dashboard/postedjob");
      }
      //console.log("Data After Call Api:", data);
      // navigate("/dashboard/createnewjob");
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const getIndustryData = async () => {
    try {
      const response = await getIndustry();
      console.log("Sector data", response);
      if (response?.data?.code === 1000)
        setIndustry(response?.data?.industries);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getDepartmentData = async () => {
    try {
      const response = await getDepartments();
      if (response?.data?.code === 1000)
        setDepartment(response?.data?.departments);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getEmpTypesData = async () => {
    try {
      const response = await getEmpTypes();
      if (response?.data?.code === 1000)
        setEmploymentType(response?.data?.emp_types);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getExpRangeData = async () => {
    try {
      const response = await getExperienceRange();
      if (response?.data?.code === 1000)
        setExeperienceRange(response?.data?.experience_range);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getEducationData = async () => {
    try {
      const response = await getEducation();
      if (response?.data?.code === 1000)
        setEducation(response?.data?.high_qual);
      educations = [];
      for (let m = 0; m < response?.data?.high_qual.length; m++) {
        educations.push({
          value: response?.data?.high_qual[m].id,
          label: response?.data?.high_qual[m].highest_qualification,
        });
      }
      setEdu(educations);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getSkillData = async () => {
    try {
      const response = await getSkills();
      if (response?.data?.code === 1000) {
        setSkill(response?.data?.skill_list);
        for (let i = 0; i < response?.data?.skill_list.length; i++) {
          option.push({
            value: response?.data?.skill_list[i].id,
            label: response?.data?.skill_list[i].skill_name,
          });
        }
        setOptions(option);
      } else {
        // toast to refresh page
      }
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };
  // function onChange(e) {
  //   setHtml(e.target.value);
  // }
  const handleEditorChange = (e) => {
    setHtml(e.target.value);
    setValue("description", e.target.value);
  };

  const getSalRangeData = async () => {
    try {
      for (let i = min; i <= max; i++) {
        salrange.push({ value: i, id: i });
      }
      setSalranges(salrange);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      //setErrors([error.message]);
    }
  };

  const getJobdetail = async () => {
    if (jobid != 0) {
      const data = {
        usercode: user?.token,
        id_corp: Number(user?.id),
        id_job_post: Number(jobid),
      };
      try {
        const response = await getJobData(data);
        if (response?.data?.code === 1000) {
          const job_post = response?.data?.job_post;
          reset({
            exeperienceRange: job_post.id_experience_range,
            zip: job_post.zip,
            street: job_post.street_address,
            Representname: job_post.represent_name,
            companyname_hidden: job_post.is_company_name_hidden,
            employmenttype: job_post.id_employment_type,
            min_salary: job_post.min_salary,
            Industry: job_post.id_industry,
            Days: job_post.no_of_days,
            department: job_post.id_department,
            max_salary: job_post.max_salary,
            jobtitle: job_post.job_title,
            state: job_post.id_state,
            district: job_post.id_city,
          });
          setHtml(job_post.job_description);
          setSelectedState(job_post.id_state);
          const eduDefaultValue = [];
          for (let i = 0; i < job_post?.education.length; i++) {
            eduDefaultValue.push({
              value: job_post?.education[i].id_hq,
              label: job_post?.education[i].highest_qualification,
            });
          }
          seteduDefaultValues(eduDefaultValue);
          let edusSelected = "";
          for (let m = 0; m < eduDefaultValue.length; m++) {
            edusSelected = eduDefaultValue[m].value + "," + edusSelected;
          }
          edusSelected = edusSelected.slice(0, -1);
          setSelectedEduOptions(edusSelected);

          const skillDefaultValue = [];
          for (let i = 0; i < job_post?.skill.length; i++) {
            skillDefaultValue.push({
              value: job_post?.skill[i].id_skill,
              label: job_post?.skill[i].skill_name,
            });
          }
          setskillDefaultValues(skillDefaultValue);
          let skillselected = "";
          for (let m = 0; m < skillDefaultValue.length; m++) {
            skillselected = skillDefaultValue[m].value + "," + skillselected;
          }
          skillselected = skillselected.slice(0, -1);
          setSelectedSkillOptions(skillselected);

          if (job_post?.questions.length > 0) {
            const quesDefaultValue = [];
            for (let i = 0; i < job_post?.questions.length; i++) {
              quesDefaultValue.push({
                id: job_post?.questions[i].id_ques,
                name: job_post?.questions[i].question,
              });
            }
            //const newArray = [...items, quesDefaultValue];
            setItems(quesDefaultValue);
          }
          getCitiesHandler(job_post.id_state);
          //const newObj = { id: items.length + 1, name: questionSet };
          //const newArray = [...items, newObj];
          //setItems(newArray);
        } else {
          // toast to refresh page
        }
      } catch (error) {
        console.log("Error while getting job data :: ", error);
        //setErrors([error.message]);
      }
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
    //setLoading(true);
    getSkillData();
    getEducationData();
    preData();
    getIndustryData();
    getDepartmentData();
    getEmpTypesData();
    getExpRangeData();
    getSalRangeData();
    getJobdetail();
  }, []);

  const users = JSON.parse(localStorage.getItem("user"));
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  return (
    <div className="h-screen flex overflow-hidden font-custom">
      <CorporateHackathonSidebar />
      <div className="flex flex-col w-screen p-2 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between  mt-4 ml-5">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Create Job</span>
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
        <div className="h-screen   border rounded-2xl p-4 m-5 bg-[#e0e9f6] overflow-y-scroll no-scrollbar ">
          <div className="h-screen border rounded-2xl shadow-xl m-2 p-4 bg-white overflow-y-scroll no-scrollbar">
            {/* <span className="text-[#1C4481] font-custom mx-4 py-10">
              Create Jobs
            </span> */}
            <form onSubmit={handleSubmit(createJobHandler)}>
              <div className="flex gap-5 justify-around px-5 mt-2">
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("jobtitle", {
                        required: true,
                        maxLength: 150,
                      })}
                    />
                    {errors.jobtitle && (
                      <p className="text-error">Please check the Job Title</p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Job Title
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("Representname", {
                        required: true,
                        maxLength: 30,
                      })}
                    />
                    {errors.Representname && (
                      <p className="text-error">
                        Please check the Represent Name
                      </p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Represent Name
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/2">
                  <div>
                    <select
                      id_industry="select_industry"
                      className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("Industry", {
                        required: true,
                      })}
                    >
                      <option value="">Select Industry</option>
                      {industry?.map((data) => (
                        <option key={data?.id} value={data.id}>
                          {data.industry_name}
                        </option>
                      ))}
                    </select>
                    {errors.Industry && (
                      <p className="text-error">Please select the Industry</p>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img
                        src={arrowDown}
                        alt="Arrow Down"
                        className="h-4 w-4"
                      />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Select Industry
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className="relative h-12 w-1/2">
                <select
                  id_industry="select_industry"
                  className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  defaultValue=""
                  {...register("Industry")}
                >
                  <option value="">Select Industry</option>
                  {industry?.map((data) => (
                    <option key={data?.id} value={data.id}>
                      {data.industry_name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                </div>
              </div> */}
              </div>
              <div className="flex gap-5 justify-around px-5 mt-10">
                <div className="relative h-12 w-1/2">
                  <div>
                    <select
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("department", {
                        required: true,
                      })}
                    >
                      <option value="">Select Department</option>
                      {department?.map((data) => (
                        <option key={data?.id} value={data.id}>
                          {data.department_name}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-error">Please select the Department</p>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img
                        src={arrowDown}
                        alt="Arrow Down"
                        className="h-4 w-4"
                      />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Department
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 mb-3 w-1/2">
                  <div>
                    <select
                      id="qualification_select"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("employmenttype", {
                        required: true,
                      })}
                    >
                      <option value="">Select Employment</option>
                      {employmenttype &&
                        employmenttype.map((data) => (
                          <option key={data?.id} value={data?.id}>
                            {data.employment_type}
                          </option>
                        ))}
                    </select>
                    {errors.employmenttype && (
                      <p className="text-error">
                        Please select the Employment Type
                      </p>
                    )}
                    <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                      <img src={arrowDown} />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={close} alt="" className="h-5 w-5" />
                      <label htmlFor="" className="pl-2">
                        Employment Type
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 mb-3 w-1/2">
                  <div>
                    <select
                      id="qualification_select"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("exeperienceRange", {
                        required: true,
                      })}
                    >
                      <option value="">Select Experience Range</option>
                      {exeperienceRange &&
                        exeperienceRange.map((data) => (
                          <option key={data?.id} value={data?.id}>
                            {" "}
                            {data.experience_range}
                          </option>
                        ))}
                    </select>
                    {errors.exeperienceRange && (
                      <p className="text-error">
                        Please select the Exeperience Range
                      </p>
                    )}
                    <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                      <img src={arrowDown} />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={close} alt="" className="h-5 w-5" />
                      <label htmlFor="" className="pl-2">
                        Exeperience Range
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 px-5 mt-10">
                <div className="relative h-12 mb-3 w-full">
                  <div>
                    <Select
                      defaultValue={eduDefaultValues}
                      // value={eduDefaultValues}
                      isMulti
                      onChange={handleEduChange}
                      options={edu_s}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isClearable
                      //isSearchable={isSearchable}
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      style="border: none;"
                      rules={{ required: true }}
                    />
                    {emptyEdu && <p className="text-error">{emptyEdu}</p>}

                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={close} alt="" className="h-5 w-5" />
                      <label htmlFor="" className="pl-2">
                        Education
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 mb-3 w-[325px]">
                  <div>
                    <select
                      id="minsalary"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("min_salary", {
                        required: true,
                      })}
                    >
                      <option value="">Select Salary</option>
                      {sal_ranges?.map((data) => (
                        <option value={data.id}>{data.value}</option>
                      ))}
                    </select>
                    {errors.min_salary && (
                      <p className="text-error">Please select the min salary</p>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img
                        src={arrowDown}
                        alt="Arrow Down"
                        className="h-4 w-4"
                      />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <label htmlFor="" className="pl-2">
                        Min. Salary(Lakhs)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 mb-3 w-[325px]">
                  <div>
                    <select
                      id="max-salary"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("max_salary", {
                        required: true,
                      })}
                    >
                      <option value="">Select Salary</option>
                      {sal_ranges?.map((data) => (
                        <option value={data.id}>{data.value}</option>
                      ))}
                    </select>
                    {errors.max_salary && (
                      <p className="text-error">Please select the max salary</p>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img
                        src={arrowDown}
                        alt="Arrow Down"
                        className="h-4 w-4"
                      />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <label htmlFor="" className="pl-2">
                        Max. Salary(Lakhs)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border relative rounded-2xl w-[90] h-auto shadow-xl mt-10 ml-4">
                {/* <span className=" m-7 text-blue-600">Description</span> */}
                <Editor
                  containerProps={{
                    style: {
                      resize: "vertical",
                      height: "100%",
                      // overflow: "scroll",
                      // Adjust this based on the height of your header
                    },
                  }}
                  value={htmlDescription}
                  onChange={(e) => handleEditorChange(e)}
                />
                {emptyDesc && <p className="text-error">{emptyDesc}</p>}
                <style jsx>{`
                  .ql-toolbar.ql-snow {
                    position: fixed;
                    top: 0;
                    z-index: 1;
                    background: white;
                  }
                `}</style>
              </div>
              <div className="flex gap-5 justify-around px-5 mt-10">
                <div className="relative h-12 w-1/4">
                  <div>
                    <input
                      type="number"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      defaultValue=""
                      {...register("Days", { required: true })}
                    />
                    {errors.Days && (
                      <p className="text-error">
                        Please check the job active days
                      </p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Job Acitve Days
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      defaultValue=""
                      {...register("street", { required: true })}
                    />
                    {errors.street && (
                      <p className="text-error">
                        Please check the job location
                      </p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Address
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/3">
                  <div>
                    <select
                      id="state_select"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...register("state", { required: true })}
                      onChange={(e) => handleStateChange(e)}
                    >
                      <option value="" disabled hidden>
                        Select State
                      </option>
                      {states?.map((state) => (
                        <option key={state?.id_state} value={state.id_state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-error">Please select the state</p>
                    )}
                    <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                      <img src={arrowDown} />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={close} alt="" className="h-5 w-5" />
                      <label htmlFor="" className="pl-2">
                        State
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 px-5 mt-10">
                <div className="relative h-12 w-1/4">
                  <div>
                    <select
                      id="state_city"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      placeholder=""
                      defaultValue=""
                      {...register("district", { required: true })}
                    >
                      <option value="">Select District</option>
                      {districts?.map((district) => (
                        <option
                          key={district?.id_city}
                          value={district.id_city}
                        >
                          {district?.city}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-error">Please select the district</p>
                    )}
                    <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                      <img src={arrowDown} />
                    </div>
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={close} alt="" className="h-5 w-5" />
                      <label htmlFor="" className="pl-2">
                        District
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/4">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("zip", { required: true })}
                    />
                    {errors.zip && (
                      <p className="text-error">Please check the zip code</p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Zip Code
                      </label>
                    </div>
                  </div>
                </div>

                <div className="relative h-12 w-1/3">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer disabled:opacity-75"
                      readOnly="readOnly"
                      disabled="disabled"
                      placeholder=""
                      // {...register("street", { required: true })}
                    />
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          {...register("companyname_hidden", {
                            required: false,
                          })}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-bold text-gray-900 dark:text-gray-300">
                          Company Name Hidden
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 px-5 mt-9">
                <div className="relative h-12 w-full">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // value={skillDefaultValues}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    name="skills"
                    isMulti
                    options={options}
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    style="border: none;"
                    onChange={handleSkillChange}
                    rules={{ required: true }}
                  />
                  {emptySkill && <p className="text-error">{emptySkill}</p>}
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Skill
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 w-[full] mt-12 mx-4">
                <div className="border border-black rounded-3xl h-auto  shadow-2xl mt-5">
                  <div className="flex gap-4 mx-6 mt-4">
                    <span className="text-[#1C4481] text-2xl">
                      Questionnarie
                    </span>
                    <span className="text-[#939292] font-custom">
                      (Questionnarie is not mandatory)
                    </span>
                  </div>
                  {items.length > 0 &&
                    items?.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          id={`id-${idx}`}
                          className="flex justify-between mx-4 mt-4 mb-5 font-custom"
                        >
                          <div className="flex gap-3">
                            ({idx + 1})
                            <span className="text-[#000000]">{item.name}</span>
                          </div>
                          <div>
                            <FaTrash
                              onClick={() => handleDeleteClick(idx, item.id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  {/* <div className="flex justify-between mx-4 mt-4 font-custom">
                  <div className="flex gap-3">
                    <img className="w-5 h-5" src={close} />
                    <span className="text-[#000000]">
                      What is your strength
                    </span>
                  </div>
                  <img src={close} className="w-5 h-5 mt-1" />
                </div> */}
                  <div className="mt-4 mb-5">
                    <div>
                      <span className="text-[#848484] mx-4 mt-4">
                        write a Question here
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="border rounded-xl w-[60%] h-[80px] shadow-sm mx-4 px-5 outline-none"
                      {...register("question", { required: false })}
                      onBlur={(e) => handleInputQuestionChange(e)}
                      //onChange={handleInputQuestionChange}
                    />
                    <button
                      type="button"
                      className="bg-blue-900 text-white px-5 py-2 rounded-full"
                      onClick={(e) => handleQuestionSave(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-5 py-2 rounded-full mt-5 mb-5"
                >
                  Post Job
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
