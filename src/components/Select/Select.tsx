/**
 * External imports
 */
import * as React from 'react';
import * as cx from 'classnames';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {SelectOption} from '../../actions/SelectOption';

/* tslint:disable:no-var-requires */
const styles = require('./Select.style.scss');
/* tslint:enable:no-var-requires */

interface ICheckboxProps {
    $: IRef<boolean>;
    value: string;
}

export class Select extends Component<any, any> {

    toggle = (event) => {
        this.createAction<SelectOption>(SelectOption).emit({
            event, ref: this.props.$
        });
    };

    render() {
        return (
            <div className={cx(styles.container)}>
                <select className={cx(styles.field)} onChange={this.toggle} value={this.props.value}>
                    {(this.props.options || []).map((option) => {
                        return <option key={option} value={option}>{option}</option>;
                    })}
                </select>
            </div>
        );
    }

}
