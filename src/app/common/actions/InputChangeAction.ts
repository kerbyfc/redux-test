/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Action} from '../../core/Action';
import {injectable} from '../../core/Injector';
import {IRef} from '../state';

export interface IInputChangeActionPayload {
    event: Event;
    ref: IRef<string>;
    selection: number[];

    /**
     * must be added by action
     */
    value?: string;
    input?: HTMLInputElement;
}

@injectable()
export class InputChangeAction extends Action<IInputChangeActionPayload> {

    emit({event, selection, ref}) {
        const input: HTMLInputElement = <HTMLInputElement>event.target;
        const [start, end] = selection;

        const payload = {
            value: input.value,
            selection,
            event,
            input,
            ref
        };

        // TODO: use injector
        this.actors.push((state) => {
            /**
             * Get state value by Ref.path
             */
            const stateValue = _.get<string>(state, this.payload.ref.path);

            /**
             * Check if stateValue was applyed by reducer
             * and revert input value if not
             */
            if (stateValue !== this.payload.value) {
                this.payload.input.value = stateValue;
                this.payload.input.setSelectionRange(start, end);
            }
        });

        return super.emit(payload);
    }
}
