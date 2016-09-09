/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {InputChangeAction} from '../actions/InputChangeAction';
import {IRef} from '../state';

interface IProps {
    /**
     * Required
     */
    $: IRef<string>;

    /**
     * Optional
     */
    value?: string;
    error?: string;
    mask?: string | boolean;
    delimiter?: string;
}

interface IState {
    selection: number[];
}

export class Input extends Component<IProps, IState> {

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

        this.setState({
            selection: [start, end]
        });
    };

    handleChange = (event) => {
        this.createAction<InputChangeAction>(InputChangeAction).emit({
            event,
            ref: this.props.$,
            selection: this.state.selection,
        });
    };

    updateMouseSelection = (event) => {
        if (this.isMasked()) {
            const el = event.target;
            this.select(el, el.selectionStart, el.selectionStart + 1);
        }
    };

    updateKeySelection = (event) => {
        const el = event.target;
        let direction: number = 1;
        let {selectionStart: start, selectionEnd: end} = el;

        /**
         * Support navigation
         */
        switch (event.keyCode) {
            case 37: start -= 1; direction = -1; break;  // up -> start
            case 38: start = 0; break;
            case 40: start = el.value.length - 1; break; // down -> end
        }

        if (this.isMasked()) {
            this.select(el, start, start + 1, direction);
        }
    };

    checkMask = (event) => {
        if (this.isMasked()) {
            const el = event.target;
            if (el.selectionEnd - el.selectionStart !== 1) {
                event.preventDefault();
            }
        }
    };

    handleSelect = (event) => {
        const el = event.target;
        this.setState({
            selection: [el.selectionStart, el.selectionEnd]
        });
    };

    render() {
        return (
            <input type="text"
                defaultValue={this.props.$.val}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                onKeyUp={this.updateKeySelection}
                onKeyDown={this.checkMask}
                onMouseUp={this.updateMouseSelection}
            />
        );
    }
}