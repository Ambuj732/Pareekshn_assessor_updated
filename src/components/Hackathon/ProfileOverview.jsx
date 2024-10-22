import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import edits from "../../assets/Hackathon/edits.png";
import helpIcon from "../../assets/Assessor/helpIcon.png";
import { FaEdit } from "react-icons/fa";
import parekshn from "../../assets/Hackathon/parekshn.png";
import addAboutUs from "../../actions/Dashboard/addAboutUsImage";
import addAboutVideo from "../../actions/Dashboard/addAboutUsVideo";
import getAddEmployee from "../../actions/Dashboard/getAddEmployee";
import login from "../../actions/LoginScreens/login";
import { ToastContainer, toast } from "react-toastify";

const ProfileOverview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [set_errors, setErrors] = useState(null);
  const [selectedOption, setSelectedOption] = useState("image");
  const [profileData, setProfileData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loginData, setLoginData] = useState({});

  const addAboutUsHandler = async (formData) => {
    console.log("Form Data is ", formData);
    setErrors([]);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const file = formData.attachment[0];
      console.log(file);
      // const type = formData.attachment[0].type;
      const type = file?.type;
      const value = file?.name;
      console.log(value);
      console.log(type);
      const imageData = {
        id_corp: user?.id,
        usercode: user?.token,
        type: type,
        title: formData?.title,
        detail: formData?.description,
        attachment: 1,
        req_by: 1,
        file: file.name,
      };
      console.log(imageData);
      const videoData = {
        id_corp: user?.id,
        usercode: user?.token,
        type: 1,
        title: formData?.title,
        detail: formData?.description,
        topic_url: formData?.video,
      };
      console.log(videoData);
      if (editItem) {
        if (selectedOption === "image") {
          const response = await addAboutUs({
            ...imageData,
            id_about: editItem.id,
          });
          if (response?.data?.code === 1000) {
            toast.success("Uploade successfully");
          } else if (response?.data?.code === 1001) {
            toast.error("Request Keys contain wrong data.");
          }
        } else if (selectedOption === "video") {
          const response = await addAboutVideo({
            ...videoData,
            id_about: editItem.id,
          });
          if (response?.data?.code === 1000) {
            toast.success("Uploade successfully");
          } else if (response?.data?.code === 1001) {
            toast.error("Request Keys contain wrong data.");
          }
        }
      } else {
        if (selectedOption === "image") {
          const response = await addAboutUs(imageData);
          if (response?.data?.code === 1000) {
            toast.success("Uploade successfully");
          } else if (response?.data?.code === 1001) {
            toast.error("Request Keys contain wrong data.");
          }
        } else if (selectedOption === "video") {
          const response = await addAboutVideo(videoData);
          if (response?.data?.code === 1000) {
            toast.success("Uploade successfully");
          } else if (response?.data?.code === 1001) {
            toast.error("Request Keys contain wrong data.");
          }
        }
      }

      reset();
      setEditItem(null); // Reset edit item
      getAboutUsData(); // Refresh the data
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getAboutUsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user.token,
      };
      console.log(data);
      const response = await getAddEmployee(data);
      console.log(response);
      if (response.data.code === 1000) {
        setProfileData(response?.data?.about_us.about);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  const extractVideoId = (url) => {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("/")?.pop();
    }
    return videoId;
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setValue("title", item.topic_title);
    setValue("description", item.topic_detail);
    if (item.media_type === 2) {
      setSelectedOption("video");
      setValue("video", item.topic_url);
    } else {
      setSelectedOption("image");
    }
  };

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("User :: ", users);
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  return (
    <div className=" h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="flex flex-col w-screen p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 mt-2 ml-2">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]"> Profile Overview</span>
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
        <div className="bg-[#EDF2FF] min-h-screen  m-3 flex rounded-3xl">
          <div className="bg-white min-h-screen flex  rounded-3xl gap-16 w-full m-7">
            <div className="w-[39%] h-[80%] mx-4  mt-10 ">
              {/* <div className="bg-white w-full h-16"></div> */}
              <div className="flex flex-col ml-4">
                <span className="font-custom font-medium">Detail</span>
                <span className="font-custom text-gray-500">
                  Add your info in Detail
                </span>
              </div>
              <form
                onSubmit={handleSubmit(addAboutUsHandler)}
                className="p-4 max-w-lg mx-auto"
              >
                <div className="mb-7">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="block pl-2 text-black h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                    placeholder="Title"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-error">Please check the title</p>
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
                    <p className="text-error">Please check the description</p>
                  )}
                </div>

                <div className="flex justify-around items-center mt-10">
                  <div className="flex gap-5">
                    <input
                      id="radio1"
                      type="radio"
                      name="media"
                      value="image"
                      checked={selectedOption === "image"}
                      onChange={() => setSelectedOption("image")}
                      className="w-5 h-5 border-black rounded"
                    />
                    <label htmlFor="radio1">Image</label>
                  </div>
                  <div className="flex gap-5">
                    <input
                      id="radio2"
                      type="radio"
                      name="media"
                      value="video"
                      checked={selectedOption === "video"}
                      onChange={() => setSelectedOption("video")}
                      className="w-5 h-5 border-black rounded"
                    />
                    <label htmlFor="radio2">Video</label>
                  </div>
                </div>
                {selectedOption === "video" && (
                  <>
                    <div className="flex mt-7 flex-col">
                      <input
                        type="text"
                        placeholder="Video URL"
                        className="w-full border-b-2 cursor-pointer  border-gray-500
                    appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                        {...register("video", { required: true })}
                      />
                      {errors.video && (
                        <p className="text-error">Please check the video</p>
                      )}
                    </div>
                    <div className="relative mt-2">
                      <div
                        className="cursor-pointer relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img src={helpIcon} className="w-7 h-7" />
                      </div>
                      {showPopup && (
                        <div className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow-lg">
                          <p className="text-blue-700 font-semibold px-4">
                            Youtube link should:
                            https://youtu.be/EcTbJG965Qg?si=OkJ9-Lar014ohtKw
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {selectedOption === "image" && (
                  <div className="flex mt-7 flex-col">
                    <input
                      type="file"
                      placeholder="attachment"
                      className="w-full border-b-2 cursor-pointer  border-gray-500 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                      {...register("attachment", { required: true })}
                    />
                    {errors.attachment && (
                      <p className="text-error">Please check the attachment</p>
                    )}
                  </div>
                )}
                <div className="flex justify-center mt-16">
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-36 py-3 rounded-full "
                  >
                    {editItem ? "Update" : "Add"}
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>

            <div className="border  mt-10 h-[600px]"></div>

            <div className="w-[39%] h-[80%]  mt-10 flex flex-col gap-10 overflow-y-scroll">
              {profileData.length > 0 &&
                profileData.map((data) => {
                  if (profileData && data?.media_type === 1) {
                    const imgUrl = data?.topic_url;
                    return (
                      <div
                        key={data.id}
                        className="border rounded-2xl flex flex-col mb-1 border-green-400 w-4/5 h-auto"
                      >
                        <div className="flex justify-between items-center px-5 mt-2">
                          <span className="text-lg">{data.topic_title}</span>
                          <FaEdit
                            onClick={() => handleEdit(data)}
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-2 px-4 mt-2">
                          {imgUrl && <img src={imgUrl} alt="blank" />}
                          <span className="font-normal text-gray-500">
                            {data.topic_detail}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}

              {profileData.length > 0 &&
                profileData.map((data) => {
                  if (profileData && data.media_type === 2) {
                    const videoUrl = data.topic_url;
                    const videoId = extractVideoId(videoUrl);
                    return (
                      <div
                        key={data.id}
                        className="border rounded-2xl flex flex-col mb-1 border-green-400 w-4/5 h-auto"
                      >
                        <div className="flex justify-between items-center px-5 mt-2">
                          <span className="text-lg text-red-600">
                            {data.topic_title}
                          </span>
                          <FaEdit
                            onClick={() => handleEdit(data)}
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-2 px-4 mt-2">
                          <iframe
                            width="280"
                            height="160"
                            className="border rounded-lg"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                          <span className="font-normal text-gray-500">
                            {data.topic_detail}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
