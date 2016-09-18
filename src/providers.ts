/**
 * External imports
 */
import {createStore} from 'redux';

/**
 * Import injector before providers
 */
import {injector} from './core/Injector';

/**
 * Import providers
 */
import {AppReducer} from './reducers/App';
import {CheckboxAction} from './actions/CheckboxAction';
import {ClientFormReducer} from './reducers/ClientForm';
import {DateValidator} from './validators/DateValidator';
import {Dispatcher} from './core/Dispatcher';
import {EmailValidator} from './validators/EmailValidator';
import {InputChangeAction} from './actions/InputChangeAction';
import {OnlyRussianCharsValidator} from './validators/OnlyRussianCharsValidator';
import {PassportValidator} from './validators/PassportValidator';
import {PatternValidator} from './validators/PatternValidator';
import {Ref} from './core/Ref';
import {SaveClientAction, ClientDataSavedAction} from './actions/SaveClientAction';
import {SelectAction} from './actions/SelectAction';
import {TextLengthValidator} from './validators/TextLengthValidator';
import {Validator} from './core/Validator';
import {NotificationsReducer} from './reducers/NotificationsReducer';
import {ShowNotification, HideNotificationByTimeOut} from './actions/ShowNotification';


/**
 * Singletons
 */
injector.bindSingleton<AppReducer>(AppReducer);
injector.bindSingleton<Dispatcher>(Dispatcher);

injector.registerProviders([
    /**
     * Core
     */
    Ref,
    Validator,

    /**
     * Reducers
     */
    ClientFormReducer,
    NotificationsReducer,

    /**
     * Actions
     */
    InputChangeAction,
    CheckboxAction,
    SelectAction,
    SaveClientAction,
    ClientDataSavedAction,
    ShowNotification,
    HideNotificationByTimeOut,

    /**
     * Actors // TODO
     */

    /**
     * Validators
     */
    TextLengthValidator,
    OnlyRussianCharsValidator,
    PatternValidator,
    PassportValidator,
    DateValidator,
    EmailValidator
]);
