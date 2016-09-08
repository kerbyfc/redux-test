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
        data: state.clientForm.data
    };
})
export class ClientFormComponent extends Component<any, any> {

    render() {
        const refs = this.getRefs().clientForm;

        return (
            <form>
                <Input
                    state={refs.data.name}
                    value={this.props.data.name}
                />


                <Input
                    state={refs.data.surname}
                    value={this.props.data.surname}
                />
            </form>
        );
    }
}