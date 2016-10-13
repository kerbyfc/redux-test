interface IDispatcher {
	action: IAction<any>;
	dispatch(action: IAction<any>);
	subscribeOnce(actor: IActor);
	getState(): IAppState;
}
