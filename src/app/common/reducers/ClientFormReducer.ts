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
import {InputChangeAction, IInputChangeActionPayload} from '../actions/InputChangeAction';
import {Ref} from '../../core/Ref';

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
            data: {
                name: new Ref<string>(''),
                surname: new Ref<string>('')
            }
        };
    }

    reduce(state, action) {
        if (action.is instanceof InputChangeAction) {
            const payload = InputChangeAction.getPayload<IInputChangeActionPayload>(action);
            if (this.hasRef(payload.ref)) {
                return this.reduceInputValue(state, payload.value, payload.ref.key);
            }
        }
        return state;
    }

    protected validateValue(value: string, name: string) {
        return this.onlyRussianCharsValidator.check(value, {
            minLength: 0,
            maxLength: 127
        });
    }

    protected reduceInputValue(state, value: string, name: string) {
        if (this.validateValue(value, name)) {
            return R.merge(state, {
                data: R.merge(state.data, {
                    [name]: value
                })
            });
        }
    }
}







/*
TODO:

interface IClientFormData {
    name: string;
    surname: string;
}

...

getInitialData() {
    return {
        name: '',
        surname: ''
    }
}

...

this.reduce = () => {
    state = ...
    flat
    return state
}

 */

// export interface $<TType> {
//     $val: TType;
//     $key: string;
//     $ref: string;
// }
//
// export interface IClientFormState {
//     disabled: $<boolean>;
//     data: $<{
//         name: $<string>;
//         surname: $<string>;
//     }>;
// }
