import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import SampleBanner from "./SampleBanner";
import close from "../../assets/Hackathon/close.png";
import twoperson from "../../assets/Hackathon/twoperson.png";
import { IoPerson } from "react-icons/io5";
import bannertitle from "../../assets/Hackathon/bannertitle.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import attach from "../../assets/Hackathon/attach.png";
import time from "../../assets/Hackathon/time.png";
import bannersize from "../../assets/Hackathon/bannersize.png";
import edit from "../../assets/Hackathon/edit.png";
import TimePicker from "./TimePicker";
import { useForm } from "react-hook-form";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import createHackathon from "../../actions/Dashboard/createHackathon";
import getCreateHackathonWeb from "../../actions/Dashboard/createBannerWeb";
import getSectors from "../../actions/MasterDataApi/getSectors";
import getDifficultyLevel from "../../actions/MasterDataApi/getDifficultyLevel";
import getLanguageList from "../../actions/MasterDataApi/getLanguageList";
import getCourses from "../../actions/MasterDataApi/getCourses";
import getBannerSample from "../../actions/MasterDataApi/getBannerSample";
import { useNavigate } from "react-router";
import Editor from "react-simple-wysiwyg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateHackathon() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [sector, setSector] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  const [user, setUser] = useState({});
  const [language, setLanguage] = useState([]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [bannerfile, setBannerFile] = useState();
  const [logofile, setLogoFile] = useState();
  const [bannerData, setBannerData] = useState([]);
  const [htmlDescription, setHtml] = useState("");
  const [planType, setPlanType] = useState("free");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleBannerChange = (e) => {
    setBannerFile(e.target.files[0]);
  };
  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("User :: ", users);
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  const preData = async () => {
    try {
      const indianStates = await getStates();
      setStates(indianStates?.data?.states);
      const allCourses = await getCourses();
      //console.log(allCourses?.data?.courses);
      setCourses(allCourses?.data?.courses);
    } catch (error) {
      console.log(
        "Error while getting highest qualification or states :: ",
        error
      );
    }
  };

  const getCitiesHandler = async (id) => {
    try {
      console.log("Id :: ", id);
      const data = {
        id_state: id,
      };
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
      // console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const getBannerSampleData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User:", user);
      const data = {
        id_corp: 2,
        usercode: user?.usercode,
      };
      const response = await getBannerSample(data);
      console.log(response);
      if (response?.data?.code === 1000) setBannerData(response?.data?.banners);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    //console.log(stateId);
    setSelectedState(stateId);
    getCitiesHandler(stateId);
    console.log("State :: ", stateId);
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    //console.log(courseId);
    setSelectedCourse(courseId);
  };

  const getSectorData = async () => {
    try {
      const data = {
        usercode: user?.usercode,
        id_self_student: 1,
      };
      const response = await getSectors(data);
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setSector(response?.data?.sector);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getDifficultyLevelData = async () => {
    try {
      const response = await getDifficultyLevel();
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setDifficultyLevel(response?.data?.dl);
      ///console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getLanguageListData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log("User :: ", user);
      const response = await getLanguageList();
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setLanguage(response?.data?.lang_list);
      //console.log(response);
    } catch (error) {
      //console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Define the onload event handler
      reader.onload = () => resolve(reader.result);

      // Define the onerror event handler
      reader.onerror = (error) => reject(error);

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
  }

  const createHackathonHandler = async (formData) => {
    console.log(formData);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const logoImage = await fileToBase64(logofile);
      const data = {
        exam_start_time: formData?.hackathonTime + ":00",
        paid: formData?.planType === "paid" ? 1 : 0,
        amount: Number(formData?.amount) || 0,
        id_course: Number(formData?.course),
        hackthon_title: formData?.title,
        id_level_difficulty: Number(formData?.level),
        id_corp: user?.id,
        id_lang: Number(formData?.language),
        negative: formData?.negative === "yes" ? 1 : 0,
        id_state: Number(selectedState),
        id_city: Number(formData?.district),
        id_sector: Number(formData?.sector),
        date_of_exam: formData?.examDate,
        passing_percentage: Number(formData?.passPercent),
        usercode: user?.token,
        file: logoImage,
      };
      // Create Hackathon
      const response = await createHackathon(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        toast.success("Hackathon  has been created");
      } else if (response?.data?.status === "Data Already Existed.") {
        toast.error("Data Already Existed");
      }
      const id_hackathon = response?.data?.id_hackathon;
      if (response.status == 200) {
        const code = response?.data?.code;
        if (code === 1000 || (code === 1004 && id_hackathon)) {
          const bannerImage = await fileToBase64(bannerfile);
          // Create Banner
          const bannerData = {
            id_corp: user?.id,
            display_start_date: startDate,
            display_end_date: endDate,
            display_start_time: "",
            display_end_time: "",
            banner_title: formData?.bannerTitle,
            id_banner_size: Number(formData?.banner_size),
            id_hackthon: id_hackathon,
            usercode: user?.token,
            banner_description: htmlDescription,
            file: bannerImage,
          };
          console.log(bannerData);
          const response = await getCreateHackathonWeb(bannerData);
          console.log(response);
          if (response?.data?.code === 1000) {
            toast.success("Banner has been created");
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          } else {
            toast.error("Banner is not created");
          }
        } else {
          setError(
            "Please try again. There is an error in creating hackathon."
          );
          return;
        }
      } else {
        setError("Please try again.");
        return;
      }
    } catch (error) {
      console.log(
        "Please try again. There is an error in creating hackathon. :: ",
        error
      );
    }
  };

  const handlePlanChange = (e) => {
    setPlanType(e.target.value);
  };
  const handleEditorChange = (e) => {
    setHtml(e.target.value);
    setValue("description", e.target.value);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    preData();
    getSectorData();
    getDifficultyLevelData();
    getLanguageListData();
    getBannerSampleData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 mt-2 ml-2">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Create Hackathon</span>
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
        <div className="bg-[#EDF2FF] min-h-screen flex justify-center items-center rounded-3xl mt-8">
          <div className="bg-white min-h-screen  p-8 flex flex-col gap-6 w-full m-7 rounded-3xl">
            {/* <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium text-[#1C4481]">
                Create Hackathon
              </span>
            </div> */}
            <form onSubmit={handleSubmit(createHackathonHandler)}>
              <div className="flex flex-col gap-6">
                <div className="flex gap-5 justify-around px-1 mt-2">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="text"
                        id="floating_filled"
                        placeholder=""
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("title", { required: true })}
                      />
                      {errors.title && (
                        <p className="text-error">Please check the title</p>
                      )}
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Add Title
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="sector_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("sector", { required: true })}
                      >
                        <option value="">Select Sector</option>
                        {sector?.map((data) => (
                          <option key={data?.id_sector} value={data.id_sector}>
                            {data.sector_name}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="text-error">Please check the sector</p>
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
                          Select Sector
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="sector_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("course", { required: true })}
                      >
                        <option value="">Select Eligibility</option>
                        {courses?.map((data) => (
                          <option key={data?.id} value={data.id}>
                            {data.course_name}
                          </option>
                        ))}
                      </select>
                      {errors.course && (
                        <p className="text-error">Please check the course</p>
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
                          Select Eligibility
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-around px-1 mt-4 mb-4">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="difficulty_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("level", { required: true })}
                      >
                        <option value="">Select Difficulty Level</option>
                        {difficultyLevel?.map((data) => (
                          <option key={data?.id} value={data.id}>
                            {data.level_difficulty_name}
                          </option>
                        ))}
                      </select>

                      {errors.level && (
                        <p className="text-error">Please check the level</p>
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
                          Select Difficulty Level
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="language_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("language", { required: true })}
                      >
                        <option value="">Select Language</option>
                        {language?.map((data) => (
                          <option key={data?.id} value={data?.id}>
                            {data.lang_name}
                          </option>
                        ))}
                      </select>

                      {errors.language && (
                        <p className="text-error">Please check the language</p>
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
                          Select Language
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="state_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        // defaultValue=""
                        onChange={(e) => handleStateChange(e)}
                      >
                        <option value="">Select State</option>
                        {states?.map((data) => (
                          <option key={data?.id_state} value={data?.id_state}>
                            {data.state}
                          </option>
                        ))}
                      </select>
                      {errors.language && (
                        <p className="text-error">Please check the state</p>
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
                          Select State
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id_state="level_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        // defaultValue=""
                        {...register("district", { required: true })}
                      >
                        <option value="">Select City</option>
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
                        <p className="text-error">Please check the city</p>
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
                          Select City
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-around px-1 mt-4 mb-4">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="date"
                        id="floating_filled"
                        placeholder=""
                        className="block pl-8 pr-4 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("examDate", { required: true })}
                      />
                      {errors.examDate && (
                        <p className="text-error">Please check the exam date</p>
                      )}
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Exam Date
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" relative h-12 w-1/2 ">
                    <div>
                      <input
                        type="time"
                        id="floating_filled"
                        placeholder=""
                        className="block pl-8 pr-4 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("hackathonTime", { required: true })}
                      />
                    </div>
                    {errors.hackathonTime && (
                      <p className="text-error">
                        Please check the hackathon time
                      </p>
                    )}
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="" className="pl-2">
                        Exam Time
                      </label>
                    </div>
                  </div>
                  <div className=" relative h-12 w-1/2">
                    <div>
                      <input
                        type="Number"
                        id="floating_filled"
                        placeholder=""
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("passPercent", { required: true })}
                      />
                      {errors.passPercent && (
                        <p className="text-error">
                          Please check the percentage
                        </p>
                      )}
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Passing percentage
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" relative h-12 w-1/2 ">
                    <div>
                      <select
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        {...register("negative", { required: true })}
                      >
                        <option value="">Please Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {errors.negative && (
                        <p className="text-error">required</p>
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
                          Paid type
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-6 mb-14">
                  <div className=" relative h-12 w-1/2 flex flex-col mb-5">
                    <div className=" h-full w-full mb-2 ">
                      <div className="flex">
                        <div className="cursor-pointer ml-2">
                          <input
                            type="file"
                            id="logo_file"
                            onChange={(e) => handleLogoChange(e)}
                            className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                            accept="image/*"
                            /* {...register("companyLogo")} */
                          />
                        </div>
                      </div>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Select Corporate Logo
                        </label>
                      </div>
                    </div>
                    <span className="text-[15px] mt-2 text-[#848484]">
                      Supported formats PNG, JPEG and File size max 1mb
                    </span>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex items-center mb-4 ">
                      <input
                        id_state="free"
                        type="radio"
                        value="free"
                        name="value"
                        className="w-6 h-6 text-blue-600"
                        {...register("planType", { required: true })}
                        onChange={handlePlanChange}
                      />
                      <label
                        for="default-radio-1"
                        className="ms-2 text-xl text-semibold"
                      >
                        Free
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id_state="paid"
                        type="radio"
                        value="paid"
                        name="planType"
                        className="w-6 h-6 text-blue-600"
                        {...register("planType", { required: true })}
                        onChange={handlePlanChange}
                      />
                      <label
                        for="default-radio-1"
                        className="ms-2 text-xl text-semibold"
                      >
                        Paid
                      </label>
                    </div>
                  </div>
                  {planType === "paid" && (
                    <div className="flex items-center mb-4 mx-6 gap-3">
                      <input
                        type="number"
                        placeholder="Rs."
                        className="pl-4 no-spinner border-2 w-auto h-full py-3 rounded-md outline-none"
                        {...register("amount", {
                          required: planType === "paid",
                        })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <div className="bg-[#E7F0FF] px-4 py-2 rounded-md text-[#1C4481] font-medium">
                  <span>Add Banner</span>
                </div>

                <div className="flex gap-10 justify-around px-1  mt-4 mb-4">
                  <div className=" relative h-12 w-1/2 ">
                    <div>
                      <input
                        type="text"
                        placeholder=""
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("bannerTitle", { required: true })}
                      />
                      {errors.bannerTitle && (
                        <p className="text-error">
                          Please check the Banner title
                        </p>
                      )}
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Banner Title
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" relative h-12 w-1/2 ">
                    <div>
                      <input
                        type="date"
                        placeholder=""
                        className="block pl-8 pr-4 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("display_start_date", { required: true })}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />

                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Display Start Date
                        </label>
                      </div>
                    </div>
                    {errors?.display_start_date && (
                      <p className="text-error">Please check the start date</p>
                    )}
                  </div>
                  <div className="  relative h-12 w-1/2 ">
                    <div>
                      <input
                        type="date"
                        placeholder=""
                        className="block pl-8 pr-4 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("display_end_date", { required: true })}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                      />
                      {errors.display_end_date && (
                        <p className="text-error">Please check the end date</p>
                      )}
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Display End Date
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 justify-around px-1 mt-4 mb-10">
                  <div className=" h-auto w-full ">
                    <span className="font-semibold ml-1">Description</span>
                    <Editor
                      containerProps={{
                        style: {
                          resize: "vertical",
                          height: "100%",
                        },
                      }}
                      value={htmlDescription}
                      onChange={(e) => handleEditorChange(e)}
                      className="fixed z-50 px-5 border-none outline-none h-full overflow-y-scroll"
                    />
                  </div>
                </div>
                <div className="flex gap-10 justify-around px-1 mt-4 mb-4">
                  <div className=" relative h-12 w-1/2 ">
                    <div>
                      <select
                        id_state="banner-size-selection"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        {...register("banner_size", { required: true })}
                      >
                        <option value="">Select Banner Size</option>
                        {bannerData?.map((data) => (
                          <option key={data?.id} value={data.id}>
                            {data.width}x{data.height}
                          </option>
                        ))}
                      </select>
                      {errors.banner_size && (
                        <p className="text-error">
                          Please check the Banner size
                        </p>
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
                          Select Banner Size
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <div className="flex">
                        <div className="cursor-pointer ml-2">
                          <input
                            type="file"
                            id="attachment"
                            onChange={(e) => handleBannerChange(e)}
                            className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                            accept="image/*"
                            /* {...register("banner")} */
                          />
                        </div>
                      </div>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Select Banner
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div
                      className=" flex pl-8 pr-8 text-black pb-4 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 cursor-pointer"
                      onClick={openModal}
                    >
                      <img src={bannersize} alt="" className="h-4 w-5 ml-4" />
                      <span className="text-sm text-[#1C4481] justify-between">
                        Sample Banner
                      </span>
                    </div>
                    {isModalOpen && <SampleBanner onClose={closeModal} />}
                  </div>
                </div>
              </div>

              <div className="flex py-7 items-center mt-10">
                <button
                  type="submit"
                  className="border rounded-full bg-blue-900 py-3 w-[200px] text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateHackathon;
