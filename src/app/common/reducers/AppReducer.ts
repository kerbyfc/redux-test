/**
 * External imports
 */
import * as _ from 'lodash';
import * as flat from 'flat';

/**
 * Local imports
 */
import {ClientFormReducer, IClientFormState} from './ClientFormReducer';
import {IAction} from '../../core/Action';
import {inject} from '../../core/Injector';
import {Reducer, IReducer} from '../../core/Reducer';
import {ICarretPositionState, CarretPositionReducer} from './CarretPositionReducer';
import {TextInputKeyboardAction} from '../actions/TextInputKeyboardAction';

// TODO: think about reducer key invalidation
export interface IState {
    $?: IState; // map of state properties

    clientForm: IClientFormState;
    carretPosition: ICarretPositionState;
}

export class AppReducer extends Reducer<IState> {

    static key = 'app';

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientFormState>,
        @inject(CarretPositionReducer) protected caretPositionReducer: IReducer<ICarretPositionState>
    ) {
        super(
            clientFormReducer,
            caretPositionReducer
        );
    }

    buildStateMap(state) {
        return flat.unflatten(_.mapValues(flat.flatten(state), (value, key) => key));
    }

    reduce(state: IState, action): IState {
        if (!state.$) {
            state = _.assign<{}, IState>({}, state, {$: this.buildStateMap(state)});
            console.log('INITIAL APP STATE', state);
        }
        return state;
    }
}
