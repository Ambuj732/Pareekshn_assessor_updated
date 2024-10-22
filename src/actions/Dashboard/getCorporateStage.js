import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getCorporateStageData = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getCorporateStage`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Fetch Corporate Stage response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Fetch Corporate Profile :: ", error);
    throw error;
  }
};

export default getCorporateStageData;
