/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Action} from '../../core/Action';

export interface IInputChangeActionPayload {
    event: Event;
    selection: number[];

    /**
     * Should be computed by action
     */
    name?: string;
    value?: string;
    input?: HTMLInputElement;
}

export class InputChangeAction extends Action<IInputChangeActionPayload> {
    constructor(event: Event, selection: number[]) {
        super({event, selection});

        const input: HTMLInputElement = <HTMLInputElement>event.target;

        _.assign(this.payload, {
            input: input,
            value: input.value,
            name: input.getAttribute('name')
        });

        this.actors.push((state) => {
            const value = _.get<string>(state, this.payload.name);

            if (value !== this.payload.value) {
                const [start, end] = this.payload.selection;

                this.payload.input.value = value;
                this.payload.input.setSelectionRange(start, end);
            }
        });
    }
}
