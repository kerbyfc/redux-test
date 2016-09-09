/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Validator} from '../../core/Validator';

export interface IPatternValidatorRules {
    pattern?: RegExp;
    template?: string;
    partial?: boolean;
    length?: number;
}

export interface IPatternValidatorDefaltRules {
    pattern: RegExp;
    template: string;
}

export interface IResults {
    valid: boolean;
}

export class PatternValidator extends Validator<IPatternValidatorRules, IResults> {

    defaultRules: IPatternValidatorDefaltRules = {
        pattern: /.*/,
        template: ''
    };

    template(val: string, rules: IPatternValidatorRules): string {
        /**
         * If length wasn't passed, use value length
         */
        const length: number = _.isNumber(rules.length) && rules.length || val.length;
        return val.slice(0, length) + rules.template.slice(length);
    }

    validate(value: string, rules: IPatternValidatorRules = this.defaultRules) {
        _.defaults(rules, this.defaultRules);

        if (!rules.pattern) {
            return {valid: false};
        }

        if (rules.length || rules.partial) {
            value = this.template(value, rules);
        }

        return {
            valid: rules.pattern.test(value)
        };
    }

}