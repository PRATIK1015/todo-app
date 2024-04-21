import axios from "axios";
import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const apiConfig = (flag = false) => {
  const refreshToken=Cookies.get("refreshToken")
  const accessToken=Cookies.get("accessToken")
  if (accessToken && refreshToken) {
    return {
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": flag ? "multipart/form-data" : "application/json",
        "RefreshToken": `bearer ${refreshToken}`,
      },
      method: "PUT,DELETE,POST,GET,OPTION",
    };
  }
  return { withCredentials: false };
};

export const getApi = (url?: string, params?: any) => {
  return axios.get(`${endPoint}${url}`, {
    params: params,
    ...apiConfig(),
  });
};

export const postApi = (url: string, apiData?: any, flag?: boolean) => {
  return axios.post(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {
  return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApiNoHeader = (url: string, apiData: any) => {
  if (Cookies.get("accessToken")) {
    return axios.put(`${endPoint}${url}`, apiData, {
      headers: {
        Authorization: `bearer ${Cookies.get("accessToken")}`,
      },
    });
  } else {
    // If there's no access token, return an error response or handle it as needed.
    return Promise.reject("No access token available");
  }
};

export const deleteApi = (url: string) => {
  return axios.delete(`${endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url: string, apiData?: any) => {
  return axios.delete(`${endPoint}${url}`, {
    data: apiData,
    ...apiConfig(),
  });
};

