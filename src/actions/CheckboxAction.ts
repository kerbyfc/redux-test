import {Action} from '../core/Action';
import {IRef} from '../core/Ref';

interface ICheckboxActionPayload {
  ref: IRef<boolean>;
  value?: boolean;
}

export class CheckboxAction extends Action<ICheckboxActionPayload> {

  emit({event, ref}) {
    const input:HTMLInputElement = <HTMLInputElement>event.target;
    const value: boolean = input.checked;

    return super.emit({
      ref,
      value
    });
  }
}
