import * as React from 'react';

type AppProps = {
    history: History;
}

export class App extends React.Component<AppProps, any> {

    render() {
        return (
            <div id='app'>
                <h1>Virtu test app</h1>
                {this.props.children}
            </div>
        );
    }
}