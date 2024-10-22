import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getCorporateSizeData = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getCorporateSize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Fetch Corporate size response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Fetch Corporate Profile :: ", error);
    throw error;
  }
};

export default getCorporateSizeData;
