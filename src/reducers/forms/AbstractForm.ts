/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Reducer} from '../../core/Reducer';
import {ChangeInputValue} from '../../actions/input/ChangeInputValue';
import {ToggleCheckbox} from '../../actions/input/ToggleCheckbox';
import {SelectOption} from '../../actions/input/SelectOption';

export abstract class AbstractForm<TState> extends Reducer<TState> {

	private applyValue(ref: IRef<any>, value: any) {
		if (value !== void(0) && ref.val !== value) {
			_.set<TState>(this.state, this.getRelativeRefPath(ref), value);
		}
	}

	protected resolveInputValue(action: ChangeInputValue): string {
		return action.value;
	}

	protected resolveCheckboxValue(action: ToggleCheckbox): boolean {
		return action.value;
	}

	protected resolveSelectOptionValue(action: SelectOption): string {
		return action.value;
	}

	protected reduce(action) {
		if (action instanceof ChangeInputValue) {
			if (this.has(action.payload.ref)) {
				this.applyValue(action.payload.ref, this.resolveInputValue(action));
			}
		}

		if (action instanceof ToggleCheckbox) {
			if (this.has(action.payload.ref)) {
				this.applyValue(action.payload.ref, this.resolveCheckboxValue(action));
			}
		}

		if (action instanceof SelectOption) {
			if (this.has(action.payload.ref)) {
				this.applyValue(action.payload.ref, this.resolveSelectOptionValue(action));
			}
		}
	}
}
