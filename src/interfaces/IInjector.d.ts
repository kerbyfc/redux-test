interface IInjector {
    get<TAction>(identifier: any): TAction;
    bind(identifier: any);
    isBound(idenfier: any);
}
