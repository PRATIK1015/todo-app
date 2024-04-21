import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slice/loginSlice';
import taskSlice from './slice/taskSlice';
import profileSlice from './slice/profileSlice';
// import profileSlice from './slice/profileSlice';

const store = configureStore({
	reducer: {
		auth: loginSlice.reducer,
		task: taskSlice.reducer,
        profile:profileSlice.reducer
		
	},
});

export default store;
export type AppDispatch = typeof store.dispatch;