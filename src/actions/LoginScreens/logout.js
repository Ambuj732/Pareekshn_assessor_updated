import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const logout = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/corpLogout?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Logout response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging out user :: ", error);
  }
};

export default logout;
