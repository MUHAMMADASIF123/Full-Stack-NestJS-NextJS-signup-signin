import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Assuming REQUEST_HEADERS is defined somewhere in your constants
import { REQUEST_HEADERS } from "../constants/api";
import {IRequestBody} from "./service.types"
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

const getTokenHeader = () => {
  let extraHeaders = {};
  const token = localStorage.getItem("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    extraHeaders["Authorization"] = `Bearer ${parsedToken}`;
  }
  return extraHeaders;
};

export const postRequest = async (endpoint:any, data:any) => {
  try {
    const extraHeaders = getTokenHeader();
    const config = {
      headers: {
        ...REQUEST_HEADERS,
        ...extraHeaders,
        'Content-Type': 'application/json', // Assuming you want to keep JSON as the default Content-Type
      },
      withCredentials: true, // This is to include credentials such as cookies, similar to 'credentials: include'
    };

    const response = await axios.post(`${baseURL}/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error during POST request:', error);
    // Re-throw the error for further handling, if necessary
    throw error;
  }
};

export const putRequest = async (
  endpoint: string,
  data: any, // Use your IRequestBody or any type as needed
  axiosConfig?: AxiosRequestConfig
) => {
  try {
    const extraHeaders = getTokenHeader();
    const config: AxiosRequestConfig = {
      ...axiosConfig,
      headers: {
        ...REQUEST_HEADERS,
        ...extraHeaders,
        ...axiosConfig?.headers,
        'Content-Type': 'application/json', // Assuming JSON content type
      },
      withCredentials: true, // To include credentials such as cookies
    };

    const response = await axios.put(`${baseURL}/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error during PUT request:', error);
    throw error;
  }
};

export const getRequest = (
  endpoint: string,
  params?: any, // Adjusted to be more flexible with the type
  axiosConfig?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...axiosConfig?.headers,
    },
    params, // This is the correct way to pass params in Axios
  };

  // Construct the full URL here, assuming 'endpoint' is a path that should be appended to 'baseURL'
  const fullUrl = `${baseURL}/${endpoint}`;

  return axios.get(fullUrl, config);
};


export const deleteRequest = (
  endpoint: string,
  params?: any, // Using a more flexible type for parameters
  axiosConfig?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...axiosConfig?.headers,
    },
    params, // Correctly use Axios to handle parameters
  };

  // Construct the full URL, assuming 'endpoint' is a path to append to 'baseURL'
  const fullUrl = `${baseURL}/${endpoint}`;

  return axios.delete(fullUrl, config);
};


//get via id
export const getRequestID = (
  endpoint: string,
  params?: any, // Adjusted for flexibility
  axiosConfig?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...axiosConfig?.headers,
    },
    params, // Correct way to include params with Axios
  };

  // Construct the URL by appending the endpoint to the baseURL
  const fullUrl = `${baseURL}/${endpoint}`;

  return axios.get(fullUrl, config);
};

export const patchRequest = async (
  endpoint: string,
  data: any, // Adjusted for flexibility
  axiosConfig?: AxiosRequestConfig
) => {
  const extraHeaders = getTokenHeader();
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    headers: {
      ...REQUEST_HEADERS,
      ...extraHeaders,
      ...axiosConfig?.headers,
    },
  };

  // Construct the URL by appending the endpoint to the baseURL
  const fullUrl = `${baseURL}/${endpoint}`;

  try {
    const response = await axios.patch(fullUrl, data, config);
    return response.data;
  } catch (error) {
    console.error('Error during PATCH request:', error);
    throw error;
  }
};



export const getErrorMessage = (error: AxiosError): string => {
  // Directly access the nested properties with optional chaining
  const message = error?.response?.data?.message;
  const errorDetail = error?.response?.data?.error;

  // First, check if 'message' is available and return it if so
  if (message) {
    return message;
  }

  // If 'message' isn’t available, check if 'error' has content and return it
  if (typeof errorDetail === 'string' && errorDetail.length > 0) {
    return errorDetail;
  }

  // If neither 'message' nor 'error' provide useful information, return a default error message
  return "Error while processing your request";
};