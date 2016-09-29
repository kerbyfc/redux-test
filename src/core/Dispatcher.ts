/**
 * External imports
 */
import * as _ from 'lodash';
import Store = Redux.Store;

/**
 * Local imports
 */
import {injectable, singleton} from './Injector';
import {Action} from './Action';
import {autobind} from 'core-decorators';

/**
 * TODO: -> Dispatcher<IAppState> & .store<IAppState>
 */

@singleton
@injectable()
export class Dispatcher {
    protected acting: boolean = false;
    protected lastState: IAppState;

    protected actors: IActor[] = [];
    protected singularActors: IActor[] = [];
    protected dispatchQueue: Action<any>[] = [];
    protected action: IAction<any>;
    protected store;

    @autobind
    protected onStateUpdate() {
        if (!this.acting) {
            this.acting = true;

            if (this.singularActors.length) {
                let actor;
                /**
                 * Invoke singular actors (to be called once)
                 */
                while (actor = this.singularActors.shift()) {
                    // TODO: actor should not be a pure function, it's inconvenient
                    actor.perform(this.getState(), this.lastState);
                }
            }

            /**
             * Invoke actors
             */
            this.actors.forEach((actor) => actor.perform(this.getState(), this.lastState));

            /**
             * After all actors have been processed, it's time
             * to dispatch next action, that can be created inside actors
             */
            this.acting = false;
            if (this.dispatchQueue.length) {
                this.dispatch(this.dispatchQueue.shift());
            }
        }

        /**
         * Update last state after all actors invocations
         */
        this.lastState = this.getState();
    }

    public attachStore(store) {
        this.store = store;
        this.store.subscribe(this.onStateUpdate);
    };

    public subscribeOnce(actor) {
        this.singularActors.push(actor);
    };

    /**
     * @example
     *   dispather
     *      .subscribe(updateProgress)
     *      .until(state => !state.loading)
     */
    public subscribe(actor): {until: (fn: (state: IAppState) => boolean) => void} {
        this.actors.push(actor);

        return {
            until: (fn: (state: IAppState) => boolean) => {
                if (fn(this.getState())) {
                    this.actors = _.without(this.actors, actor);
                }
            }
        };
    };

    public dispatch(action: Action<any>) {
        if (this.acting) {
            this.dispatchQueue.push(action);
        } else {
            this.action = action;

            this.store.dispatch({
                type: action.type,
                payload: action.payload
            });
        }
    };

    public getState(): IAppState {
        return this.store.getState();
    }
}
