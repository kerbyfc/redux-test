/**
 * External imports
 */
import * as _ from 'lodash';
import {autobind} from 'core-decorators';

/**
 * Local imports
 */
import {Input} from '../Input';
import {ARROW_KEYS} from '../../../vars';

export class MaskedInput extends Input {

    @autobind
    onMouseUp(event) {
        this.updateSelectionOnMouseUp(event);
    }

    @autobind
    onKeyPress(event) {
        this.handleKeyRepeat(event);
    }

    @autobind
    onKeyDown(event) {
        this.preventOriginArrowNavigation(event);
        this.preventInputWithoutSelection(event);
    }

    @autobind
    onKeyUp(event) {
        super.onKeyUp(event);
        this.updateSelectionOnKeyUp(event);
    }

    select(el: HTMLInputElement, start: number, end: number, direction: number = 1) {
        start = Math.max(0, start);

        if (el.value.length + 1 <= end) {
            start = el.value.length - 1;
        } else {
            end = start + 1;
        }

        if (el.value.slice(start, end) === this.props.mask) {
            (start += direction) && (end += direction);
        }

        el.setSelectionRange(start, end);

        /**
         * No needs to use setState to update component
         */
        this.state.selection = [start, end];
    };

    /**
     * Update mask selection on user input
     */
    updateSelectionOnKeyUp(event) {
        const el = event.target;

        let direction: number = 1;
        let {selectionStart: start} = el;

        /**
         * Support navigation
         */
        switch (event.keyCode) {
            case 37: start -= 1; direction = -1; break;  // up -> start
            case 38: start = 0; break;
            case 39: start += 1; break;
            case 40: start = el.value.length - 1; break; // down -> end
        }

        this.select(el, start, start + 1, direction);
    };

    /**
     * Do not process arrow navigation on keyDown,
     * as it will be processed in keyUp event handler
     */
    preventOriginArrowNavigation(event) {
        if (_.includes(ARROW_KEYS, event.keyCode)) {
            event.preventDefault();
        }
    }

    preventInputWithoutSelection(event) {
        if (this.state.selection[1] - this.state.selection[0] !== 1) {
            event.preventDefault();
        }
    }

    handleKeyRepeat(event) {
        if (this.state.repeat > 1) {
            event.preventDefault();
        }
        /**
         * No needs to use setState to update component
         */
        this.state.repeat = this.state.repeat + 1;
    }

    updateSelectionOnMouseUp(event) {
        const el = event.target;
        this.select(el, el.selectionStart, el.selectionStart + 1);
    }

}
