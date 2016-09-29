/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {HideNotificationByTimeout} from '../../actors/notifications/HideNotificationByTimeout';
import {Action} from '../../core/Action';

/**
 * Show text notification in top right corner of view port
 */
@injectable()
export class ShowNotification extends Action<INotification> {

    /**
     * Unique identifier
     */
    public readonly id: string;

    constructor(
        @inject(HideNotificationByTimeout) hideNotificationByTimeout
    ) {
        super();
        this.id = _.uniqueId('noty');

        this.enqueue(
            hideNotificationByTimeout
        );
    }
}
