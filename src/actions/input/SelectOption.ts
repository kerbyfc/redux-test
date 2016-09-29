import {Action} from '../../core/Action';

/**
 * Interfaces
 */
interface ISelectOptionPayload {
    event: Event;
    ref: IRef<string>;
}

export class SelectOption extends Action<ISelectOptionPayload> {

    get input(): HTMLSelectElement {
        return <HTMLSelectElement> this.payload.event.target;
    }

    get option(): HTMLOptionElement {
        return <HTMLOptionElement> this.input.selectedOptions[0];
    }

    get value(): string {
        return this.option.value;
    }
}
