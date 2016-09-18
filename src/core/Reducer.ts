/**
 * External imports
 */
import * as _ from 'lodash';
import {combineReducers} from 'redux';
import {IReducer as IReduxReducer} from '~react-router-redux~redux';

/**
 * Local imports
 */
import {IAction, IDispatcherAction} from './Action';
import {injectable} from './Injector';
import {IRef} from './Ref';
import {initialState} from '../state';


export interface IReducer<TState> {
    getInitialState?(): TState;
    reduce(state: TState, action: IDispatcherAction): TState;
    release(path: string);
}

export type TReducer<TState> = TState | IReducer<TState>;

interface IReduxReducersMapObject {
    [key: string]: IReduxReducer<any>;
}


@injectable()
export class Reducer<TState> implements IReducer<TState> {

    protected path: string = '';
    protected refs: any; // TODO

    protected concatPath(current: string, next: string) {
        return current ? current + '.' + next : next;
    }

    protected getChildrenReducers(): IReduxReducersMapObject {
        return <IReduxReducersMapObject>_.mapValues<TReducer<any>, IReduxReducer<any>>(
            this.combine(), (reducer: IReducer<any>, key: string) => {
                return reducer.release(this.concatPath(this.path, key));
            }
        );
    }

    getInitialState(): TState {
        return <TState>_.cloneDeep(_.get(initialState, this.path));
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

    release(path: string = this.path): IReduxReducersMapObject | IReduxReducer<TState> {
        this.path = path;

        const children = this.getChildrenReducers();

        if (_.isEmpty(children)) {
            if (!_.hasIn(this, 'getInitialState')) {
                throw new Error(
                    `Reducer ${this.constructor.name} hasn't childs. Implement initialState method`
                );
            }

            const origin = {
                reduce: this.reduce
            };

            // TODO:
            // Set the mutability/immutability functions
            // setToImmutableStateFunc((mutableState) => Immutable.fromJS(mutableState));
            // setToMutableStateFunc((immutableState) => immutableState.toJS());

            /**
             * No needs to call getInitialState in reducer
             */
            this.reduce = (state: TState, action: IDispatcherAction): TState => {
                /**
                 * No needs to return unchanged state in reducer
                 */
                let result = origin.reduce.call(this, state || this.getInitialState(), action) || state || this.getInitialState();

                // TODO: remove prom prod, use middleware
                console.log('[UPDATE]', this.path, result);
                return result;
            };

            return this.reduce;

        } else {

            // is root reducer
            if (this.path === '') {
                return children;
            } else {
                const childReducer = <IReduxReducer<TState>>combineReducers<TState>(children);

              /**
               * Wrap childReducer properties
               * TODO: docs & examples
               */
              return (state: TState, action: IDispatcherAction): TState => {
                  return this.reduce(childReducer(state, action), action);
              };
            }
        }
    }

    combine(): any { // TODO
        return null;
    }

    reduce(state: TState, action: IDispatcherAction): TState  {
        return state;
    }
}
