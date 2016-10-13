interface IActorState {
	current: IAppState;
	previous: IAppState;
}

interface IActor {
	perform(action: IAction<any>, state: IActorState);
}
