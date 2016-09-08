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

@connect()
export class ClientFormComponent extends Component<any, any> {

    render() {
        const refs = this.$.clientForm;

        return (
            <form>
                <Input $={refs.data.name} />
                <Input $={refs.data.surname} />
            </form>
        );
    }
}