import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getExperienceRange = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/master/fetchExperienceRange`,
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
    console.log("Error while getting experience range :: ", error);
  }
};

export default getExperienceRange;
