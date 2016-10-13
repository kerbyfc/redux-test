interface IErrorState {
	email: string;
}

interface ICarState {
	exists: boolean;
	brand: string;
	model: string;
}

interface IDataState {
	surname: string;
	name: string;
	middlename: string;
	email: string;
	birthday: string;
	passport: string;
	car: ICarState;
}

interface IClientFormState {
	loading: boolean;
	message: string;
	errors: IErrorState;
	data: IDataState;
}

interface IAppState {
	clientForm: IClientFormState;
	notifications: any[]
}

interface IErrorStateRef {
	email: IRef<string>;
}

interface ICarStateRef {
	exists: IRef<boolean>;
	brand: IRef<string>;
	model: IRef<string>;
}

interface IDataStateRef {
	surname: IRef<string>;
	name: IRef<string>;
	middlename: IRef<string>;
	email: IRef<string>;
	birthday: IRef<string>;
	passport: IRef<string>;
	car: ICarStateRef;
}

interface IClientFormStateRef {
	loading: IRef<boolean>;
	message: IRef<string>;
	errors: IErrorStateRef;
	data: IDataStateRef;
}

interface IAppStateRef {
	clientForm: IClientFormStateRef;
	notifications: IRef<any[]>
}
