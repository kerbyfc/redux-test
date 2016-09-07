/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {Input} from './Input';

@connect((state) => {
    return {
        data: state.clientForm.data,
        refs: state.refs.clientForm.data
    };
})
export class ClientFormComponent extends Component<any, any> {

    render() {
        // TODO: add input components
        return (
            <form>
                <Input name={this.props.refs.name} value={this.props.data.name} />
                <Input name={this.props.refs.surname} value={this.props.data.surname} />
            </form>
        );
    }
}