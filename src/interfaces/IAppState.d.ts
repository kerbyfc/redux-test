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
