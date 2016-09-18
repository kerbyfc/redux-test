/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable} from '../core/Injector';
import {Action} from '../core/Action';

/**
 * Interfaces
 */
export interface IChangeInputValuePayload {
    event: Event;
    ref: IRef<string>;
    selection: number[];

    /**
     * must be added by action
     */
    value?: string;
    input?: HTMLInputElement;
}

/**
 * Try to change state value by Ref and rollback if
 * if wasn't applyed by reducer
 */
@injectable()
export class ChangeInputValue extends Action<IChangeInputValuePayload> {

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

        // TODO: use DI
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
