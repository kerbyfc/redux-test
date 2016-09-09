/**
 * Local imports
 */
import {injectable, inject} from '../../core/Injector';
import {Validator} from '../../core/Validator';

export interface ITextLengthValidatorRules {
    minLength?: number;
    maxLength?: number;
}

export interface ITextLengthValidatorResult {
    minLength: boolean;
    maxLength: boolean;
}

@injectable()
export class TextLengthValidator extends Validator<ITextLengthValidatorRules, ITextLengthValidatorResult> {

    static validateMinLength(value, min) {
        return (min || -Infinity) <= value.length;
    }

    static validateMaxLength(value, max) {
        return value.length <= (max || Infinity);
    }

    validate(value: string, rules?: ITextLengthValidatorRules) {
        return {
            minLength: TextLengthValidator.validateMinLength(value, rules.minLength),
            maxLength: TextLengthValidator.validateMaxLength(value, rules.maxLength)
        };
    }
}


