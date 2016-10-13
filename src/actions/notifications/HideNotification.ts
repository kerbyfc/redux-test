import {Action} from '../../core/Action';
import {injectable} from '../../core/Injector';

@injectable()
export class HideNotification extends Action<string> {

	get notificationId(): string {
		return this.payload;
	}
}
