/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {InputChangeAction} from '../actions/InputChangeAction';

interface IProps {
    name: string;
    value?: string;
}

interface IState {
    selection: number[];
}

export class Input extends Component<IProps, IState> {

    handleChange = (event) => {
        new InputChangeAction(event, this.state.selection).emit();
    };

    handleSelect = (event) => {
        this.setState({
            selection: [event.target.selectionStart, event.target.selectionEnd]
        });
    };

    render() {
        return (
            <input type="text"
                name={this.props.name}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            />
        );
    }
}