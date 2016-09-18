import {NotificationType} from '../vars';

interface INotification {
    text: string;
    type: NotificationType;
    delay?: number;

    /**
     * Should be generated by action
     * to be able to remove notification by id
     */
    id?: string;
}
