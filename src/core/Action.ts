/**
 * Local imports
 */
import {injectable, injector} from './Injector';
import {Dispatcher} from './Dispatcher';

@injectable()
export class Action<TPayload> implements IAction<TPayload> {

    /**
     * Static
     */

    static getPayload<TPayload>(action: IDispatcherAction): TPayload {
        return <TPayload>action.__payload;
    }

    static resolveType(): string {
        return this.name || this.toString().match(/function ([^\(]+)/)[1];
    }

    static get type(): string {
        return this.resolveType();
    }

    /**
     * Properties
     */

    protected actors: any[] = [];
    protected emitted = false;
    protected payload: TPayload = null;
    protected dispatcher: Dispatcher;

    constructor() {
        this.dispatcher = injector.get(Dispatcher);
    }

    /**
     * Interface
     */

    get type() {
        return Action.resolveType.call(this.constructor);
    }

    shouldBeEmitted(): boolean {
        return true;
    }

    enqueue(...actions: IActor[]) {

    }

    emit(payload?: TPayload): boolean {
        this.payload = payload || null;

        // TODO: check environment
        if (this.emitted) {
            throw new Error(`Action can be emitted only once (${this.type})`);
        }

        /**
         * The prefer way to detect actions in reducers is by 'is' prop,
         * as it gives an ability to use prototype chain
         *
         * @example in reducer
         *   if (action.is instanceof KeyboardAction) {
         *      const payload = KeyboardAction.getPayload<KeyboardActionPayload>();
         */
        const data = {
            is: this,
            type: this.type,
            class: this.constructor,
            __payload: this.payload,
        };

        /**
         * Each actor should be envoked once after reducing
         */
        if (this.actors.length) {
            let actor;
            while (actor = this.actors.shift()) {
                this.dispatcher.subscribeOnce(actor);
            }
        }

        if (this.shouldBeEmitted()) {
            // TODO: use middleware
            console.log(`[ACTION] ${data.type}`, data.__payload);
            this.dispatcher.dispatch(data);

            this.emitted = true;
        }
        return this.emitted;
    }

    /**
     * TODO: use metadata reflection api
     */
    protected createAction<ActionType>(actionClass): ActionType {
        return injector.get<ActionType>(actionClass);
    }
}
