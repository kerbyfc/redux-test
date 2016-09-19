/**
 * Local imports
 */
import {Action} from '../core/Action';
import {ShowNotification} from './ShowNotification';

/**
 * Indicate the client was successfully saved
 */
export class ShowClientSaved extends Action<void> {

    constructor() {
        super();

        // TODO: create actor via DI
        this.actors.push(this.showSuccessMessage.bind(this));
    }

    showSuccessMessage() {
        this.createAction<ShowNotification>(ShowNotification)
            .emit({
                text: 'Данные успешно сохранены',
                type: NotificationType.SUCCESS
            });
    }
}
