/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';

/**
 * Local imports
 */
import {ToggleCheckbox} from '../../actions/input/ToggleCheckbox';
import {Component} from '../../core/Component';

/* tslint:disable:no-var-requires */
const styles = require('./Checkbox.style.scss');
/* tslint:enable:no-var-requires */

interface ICheckboxProps {
    $: IRef<boolean>;
    checked: boolean;
}

export class Checkbox extends Component<any, any> {

    toggle = (event) => {
        this.createAction<ToggleCheckbox>(ToggleCheckbox).emit({
            event, ref: this.props.$
        })
    };

    render() {
        return (
            <div className={c(styles.container)}>
                <input className={c(styles.field)} type="checkbox" checked={this.props.checked} onChange={this.toggle} />
            </div>
        );
    }

}
