import React, { useState, useEffect } from "react";
import close from "../../assets/Hackathon/close.png";
import getBannerSample from "../../actions/MasterDataApi/getBannerSample";
const SampleBanner = ({ onClose }) => {
  const [bannerData, setBannerData] = useState([]);
  const [errors, setErrors] = useState(null);
  const getBannerSampleData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: 2,
        usercode: user.token,
      };
      const response = await getBannerSample(data);
      if (response?.data?.code === 1000) {
        setBannerData(response?.data?.banners);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getBannerSampleData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex justify-center items-center  bg-opacity-50">
      <div className="w-2/6 h-auto bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-blue-700 text-xl">Banner</span>
          <button onClick={onClose}>
            <img src={close} alt="Close" className="h-7 w-7" />
          </button>
        </div>
        {bannerData &&
          bannerData.map((data) => (
            <div key={data.id} className="flex mb-2">
              <span>
                {data.width}X{data.height} -
              </span>
              <a
                href={data.sample_link}
                download
                className="text-blue-600 hover:underline ml-1"
              >
                Download
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SampleBanner;
