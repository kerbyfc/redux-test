/**
 * External imports
 */
import * as _ from 'lodash';
import {autobind} from 'core-decorators';

/**
 * Local imports
 */
import {Input} from '../Input';
import {KeyCode, ARROW_KEY_CODES, REMOVE_KEY_CODES} from '../../../config/vars';
import {override} from 'core-decorators';

export class MaskedInput extends Input {

    private select(el: HTMLInputElement, start: number, end: number, direction: number = 1) {
        start = Math.max(0, start);

        if (el.value.length + 1 <= end) {
            start = el.value.length - 1;
        } else {
            end = start + 1;
        }

        if (el.value.slice(start, end) === this.props.mask) {
            start += direction;
            end += direction;
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
    private updateSelectionOnKeyUp(event) {
        const el = event.target;

        let direction: number = 1;
        let {selectionStart: start} = el;

        /**
         * Support navigation
         */
        switch (event.keyCode) {
            case KeyCode.left: start -= 1; direction = -1; break;
            case KeyCode.up: start = 0; break;
            case KeyCode.right: start += 1; break;
            case KeyCode.down: start = el.value.length - 1; break;
        }

        this.select(el, start, start + 1, direction);
    };

    /**
     * Do not process arrow navigation on keyDown,
     * as it will be processed in keyUp event handler
     */
    private preventOriginArrowNavigation(event) {
        if (_.includes(ARROW_KEY_CODES, event.keyCode)) {
            event.preventDefault();
        }
    }

    private preventInputWithoutSelection(event) {
        if (this.state.selection[1] - this.state.selection[0] !== 1) {
            event.preventDefault();
        }
    }

    private preventRemove(event) {
        if (_.includes(REMOVE_KEY_CODES, event.keyCode)) {
            event.preventDefault();
        }
    }

    private handleKeyRepeat(event) {
        if (this.state.repeat > 1) {
            event.preventDefault();
        }
        /**
         * No needs to use setState to update component
         */
        this.state.repeat = this.state.repeat + 1;
    }

    private updateSelectionOnMouseUp(event) {
        const el = event.target;
        this.select(el, el.selectionStart, el.selectionStart + 1);
    }

    @override
    @autobind
    protected onMouseUp(event) {
        super.onMouseUp(event);
        this.updateSelectionOnMouseUp(event);
    }

    @override
    @autobind
    protected onKeyUp(event) {
        super.onKeyUp(event);
        this.updateSelectionOnKeyUp(event);
    }

    @override
    @autobind
    protected onKeyPress(event) {
        super.onKeyPress(event);
        this.handleKeyRepeat(event);
    }

    @override
    @autobind
    protected onKeyDown(event) {
        super.onKeyDown(event);
        this.preventRemove(event);
        this.preventOriginArrowNavigation(event);
        this.preventInputWithoutSelection(event);
    }

}
