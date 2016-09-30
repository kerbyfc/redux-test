import {Action} from '../core/Action';
import {Actor} from '../core/Actor';
import {AppReducer} from '../reducers/App';
import {ChangeInputValue} from '../actions/input/ChangeInputValue';
import {ClientFormReducer} from '../reducers/forms/ClientForm';
import {Component} from '../core/Component';
import {DateValidator} from '../validators/DateValidator';
import {Dispatcher} from '../core/Dispatcher';
import {EmailValidator} from '../validators/EmailValidator';
import {HideNotificationByTimeout} from '../actors/notifications/HideNotificationByTimeout';
import {HideNotification} from '../actions/notifications/HideNotification';
import {Injector} from '../core/Injector';
import {NotificationsReducer} from '../reducers/NotificationsReducer';
import {NotifyDataIsSaved} from '../actors/notifications/NotifyDataIsSaved';
import {OnlyRussianCharsValidator} from '../validators/OnlyRussianCharsValidator';
import {PassportValidator} from '../validators/PassportValidator';
import {PatternValidator} from '../validators/PatternValidator';
import {Reducer} from '../core/Reducer';
import {SaveClientToServer} from '../actors/clientForm/SaveClient';
import {SaveClient} from '../actions/clientForm/SaveClient';
import {ShowClientSaved} from '../actions/clientForm/ShowClientSaved';
import {ShowNotification} from '../actions/notifications/ShowNotification';
import {TextLengthValidator} from '../validators/TextLengthValidator';
import {Validator} from '../core/Validator';

export const injector = new Injector();

injector.registerProviders([
    Action,
    Actor,
    AppReducer,
    ChangeInputValue,
    ClientFormReducer,
    Component,
    DateValidator,
    Dispatcher,
    EmailValidator,
    HideNotification,
    HideNotificationByTimeout,
    Injector,
    NotificationsReducer,
    NotifyDataIsSaved,
    OnlyRussianCharsValidator,
    PassportValidator,
    PatternValidator,
    Reducer,
    SaveClient,
    SaveClientToServer,
    ShowClientSaved,
    ShowNotification,
    TextLengthValidator,
    Validator
]);
