import React, { useState, useEffect, useRef } from "react";
import arrowLeft from "/arrowLeft.png";
import leftBg from "/leftBg.jpg";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import verifyOTP from "../../actions/LoginScreens/verifyOTP";
import resendOTP from "../../actions/LoginScreens/resendOTP";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerify() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  const verifyOtpSchema = Yup.object({
    firstDigit: Yup.string()
      .required("Code is required")
      .matches(/^\d$/, "OTP must be a single digit"),
    secondDigit: Yup.string()
      .required("Code is required")
      .matches(/^\d$/, "OTP must be a single digit"),
    thirdDigit: Yup.string()
      .required("Code is required")
      .matches(/^\d$/, "OTP must be a single digit"),
    fourthDigit: Yup.string()
      .required("Code is required")
      .matches(/^\d$/, "OTP must be a single digit"),
  });

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  const id_corp = JSON.parse(localStorage.getItem("id_corp"));
  console.log(id_corp);

  const otpVerifyHandler = async (formData) => {
    setErrors("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      await verifyOtpSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const otp = `${formData.firstDigit}${formData.secondDigit}${formData.thirdDigit}${formData.fourthDigit}`;

      const data = {
        id_corp: id_corp,
        otp_type: 1,
        otp: otp,
      };

      const response = await verifyOTP(data);
      if (response?.data?.code === 1000) {
        toast.success("You have registered Successfully");
        localStorage.setItem(
          "usercode_corp",
          JSON.stringify(response.data.usercode)
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Invalid otp");
      }
    } catch (error) {
      console.log("Error while verifying OTP :: ", error);
    }
  };

  const resendOTPHandler = async (event) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: id_corp,
      };
      await resendOTP(data);
      setResendTimer(60);
    } catch (error) {
      console.log("Error while resending OTP :: ", error);
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      setValue(e.target.name, value);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      setValue(e.target.name, "");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
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
        onSubmit={handleSubmit(otpVerifyHandler)}
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
            <span className="font-semibold text-[#AFAFAF]">verify</span>
            <span className="font-semibold text-[#222222]">otp</span>
          </div>
        </div>
        <span className="text-sm font-medium">
          Enter 4 digit code sent to your mobile phone
        </span>
        <div className="flex flex-col gap-4 mt-4 justify-center items-center">
          <div className="flex gap-4">
            {["firstDigit", "secondDigit", "thirdDigit", "fourthDigit"].map(
              (name, index) => (
                <div
                  key={name}
                  className="w-12 h-12 flex items-center justify-center"
                >
                  <input
                    type="text"
                    className="h-12 appearance-none enabled:appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none"
                    maxLength="1"
                    inputMode="numeric"
                    {...register(name, { required: true })}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </div>
              )
            )}
          </div>
          {errors.firstDigit ||
          errors.secondDigit ||
          errors.thirdDigit ||
          errors.fourthDigit ? (
            <div className="error flex text-red-600 font-medium text-sm items-center">
              Please enter a valid 4-digit code.
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-[#1C4481] rounded-3xl w-full h-10 font-medium text-white mt-6"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={resendOTPHandler}
          className="text-sm text-[#50B4ED] mt-6 text-center ml-40"
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default OTPVerify;
