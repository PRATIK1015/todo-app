import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { postApi } from "../apis";

export const loginAction = createAsyncThunk(
  "auth/Login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postApi("/auth/login", data);
      // Set cookie expiration based on rememberMe
      const cookieExpiration = data?.rememberMe ? 30 : 1; // 30 days if true, 1 day if false
      Cookies.set("accessToken", response?.data?.data?.accessToken, {
        expires: cookieExpiration, // Set the cookie expiration
      });
      Cookies.set("refreshToken", response?.data?.data?.refreshToken, {
        expires: cookieExpiration, // Set the cookie expiration
      });
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);