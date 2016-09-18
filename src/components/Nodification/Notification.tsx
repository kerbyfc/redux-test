/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';

/**
 * Local imports
 */
import * as styles from './Notification.style.scss';
import {INotification} from '../../actions/ShowNotification';
import {NotificationType} from '../../vars';

/**
 * Interfaces
 */
interface INotificationProps extends React.Attributes, INotification {}

export function Notification(props: INotificationProps) {

    const modifier: string = props.type === NotificationType.SUCCESS ?
        styles.success : styles.error;

    return (
        <div className={c(styles.container, modifier)}>
            {props.text}
        </div>
    );
}
