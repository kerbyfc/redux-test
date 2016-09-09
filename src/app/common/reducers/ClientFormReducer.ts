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
import {DateValidator} from '../validators/DateValidator';
import {IClientFormState} from '../state';
import {PatternValidator} from '../validators/PatternValidator';
import {PassportValidator} from '../validators/PassportValidator';

@injectable()
export class ClientFormReducer extends Reducer<IClientFormState> {

    static key = 'clientForm';

    constructor(
        @inject(OnlyRussianCharsValidator) protected onlyRussianCharsValidator: OnlyRussianCharsValidator,
        @inject(PassportValidator) protected passwordValidator: PassportValidator,
        @inject(DateValidator) protected dateValidator: DateValidator
    ) {
        super();
    }

    getInitialState() {
        return {
            disabled: false,
            data: {
                name: new Ref<string>(''),
                surname: new Ref<string>(''),
                middlename: new Ref<string>(''),
                birthday: new Ref<string>('MM.DD.YYYY'),
                passport: new Ref<string>('____ ______')
            }
        };
    }

    reduce(state, action) {
        if (action.is instanceof InputChangeAction) {
            const payload = InputChangeAction.getPayload<IInputChangeActionPayload>(action);
            if (this.hasRef(payload.ref)) {
                return this.reduceInputValue(state, payload);
            }
        }
        return state;
    }

    protected validateFormValue(payload) {
        switch (payload.ref) {
            case this.refs.data.name:
            case this.refs.data.surname:
            case this.refs.data.middlename: {
                return this.onlyRussianCharsValidator.check(payload.value, {
                    minLength: 0,
                    maxLength: 127
                });
            }
            case this.refs.data.passport: {
                return this.passwordValidator.check(payload.value, {
                    length: payload.selection[1]
                });
            }
            case this.refs.data.birthday: {
                return this.dateValidator.check(payload.value, {
                    /**
                     * Do not check all value
                     */
                    length: payload.selection[1]
                });
            }
        }
    }

    protected reduceInputValue(state, payload) {
        if (this.validateFormValue(payload)) {
            return R.merge(state, {
                data: R.merge(state.data, {
                    [payload.ref.key]: payload.value
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
