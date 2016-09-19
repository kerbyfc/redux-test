/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {Actor} from '../../core/Actor';
import {ShowClientSaved} from '../../actions/clientForm/ShowClientSaved';

@injectable()
export class SaveClientToServer extends Actor {

    constructor(
        @inject(ShowClientSaved) protected showClientSaved: IAction<void>
    ) {
        super();
    }

    perform(state: IAppState) {
        if (state.clientForm.loading) {
            setTimeout(() => {
                this.showClientSaved.emit(null);
            }, 1000);
        }
    }
}
