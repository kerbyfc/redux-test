import * as _ from 'lodash';
import {ACTIONS} from '../../constants/actions';

const defaultState = {};

export function clientForm(state = defaultState, action) {
    switch (action.type) {
        case ACTIONS.SUBMIT_FORM:
            return _.assign({}, state, action.data);
        default:
            return state;
    }
}