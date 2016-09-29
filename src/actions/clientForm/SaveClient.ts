/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {SaveClientToServer} from '../../actors/clientForm/SaveClient';
import {Action} from '../../core/Action';
/**
 * Save client on server
 */
@injectable()
export class SaveClient extends Action<any> {

    constructor(
        @inject(SaveClientToServer) saveDataToServer: IActor
    ) {
        super();

        this.enqueue(
            saveDataToServer
        );
    }
}
