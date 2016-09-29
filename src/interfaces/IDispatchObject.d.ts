interface IDispatchObject {
    type: string;
    action: IAction<any>;
    payload: any;
}
