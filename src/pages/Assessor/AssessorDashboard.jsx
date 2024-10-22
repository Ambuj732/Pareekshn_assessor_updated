import React from "react";
import Header from "../../components/Assessor/Header";
import arrowLeft from "../../assets/Assessor/arrowLeft.png";
import vc from "../../assets/Assessor/vc.png";
import batchdetails from "../../assets/Assessor/batchdetails.png";
import descriptive from "../../assets/Assessor/descriptive.png";
import pc from "../../assets/Assessor/pc.png";
import viva from "../../assets/Assessor/viva.png";
import studentdetails from "../../assets/Assessor/studentdetails.png";
import camera from "../../assets/Assessor/camera.png";
import upload from "../../assets/Assessor/upload.png";

function AssessorDashboard() {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="min-h-screen p-4 bg-[#EDEDED] flex">
				<div className="bg-white p-4 w-8/12 rounded-2xl">
					<div className="flex items-center gap-2">
						<img src={arrowLeft} alt="" className="h-8" />
						<span className="text-black font-semibold text-lg">
							Back to Dashboard
						</span>
					</div>
					<div className="py-4 flex flex-col gap-4">
						<div className="flex justify-between">
							<img className="h-56" src={batchdetails} alt="" />
							<img className="h-56" src={studentdetails} alt="" />
							<img className="h-56" src={viva} alt="" />
						</div>
						<div className="flex justify-between">
							<img className="h-56" src={vc} alt="" />
							<img className="h-56" src={descriptive} alt="" />
							<img className="h-56" src={pc} alt="" />
						</div>
					</div>
				</div>
				<div className="w-4/12 flex items-center justify-center">
					<div className="w-3/4 flex flex-col items-center p-4 h-2/3 justify-center gap-8 rounded-2xl bg-white shadow-completedHackathon">
						<span className="font-semibold">Upload Photo</span>
						<div className="flex items-center justify-center relative bg-[#E7F0FE] h-36 w-36 rounded-full">
							<div className="flex items-center justify-center bg-[#1C4481] h-24 w-24 rounded-full">
								<img src={camera} alt="" />
							</div>
							<div className="bg-[#EDEDED] border-2 border-white rounded-full p-2 absolute bottom-0 translate-y-1/2">
								<img src={upload} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AssessorDashboard;
