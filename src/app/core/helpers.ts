/**
 * External imports
 */
import * as R from 'ramda';

export function zipObjProps<T>(obj): T | {[name: string]: string} {
    const [props, vals] = R.repeat(R.keys(obj), 2);
    return R.zipObj(props, vals);
}