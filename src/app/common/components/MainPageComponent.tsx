/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
export class MainPageComponent extends React.Component<any, any> {

    render() {
        return (
            <article>
                {this.props.children}
            </article>
        );
    }
}