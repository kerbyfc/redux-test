/**
 * External imports
 */
import * as R from 'ramda';

/**
 * Local imports
 */
import {inject, injectable} from '../../core/Injector';
import {OnlyRussianCharsValidator} from '../validators/OnlyRussianCharsValidator';
import {Reducer} from '../../core/Reducer';
import {zipObjProps} from '../../core/helpers';
import {ClientFormInputKeyDownAction} from '../components/ClientFormComponent';
import {ITextInputAction} from '../actions/TextInputKeyboardAction';

/**
 * Interfaces
 */
export interface IClientFormData {
    name: string;
    surname: string;
}

export interface IClientFormState {
    disabled: boolean;
    data: IClientFormData;
    inputCarretPositions: {};
}

/**
 * Initial data
 */
const initialClintFormData: IClientFormData = {
    name: '',
    surname: ''
};

/**
 * Component contract
 */
export const CLIENT_FORM_FIELDS = <IClientFormData>zipObjProps<IClientFormData>(initialClintFormData);


@injectable()
export class ClientFormReducer extends Reducer<IClientFormState> {

    static key = 'clientForm';

    constructor(
        @inject(OnlyRussianCharsValidator) protected onlyRussianCharsValidator
    ) {
        super();
    }

    getInitialState() {
        return {
            disabled: false,
            data: initialClintFormData,
            inputCarretPositions: {}
        };
    }

    reduce(state, action) {
        if (action.is instanceof ClientFormInputKeyDownAction) {
            return this.reduceInputValue(state, action.payload) || state;
        }
        return state;
    }

    protected validateValue(value) {
        return this.onlyRussianCharsValidator.check(value, {
            minLength: 0,
            maxLength: 127
        });
    }

    protected reduceInputValue(state, payload: ITextInputAction) {
        if (this.validateValue(payload.value.next)) {
            return R.merge(state, {
                data: R.merge(state.data, {
                    [payload.attrs.name]: payload.value.next
                }),

                // TODO: move to top of app state
                inputCarretPositions: R.merge(state.inputCarretPositions, {
                    [payload.attrs.name]: payload.value.cursor
                })
            });
        }
    }
}