import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const updateUsernameAndUserId = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/updateNameAndID?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Update Corporate Username and UserId response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Fetch Corporate Profile :: ", error);
    throw error;
  }
};

export default updateUsernameAndUserId;
