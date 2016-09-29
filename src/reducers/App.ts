/**
 * Local imports
 */
import {Reducer} from '../core/Reducer';
import {inject, singleton} from '../core/Injector';
import {ClientFormReducer} from './forms/ClientForm';
import {NotificationsReducer} from './NotificationsReducer';

/**
 * Root application reducer
 */
@singleton
export class AppReducer extends Reducer<IAppState> {

    constructor(
        @inject(ClientFormReducer) protected clientFormReducer: IReducer<IClientFormState>,
        @inject(NotificationsReducer) protected notificationsReducer: IReducer<INotification[]>
    ) {
        super();
    }

    /**
     * TODO: no type cheking
     */
    public combine() {
        return {
            notifications: this.notificationsReducer,
            clientForm: this.clientFormReducer
        };
    }

    public reduce(action: IAction<any>): IAppState {
        return this.state;
    }
}
