/**
 * External imports
 */
import * as React from 'react';
import * as cx from 'classnames';
import 'react-dom';

/**
 * Local imports
 */
import * as styles from './Header.style.scss';

/**
 * Interfaces
 */
interface IHeaderProps extends React.Attributes {
    title: string;
}

/**
 * Render header with title
 */
export function Header(props: IHeaderProps) {
    return (
        <header className="header">
            <h1 className={cx(styles.title)}>
                {props.title}
            </h1>
        </header>
    );
}
