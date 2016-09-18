/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {DateValidator} from '../validators/DateValidator';
import {EmailValidator} from '../validators/EmailValidator';
import {initialState, IClientForm, IClientFormRef, getStateRefs} from '../state';
import {injectable, inject} from '../core/Injector';
import {InputChangeAction, IInputChangeActionPayload} from '../actions/InputChangeAction';
import {OnlyRussianCharsValidator} from '../validators/OnlyRussianCharsValidator';
import {PassportValidator} from '../validators/PassportValidator';
import {Reducer} from '../core/Reducer';
import {CheckboxAction} from '../actions/CheckboxAction';
import {SelectAction} from '../actions/SelectAction';
import {SaveClientAction, ClientDataSavedAction} from '../actions/SaveClientAction';

@injectable()
export class ClientFormReducer extends Reducer<IClientForm> {

    static key = 'clientForm';

    protected get refs(): IClientFormRef {
        return getStateRefs().clientForm;
    }

    constructor(
        @inject(OnlyRussianCharsValidator) protected onlyRussianCharsValidator: OnlyRussianCharsValidator,
        @inject(PassportValidator) protected passwordValidator: PassportValidator,
        @inject(EmailValidator) protected emailValidator: EmailValidator,
        @inject(DateValidator) protected dateValidator: DateValidator
    ) {
        super();
    }

    reduce(state, action) {
        switch (action.class) {
            case InputChangeAction:
            case CheckboxAction:
            case SelectAction:
                const payload = InputChangeAction.getPayload<IInputChangeActionPayload>(action);
                if (this.hasRef(payload.ref)) {
                    return this.reduceInputValue(state, payload);
                }
                return state;

            case SaveClientAction:
                return this.setLoading(state, true);

            case ClientDataSavedAction:
                return this.getInitialState();

            default:
                return state;
        }
    }

    setLoading(state: IClientForm, isLoading: boolean) {
        // TODO: use immutable
        return _.assign({}, state, {
            loading: isLoading
        });
    }

    protected validateFormValue(state, payload) {
        switch (payload.ref) {
            /**
             * Use filtering (return validation result)
             */
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
                    length: payload.selection[1]
                });
            }

            /**
             * Only update errors (do not return values)
             */
            case this.refs.data.email:
                state.errors.email = !payload.value || this.emailValidator.check(payload.value) ?
                    '' : 'Неверный формат. Пример: user@domain.zone';

            /**
             * Reset car model on car brand change
             */
            case this.refs.data.car.brand:
                state.data.car.model = ''; // reset car model

            /**
             * Cleanup car data when car didn't exist
             */
            case this.refs.data.car.exists:
                if (payload.value === false) {
                    state.data.car = _.clone(initialState.clientForm.data.car);
                }

            /**
             * Permit state mutation by default
             */
            default:
                return true;
        }
    }

    // TODO: typings
    protected reduceInputValue(state, payload) {
        if (this.validateFormValue(state, payload)) {
            // TODO: use immutable
            return _.set(_.cloneDeep(state), this.getRelativeRefPath(payload.ref), payload.value);
        }
    }
}

