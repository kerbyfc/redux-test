/**
 * Local imports
 */
import {ClientFormReducer, IClientFormState} from './ClientFormReducer';
import {IAction} from '../../core/Action';
import {inject} from '../../core/Injector';
import {Reducer, IReducer} from '../../core/Reducer';

export interface IState {
    clientForm: IClientFormState;
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

    reduce(state: IState, action: IAction): IState  {
        return state;
    }
}
