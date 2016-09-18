/**
 * External imports
 */
import * as React from 'react';
import SyntheticEvent = __React.SyntheticEvent;

/**
 * Local imports
 */
import * as styles from './Button.style.scss';
import {Component} from '../../core/Component';

/**
 * Interfaces
 */
interface IButtonProps {
    text?: string;
    onClick: (event: SyntheticEvent) => void
}

/**
 * Simple button component
 */
export class Button extends Component<IButtonProps, any> {

    onClick = (event) => {
        event.preventDefault();
        this.props.onClick(event);
    };

    render() {
        return (
            <button className={this.class(styles.button)} onClick={this.onClick}>
                {this.props.children || this.props.text}
            </button>
        );
    }
}
