/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable, inject} from './Injector';
import {Dispatcher} from './Dispatcher';

/**
 * Reference to state value
 */
@injectable()
export class Ref<TType> implements IRef<TType> {

    protected _path: string;

    constructor(
        @inject(Dispatcher) protected dispatcher: Dispatcher
    ) {}

    get val(): TType {
        return <TType>_.get(this.dispatcher.getState(), this.path);
    }

    get key(): string {
        return _.last(this._path.split('.'));
    }

    get path(): string {
        return this._path;
    }

    link(path: string): Ref<TType> {
        if (this._path) {
            throw `State reference can be linked only once (${this._path})`;
        }
        this._path = path;
        return this;
    }
}
