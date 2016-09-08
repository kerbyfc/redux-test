/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {InputChangeAction} from '../actions/InputChangeAction';
import {Ref} from '../../core/Ref';

interface IProps {
    state: IRef<string>;
    value?: string;
    error?: string;
}

interface IState {
    selection: number[];
}

export class Input extends Component<IProps, IState> {

    handleChange = (event) => {
        this.createAction<InputChangeAction>(InputChangeAction).emit({
            event, selection: this.state.selection, ref: this.props.state
        });
    };

    handleSelect = (event) => {
        this.setState({
            selection: [event.target.selectionStart, event.target.selectionEnd]
        });
    };

    render() {
        return (
            <input type="text"
                defaultValue={this.props.value}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            />
        );
    }
}