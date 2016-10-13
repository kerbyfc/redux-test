/**
 * External imports
 */
import * as _ from 'lodash';
import Store = Redux.Store;

/**
 * Local imports
 */
import {injectable, singleton} from './Injector';
import {Action} from './Action';
import {autobind} from 'core-decorators';

@singleton
@injectable()

export class Dispatcher {
	private acting: boolean = false;
	private lastState: IAppState;

	private actors: IActor[] = [];
	private singularActors: IActor[] = [];
	private dispatchQueue: Action<any>[] = [];
	private action: IAction<any>;
	private store: Store<IAppState>;

	@autobind
	private onStateUpdate() {
		if (!this.acting) {
			const state = {
				current: this.getState(),
				previous: this.lastState
			};

			this.acting = true;

			if (this.singularActors.length) {
				let actor;
				/**
				 * Invoke singular actors (to be called once)
				 */
				while (actor = this.singularActors.shift()) {
					actor.perform(this.action, state);
				}
			}

			/**
			 * Invoke actors
			 */
			this.actors.forEach((actor) => {
				actor.perform(this.action, state);
			});

			/**
			 * After all actors have been processed, it's time
			 * to dispatch next action, that can be created inside actors
			 */
			this.acting = false;
			if (this.dispatchQueue.length) {
				this.dispatch(this.dispatchQueue.shift());
			}
		}

		/**
		 * Update last state after all actors invocations
		 */
		this.lastState = this.getState();
	}

	public attachStore(store) {
		this.store = store;
		this.store.subscribe(this.onStateUpdate);
	};

	public subscribeOnce(actor) {
		this.singularActors.push(actor);
	};

	/**
	 * @example
	 *   dispather
	 *     .subscribe(updateProgress)
	 *     .until(state => !state.loading)
	 */
	public subscribe(actor): {until: (fn: (state: IAppState) => boolean) => void} {
		this.actors.push(actor);

		return {
			until: (fn: (state: IAppState) => boolean) => {
				if (fn(this.getState())) {
					this.actors = _.without(this.actors, actor);
				}
			}
		};
	};

	public dispatch(action: Action<any>) {
		if (this.acting) {
			this.dispatchQueue.push(action);
		} else {
			this.action = action;

			this.store.dispatch({
				type: action.type,
				payload: action.payload,
				action: action
			});

			this.action = null;
		}
	};

	public getState(): IAppState {
		return this.store.getState();
	}
}
