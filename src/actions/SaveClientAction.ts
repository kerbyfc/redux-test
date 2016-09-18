import {Action} from '../core/Action';
import {IState} from '../state';
import {ShowNotification} from './ShowNotification';
import {NotificationType} from '../vars';

export class ClientDataSavedAction extends Action<void> {

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

export class SaveClientAction extends Action<void> {

    constructor() {
        super();

        // TODO: create actor via DI
        this.actors.push(this.saveDataToServer.bind(this));
    }

    saveDataToServer(state: IState) {
        if (state.clientForm.loading) {
            // dummy server call
            setTimeout(() => {
                this.createAction<ClientDataSavedAction>(ClientDataSavedAction).emit(
                    // here should be server response data
                );
            }, 1000);
        }
    }
}
