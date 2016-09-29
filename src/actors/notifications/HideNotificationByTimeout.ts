import {Actor} from '../../core/Actor';
import {injectable, inject} from '../../core/Injector';
import {HideNotification} from '../../actions/notifications/HideNotification';
import {ShowNotification} from '../../actions/notifications/ShowNotification';

@injectable()
export class HideNotificationByTimeout extends Actor {

    constructor(
        @inject(HideNotification) private hideNotification: IAction<string>
    ) {
        super();
    }

    public perform(action, state): void {
        if (action instanceof ShowNotification) {
            setTimeout(() => {
                this.hideNotification.emit(action.notificationId);
            }, action.delay);
        }
    }
}
