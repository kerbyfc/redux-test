import {Action} from '../core/Action';
import {IRef} from '../core/Ref';

interface ISelectActionPayload {
  ref: IRef<boolean>;
  value?: string;
}

export class SelectAction extends Action<ISelectActionPayload> {

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
