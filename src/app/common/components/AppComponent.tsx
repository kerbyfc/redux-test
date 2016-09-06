/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import {IState} from '../reducers/AppReducer';

interface AppProps {
    app: IState;
}

@connect((state) => state)
export class AppComponent extends React.Component<AppProps, any> {

    render() {
        return (
            <div id="app">
                <h1>Virtu test app</h1>
                <pre>{JSON.stringify(this.props.app, null, 4)}</pre>
                <hr />
                {this.props.children}
            </div>
        );
    }
}