/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';
import {autobind} from 'core-decorators';

/**
 * Local imports
 */
import * as styles from './Input.style.scss';
import {Component} from '../../core/Component';
import {ChangeInputValue} from '../../actions/input/ChangeInputValue';

/**
 * Interfaces
 */
interface IInputProps extends IComponentProps {
	/**
	 * Required
	 */
	$: IRef<string>;

	// TODO: use val from $
	// subscribe to ref value change and
	// update input component with forceUpdate()
	// Profit:
	//  1) update only input component, not whole container
	//  2) no needs to wrap template in container only for input
	//  3) strict common logic everywhere while scaling
	//  4) less source code (only <Input $={refs.name} />)
	val: string;

	/**
	 * Optional
	 */
	error?: string;
	className?: string;

	/**
	 * MaskeInput optional props
	 */
	mask?: string | boolean;
}

interface IInputState {
	selection: number[];
	repeat: number;
}

/**
 * @note some of handlers are used for mask input
 */
export class Input extends Component<IInputProps, IInputState> {

	public state = {
		repeat: 0,
		selection: [0, 0]
	};

	private handleChange(event)  {
		this.createAction<ChangeInputValue>(ChangeInputValue).emit({
			event, ref: this.props.$, selection: this.state.selection
		});
	}

	private handleSelect(event) {
		const el = event.target;
		let {selectionStart: start, selectionEnd: end} = el;

		/**
		 * No needs to use setState to update component
		 */
		this.state.selection = [start, end];
	}

	private getContainerClass() {
		return c(
			styles.container,
			this.props.className,
			(this.props.error && styles.invalid || '')
		);
	}

	@autobind
	private onSelect(event) {
		this.handleSelect(event);
	}

	@autobind
	private onChange(event) {
		this.handleChange(event);
	}

	@autobind
	private getInputClass() {
		return c(styles.field);
	}

	@autobind
	protected onKeyDown(event) {
		return;
	}

	@autobind
	protected onMouseUp(event) {
		return;
	}

	@autobind
	protected onKeyPress(event) {
		return;
	}

	@autobind
	protected onKeyUp(event) {
		/**
		 * No needs to use setState to update component
		 */
		this.state.repeat = 0;
	}

	public render() {
		return (
			<div className={this.getContainerClass()}>
				<input type="text" id={this.props.id}
					   className={this.getInputClass()}
					   value={this.props.val}
					   onChange={this.onChange}
					   onSelect={this.onSelect}
					   onKeyUp={this.onKeyUp}
					   onKeyDown={this.onKeyDown}
					   onMouseUp={this.onMouseUp}
					   onKeyPress={this.onKeyPress}
				/>
				<span className={styles.error}>{this.props.error}</span>
			</div>
		);
	}
}
