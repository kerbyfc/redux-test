/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {InputChangeAction} from '../actions/InputChangeAction';

@connect((state) => {
    return {
        data: state.clientForm.data,
        refs: state.refs.clientForm.data
    };
})
export class ClientFormComponent extends Component<any, any> {

    handleChange = (event) => {
        new InputChangeAction(event).emit();
    };

    render() {
        // TODO: add input components
        return (
            <form>
                <input type="text"
                    name={this.props.refs.name}
                    onChange={this.handleChange}
                />

                <input type="text"
                    name={this.props.refs.surname}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}