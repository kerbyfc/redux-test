/**
 * Local imports
 */
import {injectable} from './Injector';
import {Dispatcher} from './Dispatcher';
import {DEV} from '../config/vars';

@injectable()
export abstract class Action<TPayload> {
	private static injector: IInjector;

	private static resolveType(): string {
		return 'Action:' + (this as Function).name || (this as Function).toString().match(/function ([^\(]+)/)[1];
	}

	static get type(): string {
		return this.resolveType();
	}

	private payloadData: TPayload;
	private emitted: boolean = false;
	private actors: IActor[] = [];

	private get injector(): IInjector {
		return Action.injector;
	}

	private get dispatcher(): IDispatcher {
		return this.injector.get<IDispatcher>(Dispatcher);
	}

	get type(): string {
		return Action.resolveType.call(this.constructor);
	}

	get payload(): TPayload {
		return this.payloadData;
	}

	public enqueue(...actors: IActor[]) {
		this.actors = this.actors.concat(actors);
	}

	public emit(payload?: TPayload): boolean {
		this.payloadData = payload;

		if (process.env === DEV) {
			throw new Error(`Action can be emitted only once (${this.type})`);
		}

		/**
		 * Each actor should be invoked once after reducing
		 */
		if (this.actors.length) {
			let actor;
			while (actor = this.actors.shift()) {
				this.dispatcher.subscribeOnce(actor);
			}
		}

		this.dispatcher.dispatch(this);
		this.emitted = true;

		return this.emitted;
	}
}
