/**
 * External imports
 */
import * as _ from 'lodash';

/**
 * Local imports
 */
import {PatternValidator} from './PatternValidator';

export class EmailValidator extends PatternValidator {

    defaultRules = {
        pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    };

}