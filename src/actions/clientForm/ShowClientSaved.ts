/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {NotifyDataIsSaved} from '../../actors/notifications/NotifyDataIsSaved';
import {Action} from '../../core/Action';

/**
 * Indicate the client was successfully saved
 */
@injectable()
export class ShowClientSaved extends Action<any> {

    constructor(
        @inject(NotifyDataIsSaved) notifyDataIsSaved: IActor,
    ) {
        super();
        // TODO
        // this.enqueue(
        //     notifyDataIsSaved
        // )
    }
}
