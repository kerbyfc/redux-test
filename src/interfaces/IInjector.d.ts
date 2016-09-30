interface IInjector {
    get<T>(identifier: any): T;
    bind(identifier: any);
    isBound(idenfier: any);
}
