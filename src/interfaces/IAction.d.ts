interface IAction<TPayload> {
	type: string;
	payload?: TPayload;
	emit?(payload: TPayload): boolean;
}

