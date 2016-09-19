/**
 * Local imports
 */
import {Action} from '../../core/Action';
import {injectable, inject} from '../../core/Injector';
import {NotifyDataIsSaved} from '../../actors/notifications/NotifyDataIsSaved';

/**
 * Indicate the client was successfully saved
 */
@injectable()
export class ShowClientSaved extends Action<void> {

    constructor(
        @inject(NotifyDataIsSaved) notifyDataIsSaved: IActor
    ) {
        super();

        this.enqueue(
            notifyDataIsSaved
        )
    }
}
