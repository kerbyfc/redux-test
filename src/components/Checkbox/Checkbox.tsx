/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {CheckboxAction} from '../../actions/CheckboxAction';
import {Component} from '../../core/Component';
import {IRef} from '../../core/Ref';

/* tslint:disable:no-var-requires */
const styles = require('./Checkbox.style.scss');
/* tslint:enable:no-var-requires */

interface ICheckboxProps {
    $: IRef<boolean>;
    checked: boolean;
}

export class Checkbox extends Component<any, any> {

    toggle = (event) => {
        this.createAction<CheckboxAction>(CheckboxAction).emit({
            event, ref: this.props.$
        })
    };

    render() {
        return (
            <div className={this.class(styles.container)}>
                <input className={this.class(styles.field)} type="checkbox" checked={this.props.checked} onChange={this.toggle} />
            </div>
        );
    }

}
