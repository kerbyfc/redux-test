/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {DateValidator} from '../../validators/DateValidator';
import {EmailValidator} from '../../validators/EmailValidator';
import {injectable, inject} from '../../core/Injector';
import {OnlyRussianCharsValidator} from '../../validators/OnlyRussianCharsValidator';
import {PassportValidator} from '../../validators/PassportValidator';
import {SaveClient} from '../../actions/clientForm/SaveClient';
import {ShowClientSaved} from '../../actions/clientForm/ShowClientSaved';
import {AbstractForm} from './AbstractForm';
import {SelectOption} from '../../actions/input/SelectOption';
import {ToggleCheckbox} from '../../actions/input/ToggleCheckbox';
import {ChangeInputValue} from '../../actions/input/ChangeInputValue';
import {override} from 'core-decorators';

@injectable()
export class ClientFormReducer extends AbstractForm<IClientFormState> {

    /**
     * TODO: generate complex interfaces
     * interface IClientFormReducer extends IReducer<IClientFormState, IClientFormStateRef, IClientFormCombination> {}
     *
     * interface IReducer<TState, TStateRefs, TStateCombination> {
     *   combine(): TStateCombination;
     *   initialState: TState;
     *   state: TState;
     *   refs: TStateRefs;
     * }
     *
     * class ClientFormReducer extends AbstractForm implements IClientFormReducer {}
     */
    protected refs: IClientFormStateRef;

    constructor(
        @inject(OnlyRussianCharsValidator) private onlyRussianCharsValidator: OnlyRussianCharsValidator,
        @inject(PassportValidator) private passwordValidator: PassportValidator,
        @inject(EmailValidator) private emailValidator: EmailValidator,
        @inject(DateValidator) private dateValidator: DateValidator
    ) {
        super();
    }

    private setLoading(isLoading: boolean) {
        return _.assign<{}, IClientFormState>({}, this.state, {
            loading: isLoading
        });
    }

    @override
    protected resolveSelectOptionValue(action: SelectOption) {
        /**
         * Reset car model on car brand change
         */
        if (action.payload.ref === this.refs.data.car.brand) {
            this.state.data.car.model = '';
        }

        return action.value;
    }

    @override
    protected resolveCheckboxValue(action: ToggleCheckbox) {
        switch (action.payload.ref) {
            case this.refs.data.car.exists:
                /**
                 * Cleanup car data when car is not exist
                 */
                if (action.value === false) {
                    this.state.data.car = this.initialState.data.car;
                }
                break;
        }

        return action.value;
    }

    @override
    protected resolveInputValue(action: ChangeInputValue) {
        let valid: boolean = true;

        switch (action.payload.ref) {
            /**
             * Use filtering (return validation result)
             */
            case this.refs.data.name:
            case this.refs.data.surname:
            case this.refs.data.middlename: {
                valid = this.onlyRussianCharsValidator.check(action.value, {
                    minLength: 0,
                    maxLength: 127
                });
                break;
            }

            case this.refs.data.passport: {
                valid = this.passwordValidator.check(action.value, {
                    length: action.end
                });
                break;
            }

            case this.refs.data.birthday: {
                valid = this.dateValidator.check(action.value, {
                    length: action.end
                });
                break;
            }

            /**
             * Update errors
             */
            case this.refs.data.email:
                this.state.errors.email = !action.value || this.emailValidator.check(action.value) ?
                    '' : 'Неверный формат. Пример: user@domain.zone';
                break;
        }

        if (valid) {
            return action.value;
        }
    }

    protected reduce(action) {
        if (action instanceof SaveClient) {
            return this.setLoading(true);
        }

        if (action instanceof ShowClientSaved) {
            /**
             * Reset state
             */
            return this.initialState;
        }

        super.reduce(action);
    }
}
