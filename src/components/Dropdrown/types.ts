import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {CurrencyItemType} from '../../store/currency/types';
import {SelectedItem} from '../../App';

export interface DropdownPropsType extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    items: CurrencyItemType[];
    selected: SelectedItem | undefined;
    setSelected: (selected: SelectedItem) => void;
}