/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {injectable} from './Injector';

export interface IValidator<TRules, TResult> {
    validate(value: any, rules?: TRules): TResult;
    check(value: any, rules?: TRules): boolean;
}

@injectable()
export abstract class Validator<TRules, TResult> implements IValidator<TRules, TResult> {

    public check(value: any, rules?: TRules) {
        return _.every(<any> this.validate(value, rules), result => !!result);
    }

    public abstract validate(value: any, rules?: TRules): TResult;
}
