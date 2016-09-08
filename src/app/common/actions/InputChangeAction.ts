/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Action} from '../../core/Action';
import {injectable} from '../../core/Injector';

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

        const payload = {
            event,
            selection,
            input,
            ref,
            value: input.value
        };

        // TODO: use injector
        this.actors.push((state) => {
            /**
             * Get state value by Ref.path
             */
            const value = _.get<string>(state, this.payload.ref.path);

            if (value !== this.payload.value) {
                const [start, end] = this.payload.selection;

                this.payload.input.value = value;
                this.payload.input.setSelectionRange(start, end);
            }
        });

        return super.emit(payload);
    }
}
