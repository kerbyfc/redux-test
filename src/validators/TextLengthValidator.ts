/**
 * Local imports
 */
import {injectable} from '../core/Injector';
import {Validator} from '../core/Validator';

/**
 * Interfaces
 */
export interface ITextLengthValidatorRules {
	minLength?: number;
	maxLength?: number;
}

export interface ITextLengthValidatorResult {
	minLength: boolean;
	maxLength: boolean;
}

/**
 * Validator, that checks if given text length is out of bounds
 */
@injectable()
export class TextLengthValidator extends Validator<ITextLengthValidatorRules, ITextLengthValidatorResult> {

	private static validateMinLength(value, min) {
		return (min || -Infinity) <= value.length;
	}

	private static validateMaxLength(value, max) {
		return value.length <= (max || Infinity);
	}

	public validate(value: string, rules?: ITextLengthValidatorRules) {
		return {
			minLength: TextLengthValidator.validateMinLength(value, rules.minLength),
			maxLength: TextLengthValidator.validateMaxLength(value, rules.maxLength)
		};
	}
}
