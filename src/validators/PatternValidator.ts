/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {Validator} from '../core/Validator';
import {injectable} from '../core/Injector';

/**
 * Interfaces
 */
export interface IPatternValidatorRules {
	pattern?: RegExp;
	template?: string;
	partial?: boolean;
	length?: number;
}

// That rules must be declared in inherited classes
export interface IPatternValidatorDefaltRules {
	pattern: RegExp;
}

export interface IResults {
	valid: boolean;
}

/**
 * Validator that accepts rules to validators different types of text
 */
@injectable()
export class PatternValidator extends Validator<IPatternValidatorRules, IResults> {

	protected defaultRules: IPatternValidatorDefaltRules = {
		pattern: /.*/
	};

	private template(val: string, rules: IPatternValidatorRules): string {
		if (!rules.template) {
			// TODO: add env check
			throw new Error(`${this.constructor.name} needs template to apply partial validation`);
		}
		/**
		 * If length wasn't passed, use value length
		 */
		const length: number = _.isNumber(rules.length) && rules.length || val.length;
		return val.slice(0, length) + rules.template.slice(length);
	}

	public validate(value: string, rules: IPatternValidatorRules = this.defaultRules) {
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
