/**
 * External imports
 */
import * as Redux from 'redux';
import * as R from 'ramda';
import Store = Redux.Store;

/**
 * Local imports
 */
import {injectable} from './Injector';
import {IState} from '../common/reducers/AppReducer';

// TODO: -> Dispatcher<IState> & .store<IState>
@injectable()
export class Dispatcher {

    protected acting: boolean = false;
    protected lastState: IState;

    // TODO: typings
    protected actors: any[] = [];
    protected singularActors: any[] = [];
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
                    actor(this.getState(), this.lastState, this);
                }
            }

            /**
             * Invoke actors
             */
            this.actors.forEach((actor) => actor(this.getState(), this.lastState, this));
            this.acting = false;
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

    // TODO: unsubscribing
    subscribe(actor) {
        this.actors.push(actor);
    };

    dispatch(data) {
        // TODO: think about:
        // implement queue to be able to
        // dispatch inside actors
        // (they may should take dispatcher in params)

        /*
            new ActionWithActor().emit(data)
             \                         _/
              Reducer.reduce(state, data)
              \            _____________/
                  actor(newState, dispatcher) { dispatcher.dispatch(); }
        */

        // TODO: actor should not be a pure function, it's inconvenient
        this.store.dispatch(data);
    };

    getState() {
        return this.store.getState();
    }
}
