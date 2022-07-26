import Header from './components/Header';
import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import Dropdown from './components/Dropdrown';
import './App.scss';
import {useAppDispatch, useAppSelector} from './store/hook';
import {fetchCurrency} from './store/currency/slice';

export type SelectedItem = {
    txt: string
    cc: string
    rate: number
}

const App: FC = () => {
    const dispatch = useAppDispatch();
    const {currencies} = useAppSelector(state => state.currencies); // список курсов валют
    const [selectedFrom, setSelectedFrom] = useState<SelectedItem>(); // первая валюта
    const [selectedTo, setSelectedTo] = useState<SelectedItem>(); // вторая валюта
    const [quantityFrom, setQuantityFrom] = useState<number>(0); // кол-во первой валюты
    const [quantityTo, setQuantityTo] = useState<number>(0); // кол-во второй валюты

    useEffect(() => {
        setSelectedFrom(currencies[0]);
        setSelectedTo(currencies[1]);
        setQuantityTo(0);
        setQuantityFrom(0);
    }, [currencies]); // обновление стейтов после загрузки с API

    useEffect(() => {
        dispatch(fetchCurrency());
    }, [dispatch]); // отправка запроса на API при первом рендере

    useEffect(() => {
        if (selectedTo && selectedFrom) {
            setQuantityTo(calcCurrency(selectedFrom.rate, selectedTo.rate, quantityFrom));
        }
    }, [selectedFrom]); // расчет значения при изменении первой валюты

    useEffect(() => {
        if (selectedTo && selectedFrom) {
            setQuantityFrom(calcCurrency(selectedTo.rate, selectedFrom.rate, quantityTo));
        }
    }, [selectedTo]); // расчет значения при изменении второй валюты


    const calcCurrency = useCallback((rateFrom: number, rateTo: number, quantity: number): number => {
        return Number((rateFrom / rateTo * quantity).toFixed(3));
    }, []); // вспомогательный callback для конвертации

    const exchangeFromHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = Number(e.target.value.replace(/[^.\d]/, ''));
        setQuantityFrom(currentValue);
        setQuantityTo(calcCurrency(selectedFrom!.rate, selectedTo!.rate, currentValue));
    }; // обработчик изменений в поле для первой валюты

    const exchangeToHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = Number(e.target.value.replace(/[^.\d]/, ''));
        setQuantityTo(currentValue);
        setQuantityFrom(calcCurrency(selectedTo!.rate, selectedFrom!.rate, currentValue));
    }; // обработчик изменений в поле для второй валюты

    return (<div className="wrapper">
        <Header/>
        <div className="exchange">
            <div className="exchange__item">
                <Dropdown items={currencies} selected={selectedFrom} setSelected={setSelectedFrom}/>
                <input onChange={exchangeFromHandler} value={quantityFrom}/>
            </div>
            <div className="exchange__item">
                <Dropdown items={currencies} selected={selectedTo} setSelected={setSelectedTo}/>
                <input onChange={exchangeToHandler} value={quantityTo}/>
            </div>
        </div>
    </div>);
};

export default App;
