/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {HideNotificationByTimeout} from '../../actors/notifications/HideNotificationByTimeout';
import {Action} from '../../core/Action';

export interface IShowNotificationPayload {
	text: string;
	type: number;
	delay?: number;
}

/**
 * Show text notification in top right corner of view port
 */
@injectable()
export class ShowNotification extends Action<IShowNotificationPayload> {

	private defaultDelay: number = 3000;

	/**
	 * Unique identifier
	 */
	public readonly notificationId: string;

	constructor(
		@inject(HideNotificationByTimeout) hideNotificationByTimeout
	) {
		super();
		this.notificationId = _.uniqueId('noty');

		this.enqueue(
			hideNotificationByTimeout
		);
	}

	get delay(): number {
		return this.payload.delay || this.defaultDelay;
	}

	get notification(): INotification {
		return {
			id: this.notificationId,
			text: this.payload.text,
			type: this.payload.type,
			delay: this.delay
		};
	}

}
