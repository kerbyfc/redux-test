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

    reduce(state: IState, action: IAction): IState  {
        return state;
    }
}
