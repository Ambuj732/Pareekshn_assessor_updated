import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getCreatedJob = async (data) => {
  try {
    console.log(data);
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/job/createJob?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(" Create Job response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Create Job :: ", error);
    throw error;
  }
};

export default getCreatedJob;
