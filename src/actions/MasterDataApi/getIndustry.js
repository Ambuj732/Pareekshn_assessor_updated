import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getIndustry = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchIndustry`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Get Industry Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting language list :: ", error);
  }
};

export default getIndustry;
