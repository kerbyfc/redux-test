/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Reducer} from '../core/Reducer';
import {ShowNotification} from '../actions/notifications/ShowNotification';
import {HideNotification} from '../actions/notifications/HideNotification';
import {injectable} from '../core/Injector';

/**
 * Handle actions, that affects current visible notifications
 */
@injectable()
export class NotificationsReducer extends Reducer<INotification[]> {

    public reduce(action) {
        if (action instanceof ShowNotification) {
            this.state.push(action.notification);
        }

        if (action instanceof HideNotification) {
            this.state = _.filter(this.state, (notification: INotification) => {
                return notification.id !== action.notificationId;
            });
        }
    }
}
