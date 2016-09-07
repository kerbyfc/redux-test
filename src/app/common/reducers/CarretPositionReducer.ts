import * as R from 'ramda';

/**
 * Local imports
 */
import {Reducer} from '../../core/Reducer';
import {injectable} from '../../core/Injector';
import {TextInputKeyboardAction} from '../actions/TextInputKeyboardAction';

export interface ICarretPositionState {
    element: HTMLInputElement;
    inputName: string;
    inputValue: string;
    position: number;
}

@injectable()
export class CarretPositionReducer extends Reducer<ICarretPositionState> {

    static key = 'caret';

    initialState() {
        return {
            element: null,
            inputName: '',
            inputValue: '',
            position: 0
        };
    }

    reduce(state, action) {
        if (action.is instanceof TextInputKeyboardAction) {
            return {
                // TODO: in future may be need in .target
                element: action.payload.event.currentTarget,
                inputName: action.payload.attrs.name,
                inputValue: action.payload.value.next,
                position: action.payload.value.cursor
            };
        }
        return state;
    }
}