import styles from './Header.module.scss';
import logo from '../../img/logo.png';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {fetchCurrency} from '../../store/currency/slice';

const Header = () => {
    const usd = useAppSelector(state => state.currencies.currencies.find(item => item.cc === 'USD'));
    const eur = useAppSelector(state => state.currencies.currencies.find(item => item.cc === 'EUR'));
    const dispatch = useAppDispatch();

    const updateHandler = () => {
        dispatch(fetchCurrency());
    };
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <img src={logo} alt="Logo"/>
                <span>Converter</span>
            </div>
            <div className={styles.current}>
                <div className={styles.currentItem}>
                    <span className={styles.name}>USD</span>
                    <span className={styles.value}>{usd?.rate.toFixed(2)}</span>
                </div>
                <div className={styles.currentItem}>
                    <span className={styles.name}>EUR</span>
                    <span className={styles.value}>{eur?.rate.toFixed(2)}</span>
                </div>
            </div>
            <button className={styles.updateBtn} onClick={updateHandler}>Оновити курс</button>
        </div>
    );
};

export default Header;