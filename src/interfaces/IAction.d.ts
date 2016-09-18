interface IAction<TPayload> {
    type: string;
    emit(payload: TPayload): boolean;
}

