/**
 * Local imports
 */
import {PatternValidator} from './PatternValidator';
import {injectable} from '../core/Injector';

@injectable()
export class PassportValidator extends PatternValidator {

    protected defaultRules = {
        pattern: /\d{4}\s\d{6}/,
        template: '0000 000000'
    };
}
