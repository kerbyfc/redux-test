/**
 * External imports
 */
import * as _ from 'lodash';
import * as flat from 'flat';
import {injectable} from './Injector';

@injectable()
export class StateMap<TState> {

    map: TState = null;

    get empty(): boolean {
        return !this.map;
    }

    add(state): void {
        this.map = <TState>flat.unflatten(_.mapValues(flat.flatten(state), (value, key) => key));
    }
}