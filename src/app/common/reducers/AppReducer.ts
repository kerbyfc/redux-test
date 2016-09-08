/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {ClientFormReducer} from './ClientFormReducer';
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

    // combine(): IState {
    //     return {
    //         clientForm: this.clientFormReducer.release(['app'])
    //     };
    // }

    reduce(state: IState, action): IState {
        return state;
    }
}
