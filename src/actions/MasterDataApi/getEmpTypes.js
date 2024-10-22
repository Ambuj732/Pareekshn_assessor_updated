import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getEmpTypes = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchEmpTypes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Emp Types Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting emp types :: ", error);
  }
};

export default getEmpTypes;
