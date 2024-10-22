import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const updateCorpProfilePicWeb = async (data) => {
  try {
    // const queryString = Object.keys(data)
    //   .map(
    //     (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    //   )
    //   .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/updateProfilePicWeb`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Update Corp Profile Pic Web response :: ", response);
    return response;
  } catch (error) {
    console.log(
      "Error while logging in Update Corp Profile Pic Web :: ",
      error
    );
    throw error;
  }
};

export default updateCorpProfilePicWeb;
