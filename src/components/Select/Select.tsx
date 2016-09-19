/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';

/**
 * Local imports
 */
import * as styles from './Select.style.scss';
import {Component} from '../../core/Component';
import {SelectOption} from '../../actions/input/SelectOption';

/**
 * Interfaces
 */
interface ICheckboxProps {
    $: IRef<string>;
    options: string[];
    value: string;
}

export class Select extends Component<ICheckboxProps, any> {

    toggle = (event) => {
        this.createAction<SelectOption>(SelectOption).emit({
            event, ref: this.props.$
        });
    };

    render() {
        return (
            <div className={c(styles.container)}>
                <select className={c(styles.field)} onChange={this.toggle} value={this.props.value}>
                    {(this.props.options || []).map((option) => {
                        return <option key={option} value={option}>{option}</option>;
                    })}
                </select>
            </div>
        );
    }

}
