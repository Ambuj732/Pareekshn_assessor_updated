import React from "react";
import logo from "/logo.png";
import avatar from "/avatar.png";
import questionMark from "/questionMark.png";
import logout from "/logout.png";
import arrowDown from "/arrowDown.png";
import arrow from "/arrow.png";
import indicator from "/indicator.png";
import mandatory from "/mandatory.png";
import volume from "/volume.png";
import reset from "/reset1.png";
import previous from "/previous.png";
import play from "/play.png";
import next from "/next.png";
import lock from "/lock.png";
import timer from "/timer.png";
import Header from "../../components/Assessor/Header";
import mic from "../../assets/Assessor/mic.png";

function VivaByAssessor() {
	return (
		<div>
			<Header />
			<div>
				{/* Theory and Language */}
				<div className="flex px-12 py-4 justify-between">
					<span className="text-[#0C49CA] text-2xl font-medium font-custom my-2">
						Viva/Practical
					</span>
				</div>
				<div className="min-h-screen bg-[#F3F7FF] flex flex-col mx-8 px-8 gap-4 border rounded-2xl">
					<div className="bg-white h-16 mt-4 rounded-2xl flex items-center px-4 justify-between">
						<div className="flex items-center w-8/12 justify-between">
							<img src={arrow} alt="" className="h-8 " />
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>1</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>2</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>3</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>4</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>5</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>6</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>7</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>8</span>
							</div>
							<div className="border-2 border-[#14540E] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>9</span>
							</div>
							<div className="bg-[#A6E097] h-10 w-10 flex items-center justify-center rounded-lg font-semibold text-2xl text-[#14540E]">
								<span>10</span>
							</div>
							<img
								src={arrow}
								alt=""
								className="scale-x-[-1] h-8"
							/>
						</div>
						<img src={indicator} alt="" className="h-12" />
					</div>
					<div className="flex items-center justify-between">
						<div className="bg-[#DDEAFF] rounded-lg w-3/4">
							<div className="py-3 flex justify-between w-full px-8">
								<div className="flex items-center ">
									<span className="text-[#1C4481] font-semibold">
										11/12- Level 2, (MT Nos-3)
									</span>
								</div>
								<div className="flex gap-4">
									<div className="flex justify-center items-center border border-[#1C4481] py-1 px-4 rounded-md bg-white font-medium">
										<span className="font-bold text-[#1C4481]">
											Max Marks 2
										</span>
									</div>
									<img
										src={mandatory}
										alt=""
										className="h-8"
									/>
								</div>
							</div>
							<hr class="border-t-[1px] border-[#bcbcbc]" />
							<div className="flex px-8 justify-between flex-col py-4">
								<span className="text-black font-semibold w-full">
									Q. Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy
									text ever since the 1500s,
								</span>
								<div className="flex mx-auto gap-16">
									<div className="w-56 h-44 my-4 rounded-[34px] p-4 flex gap-4 items-center flex-col justify-center bg-white shadow-2xl">
										<span className="text-[#1C4481] font-medium">
											Record Audio
										</span>
										<div className="h-24 w-24 rounded-full bg-white shadow-completedHackathon flex items-center justify-center">
											<div className="h-16 w-16 rounded-full bg-[#1C4481] flex items-center justify-center">
												<img
													src={mic}
													alt=""
													className="h-10"
												/>
											</div>
										</div>
									</div>
									<div className="w-56 h-44 my-4 rounded-[34px] p-4 flex gap-4 items-center flex-col justify-center bg-white shadow-2xl">
										<span className="text-[#1C4481] font-medium">
											Record Audio
										</span>
										<div className="h-24 w-24 rounded-full bg-white shadow-completedHackathon flex items-center justify-center">
											<div className="h-16 w-16 rounded-full bg-[#1C4481] flex items-center justify-center">
												<img
													src={mic}
													alt=""
													className="h-10"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-[#1C4481] w-64 h-48 rounded-3xl flex p-4 justify-between flex-col items-center">
							<span className="text-white">Enter Marks</span>
							<div className="h-10 bg-[#E4EFFF] w-2/3 rounded-md flex items-center justify-center">
								<span>0-10</span>
							</div>
							<div className="bg-white h-8 w-1/2 flex flex-col rounded-full justify-center items-center text-[#1C4481] shadow-completedHackathon">
								<span>Submit</span>
							</div>
						</div>
					</div>
					<div className="w-3/4 flex items-center justify-center">
						<div className="flex items-center justify-between w-40">
							<div className="border border-black rounded-full h-14 w-14 flex items-center justify-center">
								<img src={previous} alt="" className="h-6" />
							</div>
							<div className="border border-black rounded-full h-14 w-14 flex items-center justify-center">
								<img src={next} alt="" className="h-6" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VivaByAssessor;
