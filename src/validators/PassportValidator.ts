/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {PatternValidator} from './PatternValidator';

export class PassportValidator extends PatternValidator {

    defaultRules = {
        pattern: /\d{4}\s\d{6}/,
        template: '0000 000000'
    };

}