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
