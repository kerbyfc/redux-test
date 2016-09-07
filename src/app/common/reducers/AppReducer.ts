/**
 * External imports
 */
import * as _ from 'lodash';
import * as flat from 'flat';

/**
 * Local imports
 */
import {ClientFormReducer, IClientFormState} from './ClientFormReducer';
import {inject} from '../../core/Injector';
import {Reducer, IReducer} from '../../core/Reducer';

// TODO: think about reducer key invalidation
export interface IState {
    clientForm: IClientFormState;
    refs?: IState;
}

export class AppReducer extends Reducer<IState> {

    static key = 'app';

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientFormState>
    ) {
        super(
            clientFormReducer
        );
    }

    buildStateMap(state) {
        return flat.unflatten(_.mapValues(flat.flatten(state), (value, key) => key));
    }

    reduce(state: IState, action): IState {
        if (!state.refs) {
            state = _.assign<{}, IState>({}, state, {refs: this.buildStateMap(state)});
        }
        return state;
    }
}
