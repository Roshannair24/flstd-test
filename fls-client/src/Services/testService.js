import axios from "axios";
import { url } from "../Config/config";

let responseAxios = null;
export const testApi = async (action) => {
  const payload = action.payload;

  console.log("payload=", payload, "url ", url);

  await axios
    .get(`${url}/test`, payload)
    .then((res) => {
      responseAxios = res;
    })
    .catch((err) => {
      //err
    });

  return responseAxios;
};
