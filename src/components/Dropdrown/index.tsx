import React, {FC, useRef, useState} from 'react';
import cn from 'classnames';
import {DropdownPropsType} from './types';
import styles from './Dropdown.module.scss';
import useCloseByRef from '../../hooks/useCloseByRef';
import {motion} from 'framer-motion';

const Dropdown: FC<DropdownPropsType> = ({items, selected, setSelected, className, ...props}) => {
    const [open, setOpen] = useState<boolean>(false); // стейт на открытие-закрытие
    const selectRef = useRef<HTMLDivElement>(null); // реф на блок выпадающего списка для закрытия
    useCloseByRef(selectRef, () => setOpen(false)); // хук для закрытия выпадающего списка
    return (
        <div ref={selectRef}
             className={cn(styles.selectBlock, className, {[styles.opened]: open})}
             onClick={() => setOpen(!open)}
             {...props}>
            <div className={styles.selected}><span>{selected && selected.txt}</span></div>
            <motion.div className={styles.dropdownBlock}
                        initial={{height: 0, overflowY: 'auto'}}
                        transition={{ease: 'easeInOut', duration: 0.2}}
                        animate={{height: open ? 200 : 0}}>
                {selected && items.slice().sort((x, y) => x.cc === selected.cc ? -1 : y.cc === selected.cc ? 1 : 0).map(item => (
                    <div key={item.rate} className={styles.dropdownItem}
                         onClick={() => setSelected({cc: item.cc, txt: item.txt, rate: item.rate})}>{item.txt}</div>
                ))}
            </motion.div>
        </div>
    );
};

export default Dropdown;