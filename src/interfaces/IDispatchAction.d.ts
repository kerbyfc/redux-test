interface IDispatcherAction {
    is: IAction<any>,
    type: string;
    class: Function;
    __payload: any;
}

