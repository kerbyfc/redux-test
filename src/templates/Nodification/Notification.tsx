/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';

/**
 * Local imports
 */
import * as styles from './Notification.style.scss';
import {NotificationType} from '../../vars';

/**
 * Interfaces
 */
interface INotificationProps extends React.Attributes, INotification {}

/**
 * Notificaton block that shows text information on top right corner of view port
 */
export function Notification(props: INotificationProps) {

    const modifier: string = props.type === NotificationType.SUCCESS ?
        styles.success : styles.error;

    return (
        <div className={c(styles.container, modifier)}>
            {props.text}
        </div>
    );
}
