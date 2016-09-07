/**
 * External imports
 */
import * as _ from 'lodash';
import {combineReducers} from 'redux';
import {IReducer as IReduxReducer} from '~react-redux~redux';

/**
 * Local imports
 */
import {IAction} from './Action';
import {injectable} from './Injector';

export interface IReducer<TState> {
    getInitialState?(): TState;
    reduce(state: TState, action: IAction): TState;
}

export interface IReducersMapObject {
    [key: string]: IReducer<any>;
}

export interface IReduxReducersMapObject {
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

    protected children: IReducersMapObject = {};
    protected state: any;

    protected combineInjectedReducers(reducers): void {
        _.each(reducers, (reducer) => {
            this.children[reducer.key] = reducer;
        });
    }

    protected getChildrenReducers(): IReduxReducersMapObject {
        return _.mapValues(this.children, (reducer: Reducer<any>) => {
            return reducer.release();
        });
    }

    getInitialState(): TState {
        return null;
    }

    release(): IReduxReducer<TState> {
        const children = this.getChildrenReducers();

        if (_.isEmpty(children)) {
            if (!_.hasIn(this, 'getInitialState')) {
                throw new Error(
                    `Reducer ${this.constructor.name} hasn't childs. Implement initialState method`
                );
            }
            const origin = this.reduce;

            // TODO:
            // Set the mutability/immutability functions
            // setToImmutableStateFunc((mutableState) => Immutable.fromJS(mutableState));
            // setToMutableStateFunc((immutableState) => immutableState.toJS());

            /**
             * No needs to call getInitialState in reducer
             */
            this.reduce = (state: TState, action: IAction): TState => {
                /**
                 * No needs to return unchanged state in reducer
                 */
                const result = origin.call(this, state || this.getInitialState(), action) || state || this.getInitialState();
                console.log('[UPDATE]', this.key, result); // TODO: remove prom prod, use middleware
                return result;
            };

            return this.reduce;

        } else {
            const childReducer = <IReduxReducer<TState>>combineReducers(children);

            /**
             * Wrap childReducer properties
             * TODO: doct & examples
             */
            return (state: TState, action: IAction): TState => {
                return this.reduce(childReducer(state, action), action);
            };
        }
    }

    reduce(state: TState, action: IAction): TState  {
        return state;
    }
}