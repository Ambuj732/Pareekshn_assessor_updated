import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const editJob = async (data) => {
  try {
    console.log(data);
    // const queryString = Object.keys(data)
    //   .map(
    //     (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    //   )
    //   .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/job/editJob`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(" edit Job response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in edit Job :: ", error);
    throw error;
  }
};

export default editJob;
