interface IRef<TType> {
    key: string;
    val: TType;
    path: string;
}

interface IClientFormState {
    disabled: IRef<boolean> | boolean;
    data: {
        name: IRef<string> | string;
        surname: IRef<string> | string;
    };
}

interface IState {
    clientForm: IClientFormState;
}
