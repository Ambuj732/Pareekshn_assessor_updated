import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import twoperson from "../../assets/Hackathon/twoperson.png";
import edits from "../../assets/Hackathon/edits.png";
import { IconContext } from "react-icons";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import attach from "../../assets/Hackathon/attach.png";
import addEmployee from "../../actions/Dashboard/addEmployee";
import getAddEmployee from "../../actions/Dashboard/getAddEmployee";
import removeEmp from "../../actions/Dashboard/deleteEmployee";
import login from "../../actions/LoginScreens/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [employee, setEmployee] = useState([]);
  const [set_errors, setErrors] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    if (editItem) {
      setValue("employee_name", editItem.emp_name);
      setValue("designation", editItem.emp_designation);
      setValue("description", editItem.about_emp);
    }
  }, [editItem]);

  const addEmployeeHandler = async (formData) => {
    setErrors([]);
    let data = {};
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("data is", formData?.attachment.length);

      if (formData?.attachment.length > 0) {
        const file = formData?.attachment[0];
        if (file && file.size > 1 * 1024 * 1024) {
          setErrors(["File size exceeds 1MB."]);
          return;
        }
        const fileBase64 = await getBase64(file);
        data = {
          id_corp: user?.id,
          usercode: user?.token,
          emp_name: formData?.employee_name,
          emp_designation: formData?.designation,
          about_emp: formData?.description,
          attachment: 1,
          req_by: 1,
          file: fileBase64,
        };
      } else {
        data = {
          id_corp: user?.id,
          usercode: user?.token,
          emp_name: formData?.employee_name,
          emp_designation: formData?.designation,
          about_emp: formData?.description,
          attachment: 1,
          req_by: 1,
          file: "",
        };
      }
      //console.log(data);
      //console.log(isEditing);
      if (isEditing) {
        const response = await addEmployee(data, isEditing, editItem?.id); // tri
        if (response?.data?.code === 1000) {
          reset({
            employee_name: "",
            designation: "",
            description: "",
            attachment: "",
          });
          toast.success("Document updated successfully!");
        } else {
          toast.error("Not Updated");
        }
      } else {
        const response = await addEmployee(data);
        if (response?.data?.code === 1000) {
          reset({
            employee_name: "",
            designation: "",
            description: "",
            attachment: "",
          });
          toast.success("Document uploaded successfully!");
        } else {
          toast.error("Document did not upload successfully!");
        }
      }
      setIsEditing(false);
      getAllEmployee();
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getAllEmployee = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user?.token,
      };
      const response = await getAddEmployee(data);
      if (response?.data?.code === 1000) {
        setEmployee(response?.data?.about_us.about_emp);
        console.log("Employee", employee);
      }
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
    getAllEmployee();
  }, []);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  };
  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditing(true);
  };
  const handleDeleteClick = (emp_id) => {
    deleteEmployee(emp_id);
  };
  const deleteEmployee = async (emp_id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user?.token,
        id_emp: emp_id,
      };
      const response = await removeEmp(data);
      if (response?.data?.code === 1000) {
        toast.success("Deleted Successfully");
        const data1 = {
          id_corp: user.id,
          usercode: user?.token,
        };
        const response1 = await getAddEmployee(data1);
        if (response1?.data?.code === 1000) {
          setEmployee(response1?.data?.about_us.about_emp);
        }
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const users = JSON.parse(localStorage.getItem("user"));
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  return (
    <div className=" h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="flex flex-col w-screen p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 mt-2 ml-2">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Add Employee</span>
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
        <div className="bg-[#EDF2FF] min-h-screen  m-3 flex  rounded-3xl">
          <div className="bg-white min-h-screen  flex  gap-6  w-full m-7 rounded-3xl">
            <div className="w-[39%] h-[80%] mx-10 mt-10">
              <div className="bg-white  w-full h-auto">
                <div className="flex gap-10 items-center mt-4 mx-4">
                  <span className="text-black font-custom font-bold">
                    Team Members
                  </span>
                </div>
              </div>
              <div className="flex flex-col ml-4 ">
                {/* <span className="font-custom font-medium">Add Employee</span> */}
                <span className="font-custom text-gray-500">
                  Add your Employee info
                </span>
              </div>
              <form
                onSubmit={handleSubmit(addEmployeeHandler)}
                className="p-4 max-w-lg mx-auto"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Employee"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="Employee"
                    className="block pl-2 text-black h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                    placeholder="Employee Name"
                    {...register("employee_name", { required: true })}
                  />
                  {errors.employee_name && (
                    <p className="text-error">Please check the Employee name</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="designation"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    className="block pl-2 text-black h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder="Designation"
                    {...register("designation", { required: true })}
                  />
                  {errors.designation && (
                    <p className="text-error">Please check the Designation</p>
                  )}
                </div>
                <div className="mb-7">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Add Description"
                    className="block pl-2 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-error">Please check the Description</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 "
                    htmlFor="attachment"
                  >
                    Photo
                  </label>
                  <div className="relative w-full h-14 p-2 border border-black rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500  flex items-center  gap-3 px-3 shadow-sm">
                    {/* <img src={attach} className="w-5 h-5" />
                    <span className="text-gray-500 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer ">
                      Attachment
                    </span> */}
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      defaultValue=""
                      className="absolute top-4 w-auto h-full cursor-pointer  "
                      accept=".jpg, .png"
                      {...register("attachment", { required: true })}
                    />
                  </div>
                  {errors.attachment && (
                    <p className="text-error">Please check the Attachment</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    Photo file can have max 1MB size
                  </p>
                  {set_errors && (
                    <div className="text-red-500 text-md font-medium">
                      {set_errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-4 ">
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-36 py-3 rounded-full "
                  >
                    {isEditing ? "Update" : "Add"}
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
            <div className=" border-gray-500 border my-28 mt-10 h-[600px]"></div>
            <div className="w-[39%] h-[80%] mt-10 flex flex-col items-center overflow-y-scroll  ">
              {employee.length > 0 &&
                employee?.map((data) => {
                  //console.log(data);
                  return (
                    <div
                      key={data.id}
                      className="border rounded-2xl flex flex-col mb-7 border-green-400 w-4/5 h-auto gap-4"
                    >
                      <div className="flex justify-between items-center mx-4 pt-4">
                        <div className="flex gap-5 justify-center items-center ">
                          <div className="border border-gray-500 rounded-full w-10 h-10">
                            <img
                              src={data.emp_image}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span>{data.emp_name}</span>
                            <span>{data.emp_designation}</span>
                          </div>
                        </div>
                        <IconContext.Provider
                          value={{
                            size: "1.3em",
                            style: { cursor: "pointer" },
                          }}
                        >
                          <div className="row ">
                            <div className="col mb-4">
                              <FaEdit
                                onClick={() => handleEditClick(data)}
                                style={{ color: "#185f18" }}
                              />
                            </div>
                            <div className="col">
                              <FaTrash
                                onClick={() => handleDeleteClick(data.id)}
                                style={{ color: "#e10707" }}
                              />
                            </div>
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="flex items-center mx-4 pb-4">
                        <span>{data.about_emp}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
