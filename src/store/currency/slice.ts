import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {CurrencyItemType, CurrencySliceType, StatusType} from './types';

const initialState: CurrencySliceType = {
    status: StatusType.LOADING,
    currencies: [],
};

export const fetchCurrency = createAsyncThunk<CurrencyItemType[]>('currency/fetchCurrency', async () => {
    const {data} = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    return data;
});

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCurrency.pending, state => {
            state.status = StatusType.LOADING;
            state.currencies = [];
        });
        builder.addCase(fetchCurrency.fulfilled, (state, {payload}) => {
            state.status = StatusType.SUCCESS;
            let data: CurrencyItemType[] = [{
                txt: 'Українська гривня',
                rate: 1,
                cc: 'UAH',
                exchangedate: '',
            }];
            state.currencies = data.concat(payload.sort((a, b) => a.txt.localeCompare(b.txt)));
        });
        builder.addCase(fetchCurrency.rejected, state => {
            state.status = StatusType.ERROR;
            state.currencies = [];
        });
    },
});

export default currencySlice.reducer;