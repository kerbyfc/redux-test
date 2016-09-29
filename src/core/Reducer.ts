/**
 * External imports
 */
import * as _ from 'lodash';
import {combineReducers} from 'redux';
import {IReducer as IReduxReducer} from '~react-router-redux~redux';

/**
 * Local imports
 */
import {injectable} from './Injector';
import {initialState, stateRefs} from '../state';
import {Dispatcher} from './Dispatcher';

interface IReduxReducersMapObject {
    [key: string]: IReduxReducer<any>;
}

@injectable()
export abstract class Reducer<TState> implements IReducer<TState> {
    protected static injector: IInjector;

    protected path: string = '';
    protected state: TState;

    protected get refs() {
        return _.get(stateRefs, this.path);
    }

    protected getRelativeRefPath(ref: IRef<any>): string {
        return ref.path.slice(this.path.length + 1);
    }

    protected concatPath(current: string, next: string) {
        return current ? current + '.' + next : next;
    }

    protected getChildrenReducers(): IReduxReducersMapObject {
        return <IReduxReducersMapObject> _.mapValues<IReducer<any>, IReduxReducer<any>>(
            this.combine(), (reducer: IReducer<any>, key: string) => {
                return reducer.release(this.concatPath(this.path, key));
            }
        );
    }

    protected get injector(): IInjector {
        return Reducer.injector;
    }

    protected get dispatcher(): IDispatcher {
        return this.injector.get<IDispatcher>(Dispatcher);
    }

    protected get initialState(): TState {
        return _.cloneDeep<TState>(_.get<TState>(initialState, this.path));
    }

    protected has(ref: IRef<any>): boolean {
        return _.has(this.refs, this.getRelativeRefPath(ref));
    }

    protected invoke(state: TState, plainObject: IDispatchObject): TState {
        this.state = _.cloneDeep(state || this.initialState);
        this.reduce(this.getAction(plainObject));
        return this.state;
    }

    protected getAction(plainObject: IDispatchObject): IAction<any> {
        const type = Symbol.for(plainObject.type);
        return this.injector.isBound(type) ? this.dispatcher.action : plainObject;
    }

    protected abstract reduce(action: IAction<any>);

    public release(path: string = this.path): IReduxReducersMapObject | IReduxReducer<TState> {
        this.path = path;

        const children = this.getChildrenReducers();

        if (_.isEmpty(children)) {
            return this.invoke.bind(this);

        } else {

            // is root reducer
            if (this.path === '') {
                return children;
            } else {
                const childReducer = <IReduxReducer<TState>> combineReducers<TState>(children);

                /**
                 * Wrap childReducer properties
                 * TODO: docs & examples
                 */
                return (state: TState, plainObject: IDispatchObject): TState => {
                    return this.invoke(childReducer(state, plainObject), plainObject);
                };
            }
        }
    }

    public combine(): any {
        return null;
    }
}
