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
import {ToggleCheckbox} from './actions/input/ToggleCheckbox';
import {ClientFormReducer} from './reducers/forms/ClientForm';
import {DateValidator} from './validators/DateValidator';
import {Dispatcher} from './core/Dispatcher';
import {EmailValidator} from './validators/EmailValidator';
import {ChangeInputValue} from './actions/input/ChangeInputValue';
import {OnlyRussianCharsValidator} from './validators/OnlyRussianCharsValidator';
import {PassportValidator} from './validators/PassportValidator';
import {PatternValidator} from './validators/PatternValidator';
import {Ref} from './core/Ref';
import {SaveClient} from './actions/clientForm/SaveClient';
import {SelectOption} from './actions/input/SelectOption';
import {TextLengthValidator} from './validators/TextLengthValidator';
import {Validator} from './core/Validator';
import {NotificationsReducer} from './reducers/NotificationsReducer';
import {ShowNotification} from './actions/notifications/ShowNotification';
import {ShowClientSaved} from './actions/clientForm/ShowClientSaved';
import {FallbackInputValue} from './actors/inputs/FallbackInputValue';
import {SaveClientToServer} from './actors/clientForm/SaveClient';
import {HideNotificationByTimeout} from './actors/notifications/HideNotificationByTimeout';
import {HideNotification} from './actions/notifications/HideNotification';
import {NotifyDataIsSaved} from './actors/notifications/NotifyDataIsSaved';
import {Actor} from './core/Actor';
import {Action} from './core/Action';
import {Reducer} from './core/Reducer';
import {Component} from './core/Component';


/**
 * Singletons
 */
injector.registerProviders([
    /**
     * Core
     */
    Ref,
    Validator,
    Dispatcher,
    Component,
    Reducer,
    Action,
    Actor,

    /**
     * Reducers
     */
    AppReducer,
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
    NotifyDataIsSaved,

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
