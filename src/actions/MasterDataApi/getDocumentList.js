import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getDocumentList = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getDocumentList`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Get Document Types Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting sectors :: ", error);
  }
};

export default getDocumentList;
