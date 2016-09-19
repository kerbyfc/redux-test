/**
 * Local imports
 */
import {Action} from '../../core/Action';
import {injectable, inject} from '../../core/Injector';
import {SaveClientToServer} from '../../actors/clientForm/SaveClient';

/**
 * Save client on server
 */
@injectable()
export class SaveClient extends Action<void> {

    constructor(
        @inject(SaveClientToServer) saveDataToServer: IActor
    ) {
        super();

        this.enqueue(
            saveDataToServer
        );
    }
}
