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
        @inject(ClientFormReducer) private clientFormReducer: IReducer<IClientFormState>,
        @inject(NotificationsReducer) private notificationsReducer: IReducer<INotification[]>
    ) {
        super();
    }

    /**
     * TODO: no type cheking
     */
    protected combine() {
        return {
            notifications: this.notificationsReducer,
            clientForm: this.clientFormReducer
        };
    }

    protected reduce(action: IAction<any>): IAppState {
        return this.state;
    }
}
