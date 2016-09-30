/**
 * Local imports
 */
import {injector} from '../config/providers';
import {ShowNotification} from '../actions/notifications/ShowNotification';
import configureStore from '../config/store';
import {IStore} from '../interfaces/IStore';
import {NotificationType} from '../config/vars';

describe('NotificationReducer', () => {

    let store: IStore<IAppState>;

    beforeEach(() => {
        store = configureStore();
    });

    it('should work', () => {
        const action: ShowNotification = injector.get(ShowNotification);
        const message = 'success message';
        action.emit({
            text: message,
            type: NotificationType.SUCCESS
        });
        store.getState().notifications[0].should.haveOwnProperty('text').which.is(message);
    });
});
