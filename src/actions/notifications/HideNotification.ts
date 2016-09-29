import {Action} from '../../core/Action';

export class HideNotification extends Action<string> {

    get notificationId(): string {
        return this.payload;
    }
}
