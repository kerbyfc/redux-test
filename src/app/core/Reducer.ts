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
import {IRef} from '../common/state';


interface IReducerReleaseData<TState> {
    refs: TState;
    reduceFunction: IReduxReducer<TState>;
}

export interface IReducer<TState> {
    getInitialState?(): TState;
    reduce(state: TState, action: IAction<any>): TState;
    release(path: string);
}

export type TReducer<TState> = TState | IReducer<TState>;

interface IReducersMapObject {
    [key: string]: IReducer<any>;
}

interface IReduxReducersMapObject {
    [key: string]: IReduxReducer<any>;
}

@injectable()
export class Reducer<TState> implements IReducer<TState> {

    protected path: string = '';
    protected state: any;
    protected refs: TState;

    protected concatPath(current: string, next: string) {
        return current ? current + '.' + next : next;
    }

    protected getChildrenReducers(): [IReduxReducersMapObject, TState] {
        const _refs = {};
        const _reducers = <IReduxReducersMapObject>_.mapValues<TReducer<any>, IReduxReducer<any>>(
            this.combine(), (reducer: IReducer<any>, key: string) => {
                const {reduceFunction, refs} = <IReducerReleaseData<any>>reducer.release(this.concatPath(this.path, key));
                _refs[key] = refs;
                return reduceFunction;
            }
        );
        return [_reducers, <TState>_refs];
    }

    getInitialState(): TState {
        return null;
    }

    replaceRefs(refs: {}, target: {}, path: string = this.path): {} {
        return _.mapValues(target, (value, key) => {
            const refPath = this.concatPath(path, key);

            if (value instanceof Ref) {
                // TODO: refactor Reducers struct to remove slice
                // TODO: now refs inside refs are not supported
                refs[key] = value.setPath(refPath);
                return value.val;
            }

            /**
             * Go deeper
             */
            if (_.isObject(value)) {
                const nestedRefs = {};
                refs[key] = nestedRefs;
                return this.replaceRefs(nestedRefs, value, refPath);
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

    release(path: string = this.path): IReducerReleaseData<TState> {
        this.path = path;
        console.log('>>>>>>>>', this, 'path = ', this.path);

        const [children, refs] = this.getChildrenReducers();

        this.refs = refs;

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
                return <TState>this.replaceRefs(refs, initialState);
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
                console.log('[UPDATE]', this.path, result);
                return result;
            };

            return {
                refs,
                reduceFunction: this.reduce
            };

        } else {
            const childReducer = <IReduxReducer<TState>>combineReducers<TState>(children);

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

    combine(): TState {
        return null;
    }

    reduce(state: TState, action: IAction<any>): TState  {
        return state;
    }
}