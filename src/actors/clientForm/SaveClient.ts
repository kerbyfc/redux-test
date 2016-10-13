/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {Actor} from '../../core/Actor';
import {ShowClientSaved} from '../../actions/clientForm/ShowClientSaved';

@injectable()
export class SaveClientToServer extends Actor {

	constructor(
		@inject(ShowClientSaved) private showClientSaved: IAction<void>
	) {
		super();
	}

	public perform(action, state) {
		if (state.current.clientForm.loading) {
			setTimeout(() => {
				this.showClientSaved.emit(null);
			}, 1000);
		}
	}
}
