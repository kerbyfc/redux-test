/**
 * Local imports
 */
import {PatternValidator} from './PatternValidator';

export class PassportValidator extends PatternValidator {

    protected defaultRules = {
        pattern: /\d{4}\s\d{6}/,
        template: '0000 000000'
    };
}
