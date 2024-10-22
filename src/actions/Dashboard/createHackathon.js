import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getCreateHackathon = async (data) => {
  try {
    //console.log(data);
    /*  const file = data?.file;
    data.file = "";
    const formData = new FormData();
    formData.append("file", data?.file);
    */
    // const queryString = Object.keys(data)
    //   .map(
    //     (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    //   )
    //   .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/hackathon/createHackathonWeb`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(" Create Hackathon response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Create Hackathon :: ", error);
    throw error;
  }
};

export default getCreateHackathon;
