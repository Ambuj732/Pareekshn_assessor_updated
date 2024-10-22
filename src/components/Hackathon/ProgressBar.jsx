import React, { useEffect, useRef } from "react";

const Progress = ({ value, text, strength }) => {
	const barRef = useRef(null);

	useEffect(() => {
		const bar = barRef.current;
		let currentPercent = 0;

		const animateBar = () => {
			if (currentPercent <= value) {
				currentPercent++;

				bar.style.transform = `rotate(${45 + currentPercent * 1.8}deg)`;
				bar.style.transition = "transform 30ms ease-out";

				setTimeout(animateBar, 30);
			}
		};

		animateBar();
	}, [value]);

	return (
		<div className="relative top-16 bottom-0 m-4 float-left text-center">
			<div className="relative overflow-hidden w-72 h-36 mb-[-14px]">
				<div
					ref={barRef}
					className="absolute top-0 left-0 w-72 h-72 rounded-full box-border border-[40px] border-gray-300 border-b-[#0bf] border-r-[#0bf]"
				></div>
				<div className="flex items-center h-full relative justify-center">
					<span className="text-black absolute top-20 text-[12px]">
						{text} Students <br />
						<span className="text-2xl font-semibold text-[#1C4481]">
							{strength}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Progress;
