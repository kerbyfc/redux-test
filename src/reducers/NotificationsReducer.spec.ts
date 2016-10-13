/**
 * External imports
 */
import {IStore} from '~react-router-redux~redux';

/**
 * Local imports
 */
import configureStore from '../config/store';
import {HideNotification} from '../actions/notifications/HideNotification';
import {injector} from '../config/providers';
import {NotificationType} from '../config/vars';
import {ShowNotification} from '../actions/notifications/ShowNotification';

describe('NotificationReducer', () => {

	const store: IStore<IAppState> = configureStore();
	const addNotificationArgs = {
		text: 'success notification',
		type: NotificationType.SUCCESS,
		delay: 5
	};

	let firstNotificationId: string;

	it(`should add notification on ${ShowNotification.name} action`, () => {
		const action: ShowNotification = injector.get(ShowNotification);
		action.emit(addNotificationArgs);

		const state = store.getState();
		firstNotificationId = (state.notifications[0] as INotification).id;

		state.notifications.length.should.eq(1);
		state.notifications[0].should.contain(addNotificationArgs);
	});

	it(`should remove notification on ${HideNotification.name} action`, () => {
		const action: HideNotification = injector.get(HideNotification);
		action.emit(firstNotificationId);
		store.getState().notifications.length.should.eq(0);
	});
});
