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

    /**
     * Should be computed by action
     */
    name?: string;
    value?: string;
    selection?: number[];
    input?: HTMLInputElement;
}

export class InputChangeAction extends Action<IInputChangeActionPayload> {
    constructor(event: Event) {
        super({event});

        const input: HTMLInputElement = <HTMLInputElement>event.target;

        _.assign(this.payload, {
            input: input,
            value: input.value,
            name: input.getAttribute('name'),
            selection: [input.selectionStart, input.selectionEnd]
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
