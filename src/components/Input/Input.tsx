/**
 * External imports
 */
import * as React from 'react';
import * as _ from 'lodash';
import 'react-dom';

/**
 * Local imports
 */
import * as styles from './Input.style.scss';
import {ARROW_KEYS} from '../../vars';
import {Component} from '../../core/Component';
import {ChangeInputValue} from '../../actions/ChangeInputValue';

/**
 * Interfaces
 */
interface IInputProps {
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
    mask?: string | boolean;
    className?: string;
    delimiter?: string;
}

interface IInputState {
    selection: number[];
    repeat: number;
}

/**
 * @note some of handlers are used for mask input
 * TODO create MaskInput component
 */
export class Input extends Component<IInputProps, IInputState> {

    state = {
        repeat: 0,
        selection: [0, 0]
    };

    isMasked() {
        return this.props.mask !== undefined;
    }

    select(el: HTMLInputElement, start: number, end: number, direction: number = 1) {
        start = Math.max(0, start);

        if (el.value.length + 1 <= end) {
            start = el.value.length - 1;
        } else {
            end = start + 1;
        }

        if (el.value.slice(start, end) === this.props.mask) {
            (start += direction) && (end += direction);
        }

        el.setSelectionRange(start, end);

        /**
         * No needs to use setState to update component
         */
        this.state.selection = [start, end];
    };

    handleChange = (event) => {
        this.createAction<ChangeInputValue>(ChangeInputValue).emit({
            event,
            ref: this.props.$,
            selection: this.state.selection,
        });
    };

    updateSelectionOnMouseUp = (event) => {
        if (this.isMasked()) {
            const el = event.target;
            this.select(el, el.selectionStart, el.selectionStart + 1);
        }
    };

    /**
     * Update mask selection on user input
     */
    updateSelectionOnKeyUp = (event) => {
        if (this.isMasked()) {
            const el = event.target;

            let direction: number = 1;
            let {selectionStart: start} = el;

            /**
             * Support navigation
             */
            switch (event.keyCode) {
                case 37: start -= 1; direction = -1; break;  // up -> start
                case 38: start = 0; break;
                case 39: start += 1; break;
                case 40: start = el.value.length - 1; break; // down -> end
            }

            this.select(el, start, start + 1, direction);
        }
    };

    /**
     * Do not process arrow navigation on keyDown,
     * as it will be processed in keyUp event handler
     */
    preventOriginArrowNavigation = (event) => {
        if (this.isMasked()) {
            if (_.includes(ARROW_KEYS, event.keyCode)) {
                event.preventDefault();
            }
        }
    };

    preventInputWithoutSelection(event) {
        if (this.state.selection[1] - this.state.selection[0] !== 1) {
            event.preventDefault();
        }
    }

    handleSelect = (event) => {
        const el = event.target;
        let {selectionStart: start, selectionEnd: end} = el;

        /**
         * No needs to use setState to update component
         */
        this.state.selection = [start, end];
    };

    handleKeyRepeat = (event) => {
        if (this.isMasked()) {
            if (this.state.repeat > 1) {
                event.preventDefault();
            }
            /**
             * No needs to use setState to update component
             */
            this.state.repeat = this.state.repeat + 1;
        }
    };

    onKeyDown = (event) => {
        if (this.isMasked()) {
            this.preventOriginArrowNavigation(event);
            this.preventInputWithoutSelection(event);
        }
    };

    onKeyUp = (event) => {
        this.updateSelectionOnKeyUp(event);
        /**
         * No needs to use setState to update component
         */
        this.state.repeat = 0;
    };

    onMouseUp = (event) => {
        this.updateSelectionOnMouseUp(event);
    };

    onKeyPress = (event) => {
        this.handleKeyRepeat(event);
    };

    onSelect = (event) => {
        this.handleSelect(event);
    };

    onChange = (event) => {
        this.handleChange(event);
    };

    render() {
        return (
            <div className={this.class(styles.container, this.props.className, (this.props.error && styles.invalid || ''))}>
                <input type='text'
                       className={this.class(styles.field)}
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
        )
    }
}
