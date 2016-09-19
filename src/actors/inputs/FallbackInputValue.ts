/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable} from '../../core/Injector';
import {Actor} from '../../core/Actor';
import {ChangeInputValue, IChangeInputValuePayload} from '../../actions/input/ChangeInputValue';

@injectable()
export class FallbackInputValue extends Actor {

    perform(state: IAppState) {
        if (this.action instanceof ChangeInputValue) {
            const payload = ChangeInputValue.getPayload<IChangeInputValuePayload>(this.action);

            /**
             * Get state value by Ref.path
             */
            const stateValue = _.get<string>(state, payload.ref.path);

            /**
             * Check if stateValue was applyed by reducer
             * and revert input value if not
             */
            if (stateValue !== payload.value) {
                const {start, end} = payload;

                payload.input.value = stateValue;
                payload.input.setSelectionRange(start, end);
            }
        }
    }
}
