interface IAction<TPayload> {
    type: string;
    is: IAction<TPayload>;
    class: Function;
    emit(payload: TPayload): boolean;
    _payload: TPayload;
}

