/**
 * Local imports
 */
import {injectable, inject} from '../core/Injector';
import {Validator} from '../core/Validator';
import {ITextLengthValidatorResult, TextLengthValidator, ITextLengthValidatorRules} from './TextLengthValidator';

export interface IOnlyRussianCharsValidatorResults extends ITextLengthValidatorResult {
    onlyRus: boolean;
}

@injectable()
export class OnlyRussianCharsValidator extends Validator<ITextLengthValidatorRules, IOnlyRussianCharsValidatorResults> {

    constructor(
        @inject(TextLengthValidator) protected textLengthValidator
    ) {
        super();
    }

    validate(value: string, rules?: ITextLengthValidatorRules) {
        const result = this.textLengthValidator.validate(value, rules);
        result.onlyRus = !/[^а-я]+/i.test(value);
        return result;
    }
}
