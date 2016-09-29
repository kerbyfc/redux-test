/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable, inject} from './Injector';
import {Dispatcher} from './Dispatcher';
import {DEV} from '../vars';

@injectable()
export abstract class Action<TPayload> {
    protected static injector: IInjector;

    protected static resolveType(): string {
        return 'Action:' + this.name || this.toString().match(/function ([^\(]+)/)[1];
    }

    static get type(): string {
        return this.resolveType();
    }

    static get symbol(): Symbol {
        return Symbol.for(this.type);
    }

    protected payloadData: TPayload;
    protected emitted: boolean = false;
    protected actors: IActor[] = [];

    protected get injector(): IInjector {
        return Action.injector;
    }

    protected get dispatcher(): IDispatcher {
        return this.injector.get<IDispatcher>(Dispatcher);
    }

    get type(): string {
        return Action.resolveType.call(this.constructor);
    }

    get symbol(): Symbol {
        return Symbol.for(this.type);
    }

    get payload(): TPayload {
        return this.payloadData;
    }

    public enqueue(...actors: IActor[]) {
        this.actors = this.actors.concat(_.map(actors, (actor: IActor) => {
            return actor.attach(this);
        }));
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
