import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getSalaryRange = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/init/getSalaryRange`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Get Photo Slider Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting photo slider :: ", error);
  }
};

export default getSalaryRange;
