import React from "react";
import next from "../../assets/Assessor/next.png";

function Instruction() {
	return (
		<div className="min-h-screen">
			<div className="h-screen m-8 bg-[#1C4481] rounded-2xl flex items-center justify-center flex-col gap-6">
				<div
					className={`bg-white w-5/6 h-5/6 rounded-2xl p-4 flex flex-col items-center gap-8`}
				>
					<span className="text-5xl text-[#1C4481] font-bold">
						Welcome!
					</span>
					<div className="h-3/4 flex items-center">
						<div className="bg-[#F3F3F3] h-full  p-8 rounded-2xl">
							<span className="text-[#0C49CA] font-semibold text-lg">
								General Instruction
							</span>
							<ul className="list-disc p-4 flex flex-col gap-4">
								<li>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit.
								</li>
								<li>
									Vivamus rutrum nulla sit amet tincidunt
									congue.
								</li>
								<li>Nunc eu mi vitae lorem eleifend dictum.</li>
								<li>
									Sed ac risus viverra, imperdiet augue ac,
									cursus magna.
								</li>
								<li>Duis rhoncus nunc a hendrerit volutpat.</li>
							</ul>
						</div>
						<div className="absolute right-72">
							<img src={next} alt="" className="h-16"/>
						</div>
					</div>
				</div>
				<span className="text-xl text-white font-medium">
					Please write to info@spiwd.in, in case of any
					feedback/suggestions/request
				</span>
			</div>
		</div>
	);
}

export default Instruction;
