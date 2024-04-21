import { createSlice } from "@reduxjs/toolkit";
import { fetchprofile } from "../actions/fetchprofile";

const initialState: any = {
  data: null,
  isLoading: true,
  updateLoader: false,

  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Profile
    builder.addCase(fetchprofile.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });
    builder.addCase(fetchprofile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload?.data;
    });
    builder.addCase(fetchprofile.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice;