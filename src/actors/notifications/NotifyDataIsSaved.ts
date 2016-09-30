/**
 * Local imports
 */
import {Actor} from '../../core/Actor';
import {inject, injectable} from '../../core/Injector';
import {NotificationType} from '../../config/vars';
import {ShowNotification, IShowNotificationPayload} from '../../actions/notifications/ShowNotification';

@injectable()
export class NotifyDataIsSaved extends Actor {

    constructor(
        @inject(ShowNotification) private showNotification: IAction<IShowNotificationPayload>
    ) {
        super();
    }

    public perform() {
        this.showNotification.emit({
            text: 'Данные успешно сохранены',
            type: NotificationType.SUCCESS
        });
    }
}
