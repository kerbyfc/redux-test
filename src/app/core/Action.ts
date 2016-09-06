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

    static dispatcher: Dispatcher;

    constructor(
        protected payload: TActionPayload
    ) {
        if (!Action.dispatcher) {
            Action.dispatcher = injector.get(Dispatcher);
        }
        this.type = Action.resolveType.call(this.constructor);
    }

    public type: string;

    protected shouldBeEmitted(): boolean {
        return true;
    }

    emit() {
        const data = {
            is: this,
            payload: this.payload,
            type: this.type
        };

        if (this.shouldBeEmitted()) {
            console.log(`[ACTION] ${data.type}`, data.payload);
            return Action.dispatcher.dispatch(data);
        }
    }
}