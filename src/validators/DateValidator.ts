/**
 * External imports
 */
import * as _ from 'lodash';
import * as moment from 'moment';
import {Validator} from '../core/Validator';

/**
 * Local imports
 */

interface IRules {
    format?: string;

    /**
     * If incoming value is not complete (01.12.2)
     */
    partial?: boolean;

    /**
     * If incoming value contains mask (01.12.2YYY)
     */
    length?: number;
}

interface IResults {
    format: boolean;
}

export class DateValidator extends Validator<IRules, IResults> {

    private defaultRules = {
        format: 'DD.MM.YYYY',
        partial: false
    };

    /**
     * concat value as head and with the rest of example date
     * @example for length 7
     *
     *  '31.1(M.YYYY)' + (01.1)2.1970 -> 31.13.1970
     *            \_________/
     *                 \_ should be cutted
     */
    private template(val: string, rules): string {
        /**
         * Use Dec in template to to avoid date invalidation in case
         * of days come before month and its value is '31' and first
         * decimal of month is '1' (+1 is bad for days > 28)
         */
        const template: string = moment(0).add('month', -1).add('year', 1)
            .format(rules.format);

        /**
         * If length wasn't passed, use value length
         */
        const length: number = _.isNumber(rules.length) && rules.length || val.length;

        return val.slice(0, length) + template.slice(length);
    }

    public validate(value: string, rules: IRules = this.defaultRules) {
        _.defaults(rules, this.defaultRules);

        if (rules.length || rules.partial) {
            value = this.template(value, rules);
        }

        return {
            format: moment(value, rules.format, true).isValid()
        };
    }
}
