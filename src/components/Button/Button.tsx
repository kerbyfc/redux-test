/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';
import SyntheticEvent = __React.SyntheticEvent;

/**
 * Local imports
 */
import * as styles from './Button.style.scss';
import {Component} from '../../core/Component';
import {autobind} from 'core-decorators';

/**
 * Interfaces
 */
interface IButtonProps extends IComponentProps {
	text?: string;
	onClick: (event: SyntheticEvent) => void;
}

/**
 * Simple button component
 */
export class Button extends Component<IButtonProps, any> {

	@autobind
	private onClick(event) {
		event.preventDefault();
		this.props.onClick(event);
	};

	public render() {
		return (
			<button className={c(styles.button)} onClick={this.onClick}>
				{this.props.children || this.props.text}
			</button>
		);
	}
}
