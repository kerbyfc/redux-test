/**
 * Local imports
 */
import {injectable} from './Injector';

/**
 * Actor do some logic after action
 */
@injectable()
export abstract class Actor implements IActor {
    public abstract perform(action: IAction<any>, state: IActorState);
}
