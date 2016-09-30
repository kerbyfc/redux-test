export const initialState: IAppState = {
    clientForm: {
        loading: false,
        message: '',
        errors: {
            email: ''
        },
        data: {
            surname: '',
            name: '',
            middlename: '',
            email: '',
            birthday: 'MM.DD.YYYY',
            passport: '____ ______',
            car: {
                exists: false,
                brand: '',
                model: ''
            }
        }
    },
    notifications: []
};
