/**
 * Local imports
 */
import {injectable, inject, injector} from './Injector';
import {Dispatcher} from './Dispatcher';

export interface IAction {
    type: string;
    emit(): void;
}

@injectable()
export class Action<TActionPayload> implements IAction {

    static resolveType(): string {
        return this.name || this.toString().match(/function ([^\(]+)/)[1];
    }

    static get type(): string {
        return this.resolveType();
    }

    protected dispatcher: Dispatcher;

    constructor(
        protected payload: TActionPayload
    ) {
        this.dispatcher = injector.get(Dispatcher);
        this.type = Action.resolveType.call(this.constructor);
    }

    public type: string;

    protected shouldBeEmitted(): boolean {
        return true;
    }

    protected emitted = false;

    // TODO: docs
    protected actors: any[] = [];

    emit(actor?): boolean {
        if (this.emitted) {
            // TODO: check environment
            throw new Error(`Action can be emitted only once (${this.type})`);
        }

        /**
         * The prefer way to detect actions in reducers is by 'is' prop,
         * as it gives an ability to use prototype chain
         *
         * @example in reducer
         *   if (action.is instanceof KeyboardAction) { ...
         */
        const data = {
            is: this,
            payload: this.payload,
            type: this.type
        };

        if (actor) {
            this.actors.push(actor);
        }

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
            console.log(`[ACTION] ${data.type}`, data.payload);
            this.dispatcher.dispatch(data);

            this.emitted = true;
        }
        return this.emitted;
    }
}