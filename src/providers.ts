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
import {ToggleCheckbox} from './actions/ToggleCheckbox';
import {ClientFormReducer} from './reducers/ClientForm';
import {DateValidator} from './validators/DateValidator';
import {Dispatcher} from './core/Dispatcher';
import {EmailValidator} from './validators/EmailValidator';
import {ChangeInputValue} from './actions/ChangeInputValue';
import {OnlyRussianCharsValidator} from './validators/OnlyRussianCharsValidator';
import {PassportValidator} from './validators/PassportValidator';
import {PatternValidator} from './validators/PatternValidator';
import {Ref} from './core/Ref';
import {SaveClient} from './actions/SaveClient';
import {SelectOption} from './actions/SelectOption';
import {TextLengthValidator} from './validators/TextLengthValidator';
import {Validator} from './core/Validator';
import {NotificationsReducer} from './reducers/NotificationsReducer';
import {ShowNotification} from './actions/ShowNotification';
import {ShowClientSaved} from './actions/ShowClientSaved';
import {FallbackInputValue} from './actors/FallbackInputValue';
import {SaveClientToServer} from './actors/SaveClient';
import {HideNotificationByTimeout} from './actors/HideNotificationByTimeout';
import {HideNotification} from './actions/HideNotification';


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
    ChangeInputValue,
    ToggleCheckbox,
    SelectOption,
    SaveClient,
    ShowClientSaved,
    ShowNotification,
    HideNotification,

    /**
     * Actors
     */
    FallbackInputValue,
    SaveClientToServer,
    HideNotificationByTimeout,

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
