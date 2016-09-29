/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Actor} from '../../core/Actor';
import {ChangeInputValue} from '../../actions/input/ChangeInputValue';

export class FallbackInputValue extends Actor {

    public perform(action, state) {
        if (action instanceof ChangeInputValue) {
            /**
             * Get state value by Ref.path
             */
            const stateValue = _.get<string>(state.current, action.payload.ref.path);

            /**
             * Check if stateValue was applyed by reducer
             * and revert input value if not
             */
            if (stateValue !== action.value) {
                action.input.value = stateValue;
                action.input.setSelectionRange(action.start, action.end);
            }
        }
    }
}
