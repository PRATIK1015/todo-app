import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApi, postApi } from '../apis';

export const fetchtask = createAsyncThunk(
	'task',
	async (_, { rejectWithValue }) => {
		try {	
			const response = await getApi('/task/gettask');
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

export const addtask = createAsyncThunk(
	'task',
	async (data, { rejectWithValue }) => {
		try {	
			const response = await postApi('/task/addtask',data);
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);