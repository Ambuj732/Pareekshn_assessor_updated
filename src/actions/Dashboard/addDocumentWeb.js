import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const addDocumentWeb = async (data) => {
  try {
    console.log(data);

    const queryString = Object.keys(data)
      // .map(
      //   (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      // )
      // .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/addDocumentWeb`,
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
    console.log("Error while logging in Adding document :: ", error);
    throw error;
  }
};

export default addDocumentWeb;
