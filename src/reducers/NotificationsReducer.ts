/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Reducer} from '../core/Reducer';
import {Action} from '../core/Action';
import {INotification, ShowNotification, HideNotificationByTimeOut} from '../actions/ShowNotification';

export class NotificationsReducer extends Reducer<INotification> {

    reduce(state, action) {
        switch(action.class) {
            case ShowNotification:
                return state.concat([ShowNotification.getPayload(action)]);

            case HideNotificationByTimeOut:
                return _.filter(state, (notification: INotification) => {
                    return notification.id !== HideNotificationByTimeOut.getPayload(action);
                });
        }
        return state;
    }
}
