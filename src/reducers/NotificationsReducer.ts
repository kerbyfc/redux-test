/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Reducer} from '../core/Reducer';
import {ShowNotification, HideNotificationByTimeOut} from '../actions/ShowNotification';
import {INotification} from '../interfaces/INotification';

/**
 * Handle actions, that affects current visible notifications
 */
export class NotificationsReducer extends Reducer<INotification[]> {

    reduce(state, action) {
        switch(action.class) {
            case ShowNotification:
                return state.concat([ShowNotification.getPayload(action)]);

            case HideNotificationByTimeOut:
                // Hide action by it's id
                return _.filter(state, (notification: INotification) => {
                    return notification.id !== HideNotificationByTimeOut.getPayload(action);
                });
        }
        return state;
    }
}
