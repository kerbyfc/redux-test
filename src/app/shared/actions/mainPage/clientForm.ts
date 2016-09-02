import {ACTIONS} from '../../constants/actions';

export function submitForm(formData) {
    return {
        type: ACTIONS.SUBMIT_FORM,
        formData
    };
}
