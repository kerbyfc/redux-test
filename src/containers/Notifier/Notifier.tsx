/**
 * External imports
 */
import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import * as styles from './Notifier.style.scss';
import {Component} from '../../core/Component';
import {IState} from '../../state';
import {Notification} from '../../components/Nodification/Notification';
import {INotification} from '../../actions/ShowNotification';

/**
 * Redux
 */
function mapStateToProps(state: IState) {
    return {
        notifications: state.notifications
    };
}

/**
 * Interfaces
 */
interface INotifierProps {
    notifications?: INotification[]
}

@connect(mapStateToProps)
export class Notifier extends Component<INotifierProps, any> {

    render() {
        return (
            <div className={styles.container}>
                {_.map(this.props.notifications, (notification: INotification) => {
                    return <Notification
                        key={notification.id}
                        type={notification.type}
                        text={notification.text}
                        id={notification.id}
                    />;
                })}
            </div>
        );
    }
}
