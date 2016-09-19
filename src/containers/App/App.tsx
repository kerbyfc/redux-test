/**
 * External imports
 */
import * as React from 'react';
import 'react-dom';

/**
 * Local imports
 */
import * as styles from './App.style.scss';
import {Header} from '../../templates/Header/Header';
import {Component} from '../../core/Component';
import {Notifier} from '../Notifier/Notifier';

/**
 * Main application container
 */
export class App extends Component<{}, {}> {

    public render() {
        return (
            <div className={styles.app}>
                <Header title='Virtu'/>
                {this.props.children}

                <Notifier />
            </div>
        );
    }
}

export default App;
