import { createSlice } from "@reduxjs/toolkit";
import { toastText } from "../../utils/utils";
import { loginAction } from "../actions/loginAction";

const initialState: any = {
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action: any) => {
      state.isLoading = false;
    //   state.data=action.payload.data
      toastText(action?.payload?.message,"success");
    });
    builder.addCase(loginAction.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
      if (action?.payload?.responseStatus !== 409) {
        toastText(action?.payload?.message, "error");
      }
    });

    // builder.addCase(logoutAction.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(logoutAction.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   localStorage.clear();
    //   toastText(action?.payload?.message, "success");
    // });
    // builder.addCase(logoutAction.rejected, (state, action: any) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    //   toastText(action?.payload?.message, "error");
    // });
  },
});

export default AuthSlice;