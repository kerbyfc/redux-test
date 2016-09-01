import {ACTIONS} from '../actions';

export function submitForm(formData) {
    return {
        type: ACTIONS.SUBMIT_FORM,
        formData
    };
}
