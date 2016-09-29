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

interface IReduxReducersMapObject {
    [key: string]: IReduxReducer<any>;
}

@injectable()
export abstract class Reducer<TState> implements IReducer<TState> {
    protected path: string = '';

    protected state: TState;

    protected get refs() {
        return _.get(stateRefs, this.path);
    }

    protected get initialState(): TState {
        return _.cloneDeep<TState>(_.get<TState>(initialState, this.path));
    }

    private concatPath(current: string, next: string) {
        return current ? current + '.' + next : next;
    }

    private getReducersToCombine(): IReduxReducersMapObject {
        return <IReduxReducersMapObject> _.mapValues<IReducer<any>, IReduxReducer<any>>(
            this.combine(), (reducer: IReducer<any>, key: string) => {
                return reducer.release(this.concatPath(this.path, key));
            }
        );
    }

    private invoke(state: TState, plainObject: IDispatchObject): TState {
        this.state = _.cloneDeep(state || this.initialState);
        this.reduce(plainObject.action);
        return this.state;
    }

    protected getRelativeRefPath(ref: IRef<any>): string {
        return ref.path.slice(this.path.length + 1);
    }

    protected has(ref: IRef<any>): boolean {
        return _.has(this.refs, this.getRelativeRefPath(ref));
    }

    /**
     * TODO: see ClientFormReducer.refs todo
     */
    protected combine(): {[name: string]: IReducer<any>} {
        return null;
    }

    protected abstract reduce(action: IAction<any>);

    public release(path: string = this.path): IReduxReducersMapObject | IReduxReducer<TState> {
        this.path = path;

        const children = this.getReducersToCombine();

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
}
