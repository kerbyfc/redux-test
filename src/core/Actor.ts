/**
 * Local imports
 */
import {ShowClientSaved} from '../actions/ShowClientSaved';
import {injectable, inject} from './Injector';

/**
 * Actor do some logic after action
 */
export abstract class Actor implements IActor {

    protected action: IDispatcherAction;

    attach(action: IDispatcherAction) {
        if (this.action) {
            throw new Error(`Action may be attached once (${this.constructor.name})`);
        }
        this.action = action;
    }

    abstract apply(state: IAppState);
}

@injectable()
export class SaveDataToServer extends Actor {

    constructor(
        @inject(ShowClientSaved) protected showClientSaved: IAction<void>
    ) {
        super();
    }

    apply(state: IAppState) {
        if (state.clientForm.loading) {
            setTimeout(() => {
                this.showClientSaved.emit(null);
            }, 1000);
        }
    }
}
