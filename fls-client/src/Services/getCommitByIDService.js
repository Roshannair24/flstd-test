import axios from "axios";
import { url } from "../Config/config";

let responseAxios = null;
export const getCommitByIDApi = async (action) => {
  const payload = action.payload;

  await axios
    .get(
      `${url}/repositories/${payload.owner}/${payload.repo}/commits/${payload.ref}`
    )
    .then((res) => {
      responseAxios = res;
    })
    .catch((err) => {
      //err
    });

  return responseAxios;
};
