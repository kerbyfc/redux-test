interface IActor {
    attach(action: IAction<any>);
    perform(state: IAppState, previousState: IAppState);
}
