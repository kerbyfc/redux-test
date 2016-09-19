/**
 * Local imports
 */
import {injectable} from './Injector';

/**
 * Actor do some logic after action
 */
@injectable()
export abstract class Actor implements IActor {

    protected action: IAction<any>;

    attach(action: IAction<any>): Actor {
        if (this.action) {
            throw new Error(`Action may be attached once (${this.constructor.name})`);
        }
        this.action = action;
        return this;
    }

    abstract perform(state: IAppState);
}
