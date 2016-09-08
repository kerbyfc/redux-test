interface IRef<TType> {
    key: string;
    val: TType;
    path: string;
}

/**
 * use '$' like in components for convinience
 */
type $<TType> = TType | IRef<TType>;

interface IClientFormState {
    data: {
        name: $<string>;
        surname: $<string>;
    };
    disabled: boolean;
}

interface IState {
    clientForm: IClientFormState;
}
