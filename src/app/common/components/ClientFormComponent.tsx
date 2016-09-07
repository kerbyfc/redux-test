/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';

/**
 * Local imports
 */
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

    render() {
        return (
            <form>
                {/*<input type="text" ref="name" name={state.map.clientForm.data.name} value={this.props.name} onKeyDown={this.handleKeyDown} />*/}
                {/*<input type="text" name={CLIENT_FORM_FIELDS.surname} value={this.props.surname} onKeyDown={this.handleKeyDown} />*/}
            </form>
        );
    }
}