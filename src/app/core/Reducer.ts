/**
 * External imports
 */
import * as _ from 'lodash';
import * as flat from 'flat';
import {combineReducers} from 'redux';
import {IReducer as IReduxReducer} from '~react-redux~redux';

/**
 * Local imports
 */
import {IAction} from './Action';
import {injectable} from './Injector';
import {Ref} from './Ref';


interface IReducerReleaseData<TState> {
    refs: TState;
    reduceFunction: IReduxReducer<TState>;
}

export interface IReducer<TState> {
    getInitialState?(): TState;
    reduce(state: TState, action: IAction<any>): TState;
    release(path: string[]);
}

interface IReducersMapObject {
    [key: string]: IReducer<any>;
}

interface IReduxReducersMapObject {
    [key: string]: IReduxReducer<any>;
}

@injectable()
export class Reducer<TState> implements IReducer<TState> {

    static key: string;

    get key() {
        return this.constructor['key'];
    }

    constructor(...reducers: IReducer<any>[]) {
        if (!this.constructor['key']) {
            /**
             * Key should be specified, as it should be class name independed
             */
            throw new Error(`Reducer ${this.constructor.name} hasn't key`);
        }
        this.combineInjectedReducers(reducers);
    }

    protected _path: string[];

    get path(): string {
        return this._path.slice(1).join('.');
    }

    protected children: IReducersMapObject = {};
    protected state: any;
    protected refs: TState;

    protected combineInjectedReducers(reducers): void {
        _.each(reducers, (reducer) => {
            this.children[reducer.key] = reducer;
        });
    }

    protected getChildrenReducers(path: string[]): [IReduxReducersMapObject, TState] {
        const _refs = {};
        const _reducers = _.mapValues(
            this.children, (reducer: Reducer<any>, key: string) => {
                const {reduceFunction, refs} = reducer.release(path);
                _refs[key] = refs;
                return reduceFunction;
            }
        );
        return [_reducers, <TState>_refs];
    }

    getInitialState(): TState {
        return null;
    }

    replaceRefs(refs: {}, target: {}, path: string[]): {} {
        return _.mapValues(target, (value, key) => {

            if (value instanceof Ref) {
                // TODO: refactor Reducers struct to remove slice
                // TODO: now refs inside refs are not supported
                refs[key] = value.setPath(path.slice(1).join('.') + '.' + key);
                return value.val;
            }

            /**
             * Go deeper
             */
            if (_.isObject(value)) {
                const nestedRefs = {};
                refs[key] = nestedRefs;
                return this.replaceRefs(nestedRefs, value, path.concat(key));
            }

            return value;
        }, []);
    }

    getRelativeRefPath(ref: IRef<any>): string {
        return ref.path.slice(this.path.length + 1);
    }

    hasRef(ref: IRef<any> | string): boolean {
        if (typeof ref === 'string') {
            return _.has(this.refs, ref);
        } else {
            return _.has(this.refs, this.getRelativeRefPath(ref));
        }
    }

    release(path: string[] = []): IReducerReleaseData<TState> {
        path.push(this.key);

        const [children, refs] = this.getChildrenReducers(path);

        this.refs = refs;
        this._path = path;

        if (_.isEmpty(children)) {
            if (!_.hasIn(this, 'getInitialState')) {
                throw new Error(
                    `Reducer ${this.constructor.name} hasn't childs. Implement initialState method`
                );
            }

            const origin = {
                reduce: this.reduce,
                getInitialState: this.getInitialState
            };

            this.getInitialState = (): TState => {
                const initialState = origin.getInitialState();
                return <TState>this.replaceRefs(refs, initialState, path);
            };

            // TODO:
            // Set the mutability/immutability functions
            // setToImmutableStateFunc((mutableState) => Immutable.fromJS(mutableState));
            // setToMutableStateFunc((immutableState) => immutableState.toJS());

            /**
             * No needs to call getInitialState in reducer
             */
            this.reduce = (state: TState, action: IAction<any>): TState => {
                /**
                 * No needs to return unchanged state in reducer
                 */
                let result = origin.reduce.call(this, state || this.getInitialState(), action) || state || this.getInitialState();

                // TODO: remove prom prod, use middleware
                console.log('[UPDATE]', this.key, result);
                return result;
            };

            return {
                refs,
                reduceFunction: this.reduce
            };

        } else {
            const childReducer = <IReduxReducer<TState>>combineReducers(children);

            /**
             * Wrap childReducer properties
             * TODO: docs & examples
             */
            return {
                refs,
                reduceFunction: (state: TState, action: IAction<any>): TState => {
                    return this.reduce(childReducer(state, action), action);
                }
            };
        }
    }

    reduce(state: TState, action: IAction<any>): TState  {
        return state;
    }
}