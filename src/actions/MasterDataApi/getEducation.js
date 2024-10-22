import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getEducation = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/getHighQualList`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Experience Range Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting qualifications :: ", error);
  }
};

export default getEducation;
