import {Action} from '../../core/Action';

interface IToggleCheckboxPayload {
	event: Event;
	ref: IRef<boolean>;
}

export class ToggleCheckbox extends Action<IToggleCheckboxPayload> {

	get input(): HTMLInputElement {
		return <HTMLInputElement> this.payload.event.target;
	}

	get value(): boolean {
		return this.input.checked;
	}
}
