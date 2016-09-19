/**
 * Local imports
 */
import {Reducer, IReducer} from '../core/Reducer';
import {inject} from '../core/Injector';
import {ClientFormReducer} from './ClientForm';
import ReducersMapObject = Redux.ReducersMapObject;
import {NotificationsReducer} from './NotificationsReducer';

/**
 * Root application reducer
 */
export class AppReducer extends Reducer<IAppState> {

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientFormState>,
        @inject(NotificationsReducer) protected notificationsReducer: IReducer<INotification[]>
    ) {
        super();
    }

    combine() {
        return {
            notifications: this.notificationsReducer,
            clientForm: this.clientFormReducer
        };
    }

    reduce(state: IAppState, action): IAppState {
        return state;
    }
}
