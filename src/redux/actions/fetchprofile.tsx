import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApi } from '../apis';

export const fetchprofile = createAsyncThunk(
	'profile',
	async (_, { rejectWithValue }) => {
		try {	
			const response = await getApi('/auth/fetchprofile');
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);
