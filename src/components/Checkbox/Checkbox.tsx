/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';

/**
 * Local imports
 */
import * as styles from './Checkbox.style.scss';
import {ToggleCheckbox} from '../../actions/input/ToggleCheckbox';
import {Component} from '../../core/Component';

/**
 * Interfaces
 */
interface ICheckboxProps {
    $: IRef<boolean>;
    checked: boolean;
}

export class Checkbox extends Component<ICheckboxProps, any> {

    private toggle = (event) => {
        this.createAction<ToggleCheckbox>(ToggleCheckbox).emit({
            event, ref: this.props.$
        });
    };

    public render() {
        return (
            <div className={c(styles.container)}>
                <input type="checkbox"
                       className={c(styles.field)}
                       checked={this.props.checked}
                       onChange={this.toggle}
                />
            </div>
        );
    }

}
