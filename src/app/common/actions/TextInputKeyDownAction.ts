/**
 * External imports
 */
import * as R from 'ramda';

/**
 * Local imports
 */
import {TextInputKeyboardAction} from './TextInputKeyboardAction';

export class TextInputKeyDownAction extends TextInputKeyboardAction {

    protected isDeletion(keyCode): boolean {
        return R.contains(keyCode, [8, 46]); // backspace & delete keys
    }

    protected computeValue() {
        let {keyCode, key, altKey, ctrlKey, metaKey} = this.payload.event;

        if (altKey || ctrlKey || metaKey) {
            /**
             * Should be processed by another actions
             */
            return null;
        }

        let {selectionStart: start, selectionEnd: end, value} = this.getElement();

        const result = {
            current: value,
            cursor: start,
            next: null,
            key: key
        };

        if (this.isDeletion(keyCode)) {
            key = '';

            if (keyCode === 8) { // backspace
                start = Math.max(0, --start);
            } else { // delete
                ++end;
            }

            result.cursor = start;

        } else {
            /**
             * All special chars should not affect value
             */
            if (key.length !== 1) {
                // TODO: emit object without value but with key
                // чтобы можно было обрабатывать редюсером события
                return null;
            }

            result.cursor = start + 1;
        }

        event.preventDefault();
        result.next = this.replace(start, end, key);

        return result;
    };
}

