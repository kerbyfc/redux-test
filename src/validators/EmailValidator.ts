/**
 * Local imports
 */
import {PatternValidator} from './PatternValidator';
import {injectable} from '../core/Injector';

@injectable()
export class EmailValidator extends PatternValidator {

	protected defaultRules = {
		// tslint:disable max-line-length
		pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		// tslint:enable
	};

}
