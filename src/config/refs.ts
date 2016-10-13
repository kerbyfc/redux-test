import {Ref} from '../core/Ref';

export const refs: IAppStateRef = {
	clientForm: {
		loading: new Ref(false, 'clientForm.loading'),
		message: new Ref('', 'clientForm.message'),
		errors: {
			email: new Ref('', 'clientForm.errors.email')
		},
		data: {
			surname: new Ref('', 'clientForm.data.surname'),
			name: new Ref('', 'clientForm.data.name'),
			middlename: new Ref('', 'clientForm.data.middlename'),
			email: new Ref('', 'clientForm.data.email'),
			birthday: new Ref('MM.DD.YYYY', 'clientForm.data.birthday'),
			passport: new Ref('____ ______', 'clientForm.data.passport'),
			car: {
				exists: new Ref(false, 'clientForm.data.car.exists'),
				brand: new Ref('', 'clientForm.data.car.brand'),
				model: new Ref('', 'clientForm.data.car.model')
			}
		}
	},
	notifications: new Ref([], 'notifications')
};
