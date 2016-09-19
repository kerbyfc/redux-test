interface IDispatcherAction {
    is: IAction<any>,
    type: string;
    class: Function;
    _payload: any;
}

