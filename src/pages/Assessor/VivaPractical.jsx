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
import manoj from "../../assets/Assessor/manoj.png";

function VivaPractical() {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="min-h-screen p-4 bg-[#EDEDED] flex">
				<div className="bg-white p-4 w-full rounded-2xl">
					<div className="flex items-center gap-2">
						<img src={arrowLeft} alt="" className="h-8" />
						<span className="text-black font-semibold text-lg">
							Viva/Practical
						</span>
					</div>
					<div className="bg-[#EDF2FF] h-56 w-full rounded-2xl my-4 p-4">
						<div className="flex items-center justify-between pr-8 mb-3">
							<div className="flex items-center gap-6">
								<img src={manoj} alt="" />
								<div className="flex flex-col">
									<span className="text-[#1C4481] font-medium text-xl">
										Manoj Singh
									</span>
									<span>Candidate ID: CAN_001</span>
								</div>
							</div>
							<div className="w-32 bg-[#0C49CA] flex items-center justify-center h-12 rounded-full text-white font-medium">
								<span>Start</span>
							</div>
						</div>
						<div className="bg-white h-16 rounded-lg flex justify-between shadow-customShadow py-2 px-10 relative">
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Code:
									</span>{" "}
									570LW10781
								</span>
								<span>
									<span className="text-[#1C4481]">
										Mobile:
									</span>{" "}
									8527022587
								</span>
							</div>
							<div className="relative">
								<div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
							</div>
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Batch:
									</span>{" "}
									02-05-2023-A
								</span>
								<span>
									<span className="text-[#1C4481]">
										Email ID:
									</span>{" "}
									manoj1!aadrikaglobal.com
								</span>
							</div>
							<div className="relative">
								<div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
							</div>
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Aadhar:
									</span>{" "}
									8527022587107
								</span>
							</div>
						</div>
					</div>
					<div className="bg-[#EDF2FF] h-56 w-full rounded-2xl my-4 p-4">
						<div className="flex items-center justify-between pr-8 mb-3">
							<div className="flex items-center gap-6">
								<img src={manoj} alt="" />
								<div className="flex flex-col">
									<span className="text-[#1C4481] font-medium text-xl">
										Manoj Singh
									</span>
									<span>Candidate ID: CAN_001</span>
								</div>
							</div>
							<div className="w-32 bg-[#0C49CA] flex items-center justify-center h-12 rounded-full text-white font-medium">
								<span>Start</span>
							</div>
						</div>
						<div className="bg-white h-16 rounded-lg flex justify-between shadow-customShadow py-2 px-10 relative">
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Code:
									</span>{" "}
									570LW10781
								</span>
								<span>
									<span className="text-[#1C4481]">
										Mobile:
									</span>{" "}
									8527022587
								</span>
							</div>
							<div className="relative">
								<div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
							</div>
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Batch:
									</span>{" "}
									02-05-2023-A
								</span>
								<span>
									<span className="text-[#1C4481]">
										Email ID:
									</span>{" "}
									manoj1!aadrikaglobal.com
								</span>
							</div>
							<div className="relative">
								<div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gray-300"></div>
							</div>
							<div className="flex flex-col font-medium">
								<span>
									<span className="text-[#1C4481]">
										Aadhar:
									</span>{" "}
									8527022587107
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VivaPractical;
