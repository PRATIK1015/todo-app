import { createSlice } from "@reduxjs/toolkit";
import {  addtask, fetchtask } from "../actions/taskAction";

const initialState: any = {
  data: null,
  isLoading: true,
  // updateLoader: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchtask.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });
    builder.addCase(fetchtask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload?.data;
    });
    builder.addCase(fetchtask.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // builder.addCase(addtask.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(addtask.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data.push(action?.payload?.data);
    // });
    // builder.addCase(addtask.rejected, (state, action: any) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });

//     // Update Profile
//     builder.addCase(updateProfileAction.pending, (state) => {
//       state.updateLoader = true;
//       state.error = null;
//     });
//     builder.addCase(updateProfileAction.fulfilled, (state, action) => {
//       state.updateLoader = false;
//       state.data = action?.payload?.data;
//       toastText(action?.payload?.message, "success");
//     });
//     builder.addCase(updateProfileAction.rejected, (state, action: any) => {
//       state.updateLoader = false;
//       state.error = action.payload;
//       toastText(action?.payload?.message, "error");
//     });
  },
});

export default taskSlice;