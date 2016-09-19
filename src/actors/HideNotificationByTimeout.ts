import {Actor} from '../core/Actor';
import {injectable, inject} from '../core/Injector';
import {HideNotification} from '../actions/HideNotification';
import {ShowNotification} from '../actions/ShowNotification';

@injectable()
export class HideNotificationByTimeout extends Actor {

    protected defaultDelay: number = 3500;

    constructor(
        @inject(HideNotification) protected hideNotification: IAction<string>
    ) {
        super();
    }

    perform() {
        if (this.action instanceof ShowNotification) {
            const payload = ShowNotification.getPayload<INotification>(this.action);
            const delay = payload.delay || this.defaultDelay;

            setTimeout(() => {
                this.hideNotification.emit(payload.id);
            }, delay);
        }
    }
}
