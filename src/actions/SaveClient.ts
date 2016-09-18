/**
 * Local imports
 */
import {Action} from '../core/Action';
import {IState} from '../state';
import {ShowClientSaved} from './ShowClientSaved';

/**
 * Save client on server
 */
export class SaveClient extends Action<void> {

    constructor() {
        super();

        // TODO: create actor via DI
        this.actors.push(this.saveDataToServer.bind(this));
    }

    saveDataToServer(state: IState) {
        if (state.clientForm.loading) {
            // dummy server call
            setTimeout(() => {
                this.createAction<ShowClientSaved>(ShowClientSaved).emit(
                    // here should be server response data
                );
            }, 1000);
        }
    }
}
