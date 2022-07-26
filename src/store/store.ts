import {configureStore} from '@reduxjs/toolkit';
import currencyReducer from './currency/slice';


const store = configureStore({
    reducer: {
        currencies: currencyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;