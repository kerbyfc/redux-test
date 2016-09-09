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
import {IAppState, IClientFormState} from '../state';

export class AppReducer extends Reducer<IAppState> {

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientFormState>
    ) {
        super();
    }

    combine(): IAppState {
        return {
            clientForm: this.clientFormReducer
        };
    }

    reduce(state: IAppState, action): IAppState {
        return state;
    }
}
