import * as _ from 'lodash';

export class Ref<TType> implements IRef<TType> {

    protected _key: string;
    protected _path: string;

    constructor(protected _val: TType) {}

    setPath(path: string) {
        if (!this._path) {
            this._path = path;
            this._key = path.split('.').slice(-1)[0];
        }
        return this;
    }

    get val(): TType {
        // TODO: take current value from state, or update refs ???
        return this._val;
    }

    get key(): string {
        return this._key;
    }

    get path(): string {
        return this._path;
    }
}
