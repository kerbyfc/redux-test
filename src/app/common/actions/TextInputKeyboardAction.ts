/**
 * External imports
 */
import * as R from 'ramda';

/**
 * Local imports
 */
import {Action} from '../../core/Action';

export interface ITextInputValue {
    current: string;
    next: string;

    // TODO: move outside of ITextInputValue
    cursor: number;
}

export interface ITextInputAction {
    event: KeyboardEvent;

    /**
     * Should be computed by Action
     */
    attrs?: {
        name: string;
    };
    value?: ITextInputValue;
}

// TODO: add abstract method for computing cursor
export abstract class TextInputKeyboardAction extends Action<ITextInputAction> {

    constructor(payload) {
        super(payload);

        /**
         * Allow to pass value and input to constructor
         */
        if (!payload.value) {
            this.payload.value = this.computeValue();
        }

        /**
         * Attrs should be merged with passed
         */
        this.payload.attrs = R.merge(this.extractAttrs(), payload.attrs);
    }

    protected getValue(): string {
        return this.getElement().value;
    }

    // protected getSelection() {
    //     const element = this.getElement();
    //     return {
    //         start: element.selectionStart,
    //         end: element.selectionEnd
    //     };
    // }

    protected getElement(): HTMLInputElement {
        return <HTMLInputElement>this.payload.event.currentTarget;
    }

    protected replace(start: number, end: number, replacement: string) { // TODO: type
        const value = this.getValue().split('');
        value.splice(start, end - start, replacement);
        return value.join('');
    }

    // TODO: refactoring
    protected getCursor(replaceResult) {
        return replaceResult.start + (replaceResult.replacement.length);
    }

    protected extractAttrs() {
        const attrs = this.getElement().attributes;
        return {
            name: attrs.getNamedItem('name').value
        };
    }

    protected shouldBeEmitted() {
        return this.payload.value !== null;

    }

    protected abstract computeValue(): ITextInputValue;
}
