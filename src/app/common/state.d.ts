import {IReducer} from '../core/Reducer';

interface IRef<TType> {
    key: string;
    val: TType;
    path: string;
}

/**
 * use '$' like in components for convinience
 */
type $<TType> = TType | IRef<TType> | IReducer<TType>;

interface IClientFormState {
    data: {
        name: $<string>;
        surname: $<string>;
        middlename: $<string>;
        birthday: $<string>;
        passport: $<string>;
    };
    disabled: boolean;
}

interface IAppState {
    clientForm: $<IClientFormState>;
}
