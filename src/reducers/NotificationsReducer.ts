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

/**
 * Handle actions, that affects current visible notifications
 */
export class NotificationsReducer extends Reducer<INotification[]> {

    public reduce(action) {
        if (action instanceof ShowNotification) {
            return this.state.concat([action.payload]);
        }

        if (action instanceof HideNotification) {
            return _.filter(this.state, (notification: INotification) => {
                return notification.id !== action.payload.id;
            });
        }
    }
}
