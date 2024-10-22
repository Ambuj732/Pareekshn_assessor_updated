import React, { useState, useEffect } from "react";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import close from "../../assets/Hackathon/close.png";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import message from "/message.png";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import getCorporateSizeData from "../../actions/Dashboard/getCorporateSize";
import getIndustry from "../../actions/MasterDataApi/getIndustry";
import getCorporateStageData from "../../actions/Dashboard/getCorporateStage";
import updateCorporateProfile from "../../actions/Dashboard/updateCorporateProfile";
import updateUsernameAndUserId from "../../actions/Dashboard/updateUsernameAndUserId";
import changeEmail from "../../actions/Dashboard/changeEmail";
import verifyEmailOTP from "../../actions/Dashboard/verifyEmailOTP";
import changeMobile from "../../actions/Dashboard/changeMobile";
import verifyOTPMobile from "../../actions/Dashboard/verifyOTPMobile";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const EditDashboardCorporateProfile = ({
  closeModal,
  location,
  industrys,
  names,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const corporateProfileSchema = Yup.object({
    email: Yup.string()
      .required("Enter valid email address")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .email(" Enter valid email address"),
  });

  const corporateNumberSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("Number is required")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    // .mobile("Enter valid phone number")
  });

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [corporateSize, setCoporateSize] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [corporateStage, setCorporateStage] = useState([]);
  const [erros, setErrors] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSent2, setOtpSent2] = useState(false);
  const [active, setActive] = useState("editCorporateProfile");
  const navigate = useNavigate();

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
      console.log("Id :: ", id);
      const data = {
        id_state: id,
      };
      console.log(data);
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
      console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    console.log(stateId);
    setSelectedState(stateId);
    getCitiesHandler(stateId);
    console.log("State :: ", stateId);
  };

  const getCorporateSize = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      const response = await getCorporateSizeData();
      console.log("Corporate Size res", response);
      if (response?.data?.code === 1000)
        setCoporateSize(response?.data?.corp_size);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getIndustryData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await getIndustry();
      console.log("Sector data", response);
      if (response?.data?.code === 1000)
        setIndustry(response?.data?.industries);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getCorporateStage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      const response = await getCorporateStageData();
      console.log("Corporate Stage res", response);
      if (response?.data?.code === 1000)
        setCorporateStage(response?.data?.stages);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const corporateEditHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      console.log("form data is ", formData);
      const data = {
        id_corp: user.id,
        usercode: user.token,
        id_city: Number(formData?.district),
        id_industry: Number(formData?.industry_related),
        founded_year: Number(formData?.founded_year),
        corporate_location: formData?.location,
        id_corporate_stage: Number(formData?.corporate_stage),
        id_state: Number(formData?.state),
        id_corporate_size: Number(formData?.corporate_size),
      };
      const response = await updateCorporateProfile(data);
      if (response?.data?.code === 1000) {
        toast.success("Profile Updated Successfully!");
      } else {
        toast.error("Profile not updated");
      }
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const userNameAndUserIdHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.usercode,
        name: formData?.Corporate_name,
        userID: formData?.userid,
        password: formData?.password,
      };
      const response = await updateUsernameAndUserId(data);
      if (response?.data?.code === 1000) {
        toast.success("Updated Successfully!");
      } else if (response?.data?.status === "UserID/Username already taken.") {
        toast.error("UserID/Username already taken");
      }
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const changeEmailIdHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        email: formData?.email,
        type: 2,
      };
      console.log(data);
      await corporateProfileSchema.validate(data, { abortEarly: false });
      const response = await changeEmail(data);
      console.log("hi");
      if (response?.data?.code === 1000) {
        toast.success(" Otp sent in your Email!");
        console.log("Data:", data);
        setOtpSent(true);
      } else if (
        response?.data?.status ===
        "Email already exist. Please use different one."
      ) {
        toast.error("Email already exist. Please use different one.");
      }
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setErrors(newErrors);
      toast.error("Enter valid Email address");
    }
  };

  const changeMobileHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        mobile: formData?.phoneNumber,
        type: 1,
      };
      console.log(data);
      // await corporateNumberSchema.validate(data, { abortEarly: false });
      console.log("Hi");
      const response = await changeMobile(data);
      if (response?.data?.code === 1000) {
        toast.success("Otp sent to your Phone Number!");
        console.log("Data:", data);
        setOtpSent2(true);
      } else if (
        response?.data?.code !== 1000 ||
        response?.status ===
          "Mobile Number already used. Please use different one."
      ) {
        toast.error("Mobile number is already registered!");
      }
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setErrors(newErrors);
      toast.error("Phone Number must be 10 digits and valid Phone number");
    }
  };

  const handleOtpSubmit = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        email: formData?.email,
        otp: formData?.otp,
      };
      console.log("Data", data);
      const response = await verifyEmailOTP(data);
      if (response?.data?.code === 1000) {
        toast.success(" Email updated Successfully!");
      } else if (response?.data?.code === 1001) {
        toast.error("Invalid otp");
      }
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const handlePhoneOtpSubmit = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        mobile: formData?.phoneNumber,
        otp: formData?.otp,
      };
      console.log("Data", data);
      const response = await verifyOTPMobile(data);
      if (response?.data?.code === 1000) {
        toast.success(" Phone Number Updated Successfully!");
      } else if (response?.data?.code === 1001) {
        toast.error("Invaild otp");
      }

      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  useEffect(() => {
    preData();
    getCorporateSize();
    getIndustryData();
    getCorporateStage();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="  w-1/2 h-4/5 bg-white overflow-y-scroll  rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
          <span className=" mx-4 text-lg font-medium ">Edit Profile</span>
          <button className="absolute top-2 right-2">
            <img
              src={close}
              onClick={closeModal}
              alt="Close"
              className="w-6 h-6"
            />
          </button>
        </div>
        <div className="">
          <div className="flex items-center gap-6 px-8 h-12">
            <span
              className={`${
                active == "editCorporateProfile"
                  ? " px-3 py-2 rounded bg-[#1C4481] text-white font-medium "
                  : ""
              } cursor-pointer`}
              onClick={() => setActive("editCorporateProfile")}
            >
              Update profile
            </span>
            <span
              className={`${
                active == "userNameAndUserIdHandler"
                  ? " px-3 py-2 rounded bg-[#1C4481] text-white font-medium "
                  : ""
              } cursor-pointer`}
              onClick={() => setActive("userNameAndUserIdHandler")}
            >
              Update Username and Userid
            </span>
            <span
              className={`${
                active == "changeEmailIdHandler"
                  ? " px-3 py-2 rounded bg-[#1C4481] text-white font-medium "
                  : ""
              } cursor-pointer`}
              onClick={() => setActive("changeEmailIdHandler")}
            >
              Email
            </span>
            <span
              className={`${
                active == "changeMobileHandler"
                  ? " px-3 py-2 rounded bg-[#1C4481] text-white font-medium "
                  : ""
              } cursor-pointer`}
              onClick={() => setActive("changeMobileHandler")}
            >
              Number
            </span>
          </div>

          {active == "editCorporateProfile" && (
            <div>
              <div>
                <form
                  id="form-id-1"
                  name="corporateEditHandler"
                  onSubmit={handleSubmit(corporateEditHandler)}
                >
                  <div className="flex gap-5 px-5 mt-7">
                    <div className="relative h-12 w-1/2">
                      <select
                        id_state="state_select"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        // defaultValue=""
                        {...register("state", { required: true })}
                        onChange={(e) => handleStateChange(e)}
                      >
                        <option value="">Select State</option>
                        {states?.map((data) => (
                          <option key={data?.id_state} value={data?.id_state}>
                            {data.state}
                          </option>
                        ))}
                      </select>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          State
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.state && (
                        <p className="text-error">Please check the state</p>
                      )}
                    </div>
                    <div className="relative h-12 w-1/2">
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
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          City
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.district && (
                        <p className="text-error">Please check the city</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 px-5 mt-7">
                    <div className="relative h-12 w-1/2">
                      <select
                        id_state="founded_year"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("founded_year", { required: true })}
                      >
                        <option value="">Select Year</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Founded Year
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.founded_year && (
                        <p className="text-error">Please check the year</p>
                      )}
                    </div>
                    <div className="relative h-12 w-1/2">
                      <select
                        id_state="corporate_size"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        // defaultValue=""
                        {...register("corporate_size", { required: true })}
                      >
                        <option value="">Corporate Size</option>

                        {corporateSize?.map((size) => (
                          <option key={size?.id} value={size.id}>
                            {size?.size_from} to {size?.size_to}
                          </option>
                        ))}
                      </select>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Corporate Size
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.corporate_size && (
                        <p className="text-error">
                          Please check the corporate size
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 px-5 mt-7">
                    <div className="relative h-12 w-1/2">
                      <select
                        defaultValue={industrys}
                        id="industry_related"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        {...register("industry_related", { required: true })}
                      >
                        <option value="">Select Industry</option>
                        {industry?.map((data) => (
                          <option key={data?.id} value={data.id}>
                            {data.industry_name}
                          </option>
                        ))}
                      </select>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Industry
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.industry_related && (
                        <p className="text-error">Please check the industry</p>
                      )}
                    </div>

                    <div className="relative h-12 w-1/2">
                      <select
                        id_state="corporate_stage"
                        className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("corporate_stage", { required: true })}
                      >
                        <option value="">Corporate Stage</option>
                        {corporateStage?.map((data) => (
                          <option key={data?.id} value={data?.id}>
                            {data.stage}
                          </option>
                        ))}
                      </select>
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Corporate Stage
                        </label>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={arrowDown}
                          alt="Arrow Down"
                          className="h-4 w-4"
                        />
                      </div>
                      {errors.corporate_stage && (
                        <p className="text-error">
                          Please check the Corporate Stage
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-7">
                    <div className="relative h-12 w-[350px] mx-4 ">
                      <div>
                        <input
                          type="text"
                          id="floating_filled"
                          className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                          placeholder=""
                          defaultValue={location}
                          {...register("location", {
                            required: true,
                          })}
                        />
                        <div
                          htmlFor="floating_filled"
                          className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                        >
                          <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                          <label htmlFor="" className="pl-2">
                            Location
                          </label>
                        </div>
                        {errors.location && (
                          <p className="text-error">
                            Please check the industry
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      type="submit"
                      id="btn-id-20"
                      className="border rounded-3xl bg-[#1C4481] px-10 py-2 text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          )}
          {active == "userNameAndUserIdHandler" && (
            <div>
              <form
                id="form-id-2"
                name="userNameAndUserIdHandler"
                onSubmit={handleSubmit(userNameAndUserIdHandler)}
              >
                <div className="flex gap-5 px-5 mt-7">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="text"
                        defaultValue={names}
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("Corporate_name", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Corporate Name
                        </label>
                      </div>
                      {errors.Corporate_name && (
                        <p className="text-error">
                          Please check the corporate name
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="useid"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("userid", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Userid
                        </label>
                      </div>
                    </div>
                    {errors.userid && (
                      <p className="text-error">Please check the userid</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-5 px-5 mt-7">
                  <div className="relative h-12 w-[350px]">
                    <div>
                      <input
                        type="password"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("password", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Enter Current Password
                        </label>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-error">Please check the password</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-10">
                  <button
                    type="submit"
                    id="btn-id-21"
                    className="border rounded-3xl bg-[#1C4481] px-10 py-2 text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          )}
          {active == "changeEmailIdHandler" && (
            <div>
              <div>
                <form
                  id="form-id-3"
                  name="changeEmailIdHandler"
                  onSubmit={handleSubmit(changeEmailIdHandler)}
                >
                  <div className="flex gap-5 px-5 mt-7 mb-7">
                    <div className="relative h-12 w-1/2">
                      <div>
                        <input
                          type="text"
                          id="email"
                          className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                          placeholder=""
                          {...register("email", {
                            required: true,
                          })}
                        />
                        <div
                          htmlFor="email"
                          className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                        >
                          <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                          <label htmlFor="email" className="pl-2">
                            Email
                          </label>
                        </div>
                        {errors.email && (
                          <p className="text-error">Please check the email</p>
                        )}
                        {/* {erros.email && (
                          <div className="error text-red-600 font-medium text-sm">
                            {erros?.email}
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      type="submit"
                      id="btn-id-22"
                      className="border rounded-3xl bg-blue-900 px-10 py-2 text-white"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
              <div>
                {otpSent && (
                  <form
                    id="form-id-4"
                    name="handleOtpSubmit"
                    onSubmit={handleSubmit(handleOtpSubmit)}
                  >
                    <div className="flex px-5 mt-7 mb-7">
                      <div className="relative h-12 w-1/2">
                        <div>
                          <input
                            type="Number"
                            id="otp"
                            className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                            placeholder=""
                            {...register("otp", {
                              required: true,
                            })}
                          />
                          <div
                            htmlFor="otp"
                            className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                          >
                            <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                            <label htmlFor="otp" className="pl-2">
                              Enter OTP
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                      <button
                        type="submit"
                        id="btn-id-23"
                        className="border rounded-3xl bg-[#1C4481] px-10 mb-10 py-2 text-white"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
                {/* <ToastContainer /> */}
              </div>
            </div>
          )}
          {active == "changeMobileHandler" && (
            <div>
              <div>
                <form
                  id="form-id-5"
                  name="changeMobileHandler"
                  onSubmit={handleSubmit(changeMobileHandler)}
                >
                  <div className="flex gap-5 px-5 mt-7 mb-7">
                    <div className="relative h-12 w-1/2">
                      <div>
                        <input
                          type="Number"
                          id="mobile_number"
                          className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                          placeholder=""
                          {...register("phoneNumber")}
                        />
                        <div
                          htmlFor="email"
                          className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                        >
                          <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                          <label htmlFor="email" className="pl-2">
                            Mobile Number
                          </label>
                        </div>
                        {errors?.phoneNumber && (
                          <p className="text-error">
                            Please check the phone number
                          </p>
                        )}
                        {erros?.phoneNumber && (
                          <div className="error text-red-600 font-medium text-sm">
                            {erros?.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      type="submit"
                      id="btn-id-24"
                      className="border rounded-3xl bg-blue-900 px-10 py-2 text-white"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
              <div>
                {otpSent2 && (
                  <form
                    id="form-id-6"
                    name="handlePhoneOtpSubmit"
                    onSubmit={handleSubmit(handlePhoneOtpSubmit)}
                  >
                    <div className="flex px-5 mt-7 mb-7">
                      <div className="relative h-12 w-1/2">
                        <div>
                          <input
                            type="Number"
                            id="otp"
                            className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                            placeholder=""
                            {...register("otp", {
                              required: true,
                            })}
                          />
                          <div
                            htmlFor="otp"
                            className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                          >
                            <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                            <label htmlFor="otp" className="pl-2">
                              Enter OTP
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                      <button
                        type="submit"
                        id="btn-id-25"
                        className="border rounded-3xl bg-[#1C4481] px-10 mb-10 py-2 text-white"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
                {/* <ToastContainer /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditDashboardCorporateProfile;
