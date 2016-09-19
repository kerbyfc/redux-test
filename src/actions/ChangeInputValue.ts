/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable, inject} from '../core/Injector';
import {Action} from '../core/Action';
import {FallbackInputValue} from '../actors/FallbackInputValue';

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
    start?: number;
    end?: number;
}

/**
 * Try to change state value by Ref and rollback if
 * if wasn't applyed by reducer
 */
@injectable()
export class ChangeInputValue extends Action<IChangeInputValuePayload> {

    constructor(
        @inject(FallbackInputValue) fallbackInputValue: IActor
    ) {
        super();

        this.enqueue(
            fallbackInputValue
        );
    }

    emit({event, selection, ref}) {
        const input: HTMLInputElement = <HTMLInputElement>event.target;
        const [start, end] = selection;

        const payload = {
            value: input.value,
            selection,
            start,
            end,
            event,
            input,
            ref
        };

        return super.emit(payload);
    }
}
