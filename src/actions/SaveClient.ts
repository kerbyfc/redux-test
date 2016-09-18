/**
 * Local imports
 */
import {Action} from '../core/Action';
import {injectable, inject} from '../core/Injector';
import {SaveDataToServer} from '../core/Actor';

/**
 * Save client on server
 */
@injectable()
export class SaveClient extends Action<void> {

    constructor(
        @inject(SaveDataToServer) saveDataToServer: IActor
    ) {
        super();

        this.enqueue(
            saveDataToServer
        );
    }
}
