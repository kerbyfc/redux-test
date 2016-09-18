/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Action} from '../core/Action';
import {INotification} from '../interfaces/INotification';

/**
 * Interfaces
 */
export class HideNotificationByTimeOut extends Action<string> {}

/**
 * Show text notification in top right corner of view port
 */
export class ShowNotification extends Action<INotification> {

    protected defaultDelay: number = 3500;

    constructor() {
        super();

        // TODO: create actor via DI
        this.actors.push(this.hideByTimeout.bind(this));
    }

    hideByTimeout() {
        setTimeout(() => {
            this.createAction<HideNotificationByTimeOut>(HideNotificationByTimeOut)
                .emit(this.payload.id);
        }, this.payload.delay || this.defaultDelay);
    }

    emit(payload: INotification) {
        payload.id = _.uniqueId('notification');
        return super.emit(payload);
    }
}
