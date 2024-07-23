import axios from "axios";
import { BASE_URL_2 } from "./config";

const apiService2 = axios.create({
  baseURL: BASE_URL_2,
});

apiService2.interceptors.request.use(
  (request) => {
    // console.log("Start request", request);
    return request;
  },
  function(error) {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);

apiService2.interceptors.response.use(
  (response) => {
    // console.log("Response", response);
    return response.data;
  },
  function(error) {
    // console.log("RESPONSE ERROR", { error });
    const message = error.response?.data?.error?.message || "Unknown Error";
    return Promise.reject(message);
  }
);

export default apiService2;
