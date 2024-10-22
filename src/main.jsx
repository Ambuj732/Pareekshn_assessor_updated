import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import CorporateHome from "./pages/CorporateHome.jsx";
import ForgetUsername from "./components/Hackathon/ForgetUsername.jsx";
import ForgetPassword from "./components/Hackathon/ForgetPassword.jsx";
import Login from "./components/Hackathon/Login.jsx";
import CorporateSignUp from "./components/Hackathon/CorporateSignUp.jsx";
import CorporateHackathonDashboard1 from "./components/Hackathon/CorporateHackathonDashboard1.jsx";
import HackathonDashboard from "./components/Hackathon/HackathonDashboard.jsx";
import CreateHackathon from "./components/Hackathon/CreateHackathon.jsx";
import CompletedHackathon from "./components/Hackathon/CompletedHackathon.jsx";
import DashboardCorporateProfile from "./components/Hackathon/DashboardCorporateProfile.jsx";
import RejectedHackathon from "./components/Hackathon/RejectedHackathon.jsx";
import PendingHackathon from "./components/Hackathon/PendingHackathon.jsx";
import NextHackathon from "./components/Hackathon/NextHackathon.jsx";
import ApiTesting from "./components/ApiTesting.jsx";
import HackathonStatistics from "./components/Hackathon/HackathonStatistics.jsx";
import PostedJob from "./components/Hackathon/PostedJob.jsx";
import UnpostedJob from "./components/Hackathon/UnpostedJob.jsx";
import AppliesCandidate from "./components/Hackathon/AppliesCandidate.jsx";
import CreateNewJob from "./components/Hackathon/CreateNewJob.jsx";
import CreateJob from "./components/Hackathon/CreateJob.jsx";
import EditDashboardCorporateProfile from "./components/Hackathon/EditDashboardCorporateProfile.jsx";
import AddDocument from "./components/Hackathon/AddDocument.jsx";
import AddEmployee from "./components/Hackathon/AddEmployee.jsx";
import ProfileOverview from "./components/Hackathon/ProfileOverview.jsx";
import JobStatistics from "./components/Hackathon/JobStatistics.jsx";
import OTPVerify from "./components/Hackathon/OTPVerify.jsx";
import OTPVerify2 from "./components/Hackathon/OTPVerify2.jsx";
import ResetPassword from "./components/Hackathon/ResetPassword.jsx";
import CorporateHackathonDashboard from "./pages/Hackathon/CorporateHackathonDashboard.jsx";
import JobDetailsPage from "./components/Hackathon/JobDetailaPage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<CorporateHome />}>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<CorporateSignUp />}></Route>
        <Route path="/forget-username" element={<ForgetUsername />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/verfiyOtp" element={<OTPVerify />}></Route>
        <Route path="/verfiyOtp2" element={<OTPVerify2 />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
      </Route>
      <Route
        path="/dashboard"
        element={<CorporateHackathonDashboard1 />}
      ></Route>
      <Route
        path="/hackathon-details-page"
        element={<CorporateHackathonDashboard />}
      ></Route>
      <Route path="/create-hackathon" element={<CreateHackathon />}></Route>
      <Route
        path="/hackathon-dashboard"
        element={<HackathonDashboard />}
      ></Route>
      <Route
        path="/completed-hackathon"
        element={<CompletedHackathon />}
      ></Route>
      <Route
        path="/dashboard/corporate-profile"
        element={<DashboardCorporateProfile />}
      ></Route>
      <Route
        path="/edit-profile"
        element={<EditDashboardCorporateProfile />}
      ></Route>
      <Route path="/dashboard/postedjob" element={<PostedJob />}></Route>
      <Route path="/dashboard/jobspost" element={<UnpostedJob />}></Route>
      <Route path="/dashboard/createnewjob" element={<CreateNewJob />}></Route>
      {/* <Route path="/dashboard/createnewjob/:paramq" element={<CreateNewJob />}></Route> */}
      <Route path="/dashboard/createjob" element={<CreateJob />}></Route>
      <Route
        path="/dashboard/appliescandidate"
        element={<AppliesCandidate />}
      ></Route>
      <Route
        path="/dashboard/hackathonstatistics"
        element={<HackathonStatistics />}
      ></Route>
      <Route
        path="/dashboard/jobstatistics"
        element={<JobStatistics />}
      ></Route>
      <Route path="/dashboard/postedjob" element={<PostedJob />}></Route>
      <Route path="/rejected-hackathon" element={<RejectedHackathon />}></Route>
      <Route path="/pending-hackathon" element={<PendingHackathon />}></Route>
      <Route path="/next-hackathon" element={<NextHackathon />}></Route>
      <Route
        path="/corporate-profile"
        element={<DashboardCorporateProfile />}
      ></Route>
      <Route path="/add-documents" element={<AddDocument />}></Route>
      <Route path="/add-employee" element={<AddEmployee />}></Route>
      <Route path="/profile-overview" element={<ProfileOverview />}></Route>
      <Route path="/job-details-page" element={<JobDetailsPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
