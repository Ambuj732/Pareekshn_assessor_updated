import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getDifficultyLevel = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getDifficultyLevel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Get Difficulty Level Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting difficulty level :: ", error);
  }
};

export default getDifficultyLevel;
