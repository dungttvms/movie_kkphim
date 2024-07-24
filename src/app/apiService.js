import axios from "axios";
import { BASE_URL, BASE_URL_2 } from "./config";

const createApiService = (baseURL) => {
  const apiService = axios.create({
    baseURL,
  });

  apiService.interceptors.request.use(
    (request) => {
      // console.log("Start request", request);
      return request;
    },
    (error) => {
      console.log("REQUEST ERROR", { error });
      return Promise.reject(error);
    }
  );

  apiService.interceptors.response.use(
    (response) => {
      // console.log("Response", response);
      return response.data;
    },
    (error) => {
      // console.log("RESPONSE ERROR", { error });
      const message = error.response?.data?.error?.message || "Unknown Error";
      return Promise.reject(message);
    }
  );

  return apiService;
};

const apiService1 = createApiService(BASE_URL);
const apiService2 = createApiService(BASE_URL_2);

export { apiService1, apiService2 };
