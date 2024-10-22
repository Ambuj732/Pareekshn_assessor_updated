import React, { useState } from "react";
import arrowLeft from "/arrowLeft.png";
import leftBg from "/leftBg.jpg";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router";
import resetPassword from "../../actions/LoginScreens/resetPassword";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const navigate = useNavigate();

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const resetPasswordHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        password: formData?.newPassword,
        new_password: formData?.confirmPassword,
      };
      await resetPassword(data);
      toast.success("Your password has been changed successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Error while logging with passcode :: ", error);
      toast.error("An error occurred while resetting the password");
    }
  };

  const handleBack = () => {
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
        onSubmit={handleSubmit(resetPasswordHandler)}
        className="w-1/2 bg-white rounded-3xl border h-96 px-4 py-2 "
      >
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full"
            onClick={handleBack}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Forget</span>
            <span className="font-semibold text-[#222222]">Password</span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <span className="font-medium">Reset Your Password</span>
        </div>
        <div className="relative h-14 my-6">
          <div>
            <input
              type="password"
              id="newPassword"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("newPassword")}
            />
            <div
              htmlFor="newPassword"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="newPassword" className="pl-2">
                New Password
              </label>
            </div>
            {errors.newPassword && (
              <div className="error text-red-600 font-medium text-sm">
                {errors?.newPassword.message}
              </div>
            )}
          </div>
        </div>
        <div className="relative h-14 my-6">
          <div>
            <input
              type="password"
              id="confirmPassword"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("confirmPassword")}
            />
            <div
              htmlFor="confirmPassword"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="confirmPassword" className="pl-2">
                Re-Enter New Password
              </label>
            </div>
            {errors.confirmPassword && (
              <div className="error text-red-600 font-medium text-sm">
                {errors?.confirmPassword.message}
              </div>
            )}
          </div>
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

export default ResetPassword;
