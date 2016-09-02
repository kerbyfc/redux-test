import {combineReducers as $} from 'redux';
import {clientForm} from './mainPage/clientForm';

export const REDUCERS = $({
    mainPage: $({
        clientForm
    })
});