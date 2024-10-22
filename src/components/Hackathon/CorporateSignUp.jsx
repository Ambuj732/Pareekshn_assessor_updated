import React, { useState, useEffect } from "react";
import leftBg from "../../assets/Hackathon/leftBg.jpg";
import arrowLeft from "/arrowLeft.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import pareekshn_logo from "../../assets/Hackathon/pareekshn_logo.png";
import tablet from "/Tablet.png";
import message from "/message.png";
import userProfile from "/userProfile.png";
import viewHideIcon from "/View_hide_light.png";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import corporateRegister from "../../actions/LoginScreens/register";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import * as Yup from "yup";

function CorporateSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [set_errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [idCorp, setIDCorp] = useState("");

  const corporateSignupSchema = Yup.object({
    corp_name: Yup.string().required("Name is required"),
    corp_email: Yup.string()
      .required("Email is Required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .email(" Enter valid email address"),
    corp_mob: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Number is required"),
    corp_userid: Yup.string()
      .required("UserId is required")
      .min(6, "UserID should be atleast 6 characters"),
    password: Yup.string()
      .min(6, " Password should be atleast 6 characters")
      .required("Password is required"),
    id_state: Yup.string().required("State is required"),
    // corp_city: Yup.string().required("City is required"),
  });

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
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
      console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    getCitiesHandler(e.target.value);
    console.log("State :: ", e.target.value);
  };

  useEffect(() => {
    preData();
  }, []);

  const handleback = () => {
    navigate(-1);
  };

  const corporateRegisterHandler = async (formData) => {
    try {
      console.log("form data is ", formData);
      const data = {
        password: formData?.password,
        id_city: Number(formData?.district),
        corp_email: formData?.email,
        corp_userid: formData?.userid,
        corp_name: formData?.name,
        corp_mob: formData?.Number,
        id_state: Number(selectedState),
      };

      await corporateSignupSchema.validate(data, { abortEarly: false });
      const response = await corporateRegister(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        toast.success("Otp sent for Verification!");
        localStorage.setItem("id_corp", JSON.stringify(response.data.id_corp));
        setTimeout(() => {
          navigate("/verfiyOtp2");
        }, 1000);
      } else if (
        response?.data?.status ===
        "Username already exist. Please use different one."
      ) {
        toast.error("Username exits");
      } else if (response?.data?.status === "Mobile Number already Register.") {
        toast.error("Mobile Number exits");
      } else if (response?.data?.status === "Email already Register.") {
        toast.error("Email already exits");
      }
    } catch (error) {
      console.log("Error while signup :: ", error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setErrors(newErrors);
      toast.error("Error while Signup");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(corporateRegisterHandler)}
        className=" w-full flex justify-center items-center"
      >
        <img
          src={pareekshn_logo}
          alt=""
          className="absolute top-3 left-3 h-24"
        />
        <div className="absolute inset-0 z-[-1] overflow-hidden bg-[#2F5185]">
          {/* <img
					src={leftBg}
					alt=""
					className="w-full h-full object-fill  cursor-pointer absolute inset-0"
				/> */}
        </div>
        <div className="bg-[#ffffff] h-[460px] w-3/4 lg:w-4/5 xl:w-2/3 rounded-3xl p-6 flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-6 overflow-y-scroll px-2">
            <div className="flex justify-between items-center">
              <img
                src={arrowLeft}
                alt=""
                className="bg-[#1C4481] w-6 h-6 rounded-full"
                onClick={handleback}
              />
              <div className="flex flex-col items-end">
                <span className="font-semibold text-[#AFAFAF]">Create</span>
                <span className="font-semibold text-[#222222]">an Account</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex text-sm items-center gap-2 text-[#1C4481]">
                    <img src={userProfile} alt="" className="h-5 w-5" />
                    <input
                      className="outline-none"
                      placeholder={"Name*"}
                      {...register("name", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                  </div>
                </div>
                {errors.name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check name
                  </p>
                )}
              </div>

              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                    <img src={message} alt="" className="h-5 w-5" />
                    <input
                      className="outline-none"
                      placeholder={"Email*"}
                      {...register("email")}
                    ></input>
                  </div>
                </div>
                {errors.name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check email
                  </p>
                )}

                {set_errors.corp_email && (
                  <div className="error text-red-600 font-medium text-sm">
                    {set_errors?.corp_email}
                  </div>
                )}
              </div>
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                    <img src={tablet} alt="" className="h-5 w-5" />
                    <input
                      type="tel"
                      className="outline-none"
                      placeholder={"Mobile Number*"}
                      {...register("Number")}
                    ></input>
                  </div>
                </div>
                {errors.name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check Phone Number
                  </p>
                )}
                {set_errors?.corp_mob && (
                  <div className="error text-red-600 font-medium text-sm">
                    {set_errors.corp_mob}
                  </div>
                )}
              </div>

              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center dark:focus:border-blue-500 ">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481] w-full h-full dark:focus:border-blue-500">
                    <img src={userProfile} alt="" className="h-5 w-5" />
                    <input
                      type="text"
                      className="outline-none w-full  bg-white "
                      placeholder="User Id"
                      {...register("userid")}
                    ></input>
                  </div>
                </div>
                {errors.name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check userId
                  </p>
                )}
                {set_errors.corp_userid && (
                  <div className="error text-red-600 font-medium text-sm">
                    {set_errors?.corp_userid}
                  </div>
                )}
              </div>
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center justify-between text-sm gap-2 w-full text-[#1C4481]">
                    <img src={message} alt="" className="h-5 w-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="outline-none w-full"
                      placeholder={"Password*"}
                      {...register("password")}
                    />
                  </div>
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
                {errors.name && (
                  <p className="error text-red-600 font-medium text-sm">
                    Please check password
                  </p>
                )}
                {set_errors.password && (
                  <div className="error text-red-600 font-medium text-sm">
                    {set_errors?.password}
                  </div>
                )}
              </div>

              <div className="relative h-12 mb-3 w-full">
                <div className="">
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md  dark:border-gray-600  focus:outline-none focus:ring-0"
                    {...register("selectedState", {
                      required: "Please check state",
                    })}
                    onChange={(e) => handleStateChange(e)}
                  >
                    <option value="">Select State</option>
                    {states?.map((state) => (
                      <option key={state?.id_state} value={state.id_state}>
                        {state.state}
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
                </div>
                {errors.selectedState && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.selectedState.message}
                  </div>
                )}
              </div>
              <div className="relative h-12 mb-3 w-full">
                <div>
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md  dark:border-gray-600  focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("district", { required: "Please check city" })}
                  >
                    <option value="" disabled hidden>
                      Select City
                    </option>
                    {districts?.map((district) => (
                      <option key={district?.id_city} value={district.id_city}>
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
                </div>
                {errors.district && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.district.message}
                  </div>
                )}
              </div>

              <div className="flex mx-10 items-center gap-3">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                  className="w-5 h-5"
                />
                <span className="font-semibold">
                  I agree to the Terms & Conditions
                </span>
              </div>
              {errors.terms && (
                <div className="error text-red-600 font-medium text-sm -mt-5">
                  {errors.terms.message}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full h-full border rounded-full text-white bg-[#1C4481] py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CorporateSignUp;
