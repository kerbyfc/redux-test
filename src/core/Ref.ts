/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable} from './Injector';
import {Dispatcher} from './Dispatcher';

/**
 * Reference to state value
 */
@injectable()
export class Ref<TType> implements IRef<TType> {
    protected static injector: IInjector;

    public readonly path: string;
    public readonly initial: TType;

    constructor(value: TType, path: string) {
        this.initial = value;
        this.path = path;
    }

    get val(): TType {
        return _.get<TType>(Ref.injector.get<IDispatcher>(Dispatcher).getState(), this.path);
    }

    get key(): string {
        return _.last(this.path.split('.'));
    }
}
