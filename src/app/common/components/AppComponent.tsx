/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {IAppState} from '../state';

/**
 * Local imports
 */
interface AppProps {
    app: IAppState;
}

@connect((state) => state)
export class AppComponent extends React.Component<AppProps, any> {

    render() {
        return (
            <div id="app">
                <h1>Virtu test app</h1>
                <hr />
                {this.props.children}
            </div>
        );
    }
}