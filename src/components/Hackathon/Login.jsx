import React, { useState } from "react";
import leftBg from "../../assets/Hackathon/leftBg.jpg";
import pareekshn_logo from "../../assets/Hackathon/pareekshn_logo.png";
import { BsThreeDots } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { LuSquareAsterisk } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import ApiResponse from "../ApiResponse";
import login from "../../actions/LoginScreens/login";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [set_errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (formData) => {
    try {
      const data = {
        username: formData?.username,
        password: formData?.password,
        notification_id: "sdfsdfssdf",
      };
      setErrors({});
      const response = await login(data);
      const code = response?.data?.code;
      const message = response?.data?.status;
      if (code !== 1000) {
        //console.log("Message :: ", message);
        toast.error("Username or Password Wrong!");
        return;
      }
      localStorage.setItem("user", JSON.stringify(response.data.corp_profile));
      toast.success("You have successfully logged in!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <img src={pareekshn_logo} alt="" className="absolute top-3 left-3 h-24" />
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-[#2F5185]">
        {/* <img
					src={leftBg}
					alt=""
					className="w-full h-full object-fill  cursor-pointer absolute inset-0"
				/> */}
      </div>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="bg-[#ffffff] h-fit w-3/4 lg:w-4/5 xl:w-2/3 rounded-3xl p-6 flex flex-col gap-4 relative z-10"
      >
        <h1 className="text-xl font-medium text-[#858585]">
          Corporate <br />
          Login
        </h1>

        <div className="flex flex-col gap-2">
          <div className="relative h-14">
            <div>
              <input
                id="username"
                type="text"
                //id="floating_filled"
                className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=""
                {...register("username", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.username && (
                <p className="text-error">Please check the username</p>
              )}
              <div
                htmlFor="floating_filled"
                className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
              >
                <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                <label htmlFor="" className="pl-2">
                  Username/Email
                </label>
              </div>
            </div>
          </div>
        </div>
        <Link to={"/forget-username"}>
          <p className="text-[#7c7b7b] text-sm hover:cursor-pointer text-right">
            Forget Username?
          </p>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="relative h-14">
            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="floating_filled"
                className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=""
                {...register("password", {
                  required: true,
                  maxLength: 12,
                })}
              />
              {errors.password && (
                <p className="text-error">Please check the password</p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481] focus:outline-none"
              >
                {showPassword ? <VscEyeClosed /> : <VscEye />}
              </button>

              <div
                htmlFor="floating_filled"
                className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
              >
                <LuSquareAsterisk className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />

                <label htmlFor="" className="pl-2">
                  Password
                </label>
              </div>
            </div>
          </div>

          <Link to={"/forget-password"}>
            <p className="text-[#7c7b7b] text-sm hover:cursor-pointer text-right">
              Forget Password?
            </p>
          </Link>
        </div>
        <div className="bg-[#1b4581] text-white h-12 p-2 flex justify-center items-center rounded-3xl hover:cursor-pointer">
          <button type="submit" className="h-full w-full">
            Login
          </button>
        </div>
        <div className="text-sm text-center flex justify-center gap-2 font-semibold text-[#3C4345]">
          <p>Not registered yet? </p>
          <Link to={"/signup"}>
            <span className="text-[#0F9FCC] hover:cursor-pointer font-medium">
              Create an account
            </span>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
