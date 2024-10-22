import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getSkills = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchKeySkills`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Get Sectors Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting skills :: ", error);
  }
};

export default getSkills;
