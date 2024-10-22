import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const removeEmp = async (data) => {
  try {
    console.log(data);

    const queryString = Object.keys(data)
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/removeEmp`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(" Add Document  response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while deleting employee :: ", error);
    throw error;
  }
};

export default removeEmp;
