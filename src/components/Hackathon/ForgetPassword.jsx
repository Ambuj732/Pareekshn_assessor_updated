import React, { useState } from "react";
import arrowLeft from "/arrowLeft.png";
import leftBg from "/leftBg.jpg";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import forgetPassword from "../../actions/LoginScreens/forgetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const navigate = useNavigate();

  const forgetPasswordSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username/Email is required")
      .email("Invalid email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const forgetPasswordHandler = async (formData) => {
    try {
      const data = {
        username: formData?.username,
      };
      const response = await forgetPassword(data);
      if (response?.data?.code === 1000) {
        setTimeout(() => {
          navigate("/verfiyOtp");
        }, 1500);
        toast.success("Otp sent");
      } else {
        toast.error("No user found");
      }
    } catch (error) {
      console.log("Error while logging with passcode :: ", error);
      toast.error("An error occurred while processing your request");
    }
  };

  const handleback = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden min-h-screen">
        <img
          src={leftBg}
          alt=""
          className="w-full h-full absolute inset-0 object-fill"
        />
      </div>
      <form
        onSubmit={handleSubmit(forgetPasswordHandler)}
        className="w-1/2 bg-white rounded-3xl border h-96 px-4 py-2 "
      >
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full"
            onClick={handleback}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Forget</span>
            <span className="font-semibold text-[#222222]">Password</span>
          </div>
        </div>
        <div className="relative h-14 my-8">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("username")}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="username" className="pl-2">
                Username/Email
              </label>
            </div>
          </div>
          {errors.username && (
            <div className="error text-red-600 font-medium text-sm">
              {errors.username.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#1C4481] text-white font-medium h-12 w-full rounded-full"
        >
          Continue
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
