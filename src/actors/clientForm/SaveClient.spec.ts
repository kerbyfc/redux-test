import * as sinon from 'sinon';
import {IStore} from '~react-redux~redux';
import {SaveClientToServer} from './SaveClient';
import configureStore from '../../config/store';
import {ShowClientSaved} from '../../actions/clientForm/ShowClientSaved';
import {injector} from '../../config/providers';
import {Dispatcher} from '../../core/Dispatcher';

describe(SaveClientToServer.name, () => {
	const store: IStore<IAppState> = configureStore();

	it(`should perform new ${ShowClientSaved.name} action`, (next) => {
		const actor: SaveClientToServer = injector.get(SaveClientToServer);
		const dispatcher: IDispatcher = injector.get(Dispatcher);
		const dispatch = sinon.spy(dispatcher, 'dispatch');
		const state = store.getState();

		state.clientForm.loading = true;

		actor.perform(null, {
			current: store.getState()
		});

		setTimeout(() => {
			dispatch.should.have.been.calledWith(sinon.match.instanceOf(ShowClientSaved));
			next();
		}, 1500);
	});
});
