/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {FallbackInputValue} from '../../actors/inputs/FallbackInputValue';
import {Action} from '../../core/Action';

/**
 * Interfaces
 */
interface IChangeInputValuePayload {
    event: Event;
    ref: IRef<string>;
    selection: number[];
}

/**
 * Try to change state value by Ref and rollback if
 * if wasn't applyed by reducer
 */
@injectable()
export class ChangeInputValue extends Action<IChangeInputValuePayload> {

    constructor(
        @inject(FallbackInputValue) fallbackInputValue: IActor,
    ) {
        super();

        this.enqueue(
            fallbackInputValue
        );
    }

    get input(): HTMLInputElement {
        return <HTMLInputElement> this.payload.event.target;
    }

    get value(): string {
        return this.input.value;
    }

    get start(): number {
        return this.payload.selection[0];
    }

    get end(): number {
        return this.payload.selection[1];
    }
}
