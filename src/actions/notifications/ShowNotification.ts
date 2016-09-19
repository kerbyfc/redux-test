/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Action} from '../../core/Action';
import {injectable, inject} from '../../core/Injector';
import {HideNotificationByTimeout} from '../../actors/notifications/HideNotificationByTimeout';

/**
 * Show text notification in top right corner of view port
 */
@injectable()
export class ShowNotification extends Action<INotification> {

    constructor(
        @inject(HideNotificationByTimeout) hideNotificationByTimeout
    ) {
        super();

        this.enqueue(
            hideNotificationByTimeout
        );
    }

    emit(payload: INotification) {
        payload.id = _.uniqueId('notification');
        return super.emit(payload);
    }
}
