import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import addDocumentWeb from "../../actions/Dashboard/addDocumentWeb";
import fetchAllDocument from "../../actions/Dashboard/fetchAllDocument";
import getDocumentList from "../../actions/MasterDataApi/getDocumentList";
import attach from "../../assets/Hackathon/attach.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

const AddDocument = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [alldocument, setAllDocument] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [documentType, setSelectedDocument] = useState([]);
  const [set_errors, setErrors] = useState([]);

  // const validationSchema = yup.object({
  //   documentType: yup.string().required("Document type is required"),
  //   document_number: yup.string().required("Document number is required"),
  //   attachment: yup.string().required("Attachment is required"),
  // });

  const users = JSON.parse(localStorage.getItem("user"));
  const corporate_userid = users?.corporate_userid;
  const pic = users?.profile_pic;

  const formSubmitHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const file = formData?.attachment[0];
      console.log(file);
      if (file && file.size > 5 * 1024 * 1024) {
        setErrors(["File size exceeds 5MB."]);
        return;
      }
      const fileBase64 = await getBase64(file);
      console.log(fileBase64);
      let fileType = 1;
      if (file.type === "application/pdf") {
        fileType = 1;
      } else if (file.type.startsWith("image/")) {
        fileType = 2;
      }

      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        file_type: fileType,
        doc_no: formData?.document_number,
        id_req_doc: parseInt(documentType),
        file: fileBase64,
        file_name: file.name,
      };
      console.log(data);
      // await validationSchema.validate(formData, { abortEarly: false });
      const response = await addDocumentWeb(data);
      if (response?.data?.code === 1000) {
        reset({
          document_number: "",
          attachment: "",
        });
        setErrors("");
        toast.success("Document uploaded successfully!");
        const data1 = {
          id_corp: user.id,
          usercode: user?.token,
        };
        const response1 = await fetchAllDocument(data1);
        if (response1?.data?.code === 1000) {
          setAllDocument(response1?.data?.corp_docs);
        }
      } else {
        setErrors([response?.data?.message || "Failed to upload document."]);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      if (axios.isAxiosError(error)) {
        setErrors([
          error?.response?.data?.message || "Network error occurred.",
        ]);
      } else {
        setErrors(["Error uploading document. Please try again."]);
      }
    }
  };

  const getAllDocuments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user?.token,
      };
      const response = await fetchAllDocument(data);
      if (response?.data?.code === 1000) {
        setAllDocument(response?.data?.corp_docs);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setErrors(["Error fetching documents. Please try again."]);
    }
  };

  const getDocumentLists = async () => {
    try {
      const response = await getDocumentList();
      if (response?.data?.code === 1000) {
        setDocumentList(response?.data?.req_docs);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setErrors(["Error fetching documents. Please try again."]);
    }
  };

  useEffect(() => {
    getAllDocuments();
    getDocumentLists();
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
  const handleDocumentTypeChange = (e) => {
    // const formData = new formData();
    setSelectedDocument(e.target.value);
    // formData.delete(documentId);
    console.log("document type:: ", e.target.value);
  };
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="flex flex-col w-screen p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 mt-2 ml-2">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Add Document</span>
          </span>
          <div className="flex items-center w-1/5 justify-between">
            <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
              <img
                src={pic}
                alt=""
                className="h-10 w-10 border m-1 rounded-full px-1"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[#305187]">Welcome</span>
                <span className="font-medium">{corporate_userid}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen  m-3 flex  rounded-3xl">
          <div className="bg-white min-h-screen flex   gap-6  w-full m-7 rounded-3xl">
            <div className="w-[39%] h-[70%] mx-7 mt-16">
              <div className="flex flex-col ml-4 ">
                <span className="font-custom font-bold">Documents</span>
                <span className="font-custom text-gray-500">
                  Add Document to authentication
                </span>
              </div>
              <form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="p-4 max-w-lg mx-auto"
              >
                <div className="mb-7">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    // htmlFor="documentType"
                  >
                    Document Name
                  </label>
                  <select
                    id="documentType"
                    className="block pl-2 h-14 w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer "
                    {...register("documentType", { required: true })}
                    onChange={(e) => handleDocumentTypeChange(e)}
                  >
                    <option value="">Select Document Type</option>
                    {documentList?.map((document) => (
                      <option key={document?.id} value={document.id}>
                        {document.doc_name}
                      </option>
                    ))}
                  </select>
                  {errors.documentType && (
                    <p className="text-error">
                      Please select the Document Type
                    </p>
                  )}
                </div>

                <div className="mb-7">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="documentId"
                  >
                    Document Number/ID
                  </label>
                  <input
                    type="text"
                    id="documentId"
                    name="documentId"
                    className="block pl-2 text-black  h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                    placeholder="Document Number/ID"
                    {...register("document_number", { required: true })}
                  />
                  {errors.document_number && (
                    <p className="text-error">
                      Please check the Document Number
                    </p>
                  )}
                </div>

                <div className="mb-7">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    // htmlFor="attachment"
                  >
                    Attachment
                  </label>
                  <div className="relative w-full h-14  border border-black rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500  flex items-center  gap-3 px-3 shadow-sm">
                    {/* <img src={attach} className="w-5 h-5" />
                    <span className="text-gray-500">attachment</span> */}
                    <input
                      type="file"
                      id="attachment"
                      className="absolute top-4  w-auto h-full cursor-pointer"
                      accept=".pdf, .jpg, .png"
                      {...register("attachment", { required: true })}
                    />
                  </div>
                  {errors.attachment && (
                    <p className="text-error">Please check the Attachment</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    *pdf and jpg/png files can have max 5 MB size.
                  </p>
                </div>
                {set_errors.length > 0 && (
                  <div className="text-red-500 text-md font-medium">
                    {set_errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}

                <div className="flex justify-center mt-14">
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-36 py-3 rounded-full "
                  >
                    Upload
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>

            <div className=" border-gray-500 border mt-16  h-[600px]"></div>
            <div className="w-[35%] mt-16 mx-10 h-72 overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-md">
              <div className="bg-white text-white py-2 px-4 text-center">
                <h2 className="text-lg text-black font-semibold">
                  Uploaded Docs
                </h2>
              </div>
              {alldocument &&
                alldocument.map((data, index) => (
                  <div className="mr-2" key={index}>
                    <div className="flex items-center justify-between bg-gray-100 p-3 mb-2  rounded-md shadow-md">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-4">
                          {data.doc_name}
                        </span>
                        <span>{data.doc_no}</span>
                        <span className="text-gray-500"></span>
                      </div>
                      <a
                        href={data.doc_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
