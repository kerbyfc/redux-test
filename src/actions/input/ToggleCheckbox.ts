import {Action} from '../../core/Action';

interface IToggleCheckboxPayload {
  ref: IRef<boolean>;
  value?: boolean;
}

export class ToggleCheckbox extends Action<IToggleCheckboxPayload> {

  emit({event, ref}) {
    const input:HTMLInputElement = <HTMLInputElement>event.target;
    const value: boolean = input.checked;

    return super.emit({
      ref,
      value
    });
  }
}
