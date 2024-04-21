import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi } from '../apis';
import { toastText } from '../../utils/utils';


const initialState: any = {
	isLoading: false,
	error: null,
};

export const registerAction = createAsyncThunk(
	'auth/register',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await postApi('/auth/register', data);
			
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);



const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		
		builder.addCase(registerAction.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(registerAction.fulfilled, (state, action: any) => {
			state.isLoading = false;
			toastText(action?.payload?.message, 'success');
		});
		builder.addCase(registerAction.rejected, (state, action: any) => {
			state.isLoading = false;
			state.error = action.payload;
			toastText(action?.payload?.message, 'error');
		});
	},
});

export default registerSlice;
