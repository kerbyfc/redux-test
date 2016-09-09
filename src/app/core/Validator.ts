/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable} from './Injector';

export interface IValidator<TValidationRules, TValidationResult> {
    validate(value: any, rules?: TValidationRules): TValidationResult;
    check(value: any, rules?: TValidationRules): boolean;
}

@injectable()
export abstract class Validator<TValidationRules, TValidationResult> implements IValidator<TValidationRules, TValidationResult> {

    check(value: any, rules?: TValidationRules) {
        return _.every(<any>this.validate(value, rules), result => !!result);
    }

    abstract validate(value: any, rules?: TValidationRules): TValidationResult;
}