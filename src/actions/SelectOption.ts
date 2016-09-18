import {Action} from '../core/Action';

/**
 * Interfaces
 */
interface ISelectOptionPayload {
  ref: IRef<boolean>;
  value?: string;
}

export class SelectOption extends Action<ISelectOptionPayload> {

  emit({event, ref}) {
    const input:HTMLSelectElement = <HTMLSelectElement>event.target;
    const option: HTMLOptionElement = <HTMLOptionElement>input.selectedOptions[0];
    const value: string = option.value;

    return super.emit({
      ref,
      value
    });
  }
}
