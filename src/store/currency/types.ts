export type CurrencyItemType = {
    'txt': string
    'rate': number
    'cc': string
    'exchangedate': string
}

export enum StatusType {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type CurrencySliceType = {
    status: StatusType,
    currencies: CurrencyItemType[]
}

export type FetchCurrencyResponse = {
    data: CurrencyItemType[]
}