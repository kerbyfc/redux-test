/**
 * External imports
 */
import * as _ from 'lodash';
import Store = Redux.Store;

/**
 * Local imports
 */
import {injectable} from './Injector';
import {IState} from '../state';
import {IDispatcherAction} from './Action';

// TODO: -> Dispatcher<IState> & .store<IState>
@injectable()
export class Dispatcher {

    protected acting: boolean = false;
    protected lastState: IState;

    protected actors: any[] = [];
    protected singularActors: any[] = [];
    protected dispatchQueue: IDispatcherAction[] = [];
    protected store;

    constructor() {
        this.onStateUpdate = this.onStateUpdate.bind(this);
        this.subscribeOnce = this.subscribeOnce.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    /**
     * TODO: pass to actors callback to queue dispathing
     */
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
                    actor(this.getState(), this.lastState, this);
                }
            }

            /**
             * Invoke actors
             */
            this.actors.forEach((actor) => actor(this.getState(), this.lastState, this));

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

    attachStore(store) {
        this.store = store;
        this.store.subscribe(this.onStateUpdate);
    };

    subscribeOnce(actor) {
        this.singularActors.push(actor);
    };

    /**
     * @example
     *   dispather
     *      .subscribe(updateProgress)
     *      .until(state => !state.loading)
     */
    subscribe(actor): {until: (fn: (state: IState) => boolean) => void} {
        this.actors.push(actor);

        return {
            until: (fn: (state: IState) => boolean) => {
                if (fn(this.getState())) {
                    this.actors = _.without(this.actors, actor);
                }
            }
        };
    };

    dispatch(data: IDispatcherAction) {
        // TODO: think about:
        // implement queue to be able to
        // dispatch inside actors
        // (they may should take dispatcher in params)

        /*
            new ActionWithActor().emit(data)
                                      /
              Reducer.reduce(state, data): IState
                       ____________________/
                      /
               actor(newState, dispatcher) { dispatcher.dispatch(); }
        */

        if (this.acting) {
            this.dispatchQueue.push(data);
        } else {
            this.store.dispatch(data);
        }
    };

    getState() {
        return this.store.getState();
    }
}
