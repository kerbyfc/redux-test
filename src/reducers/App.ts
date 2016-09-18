/**
 * Local imports
 */
import {Reducer, IReducer} from '../core/Reducer';
import {inject} from '../core/Injector';
import {ClientFormReducer} from './ClientForm';
import ReducersMapObject = Redux.ReducersMapObject;
import {IClientForm, IState} from '../state';
import {NotificationsReducer} from './NotificationsReducer';
import {INotification} from '../actions/ShowNotification';

/**
 * Root application reducer
 */
export class AppReducer extends Reducer<IState> {

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientForm>,
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

    reduce(state: IState, action): IState {
        return state;
    }
}
