/**
 * Local imports
 */
import {Actor} from '../../core/Actor';
import {inject, injectable} from '../../core/Injector';
import {ShowNotification} from '../../actions/notifications/ShowNotification';
import {NotificationType} from '../../vars';

@injectable()
export class NotifyDataIsSaved extends Actor {

    constructor(
        @inject(ShowNotification) protected showNotification: IAction<INotification>
    ) {
        super();
    }

    perform() {
        this.showNotification.emit({
            text: 'Данные успешно сохранены',
            type: NotificationType.SUCCESS
        });
    }
}
