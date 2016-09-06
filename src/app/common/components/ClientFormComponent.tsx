/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';

/**
 * Local imports
 */
import {CLIENT_FORM_FIELDS} from '../reducers/ClientFormReducer';
import {TextInputKeyDownAction} from '../actions/TextInputKeyDownAction';

export class ClientFormInputKeyDownAction extends TextInputKeyDownAction {}

@connect((state) => {
    return {
        name: state.clientForm.data.name,
        surname: state.clientForm.data.surname,
        cursors: _.clone(state.clientForm.inputCarretPositions)
    };
})
export class ClientFormComponent extends React.Component<any, any> {

    handleKeyDown = (event) => {
        new ClientFormInputKeyDownAction({event}).emit();
    };

    componentDidUpdate() {
        setTimeout(() => {
            const cursor = this.props.cursors.name;
            console.log(cursor);
            const el = this.refs['name'] as HTMLInputElement;
            el.setSelectionRange(cursor, cursor);
        });
    }

    render() {
        console.log('HERE', this);
        return (
            <form>
                <input type="text" ref="name" name={CLIENT_FORM_FIELDS.name} value={this.props.name} onKeyDown={this.handleKeyDown} />
                <input type="text" name={CLIENT_FORM_FIELDS.surname} value={this.props.surname} onKeyDown={this.handleKeyDown} />
            </form>
        );
    }
}