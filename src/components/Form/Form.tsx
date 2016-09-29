/**
 * External imports
 */
import * as React from 'react';
import * as c from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Local imports
 */
import * as styles from './Form.style.scss';

/**
 * Interfaces
 */
interface IFormProps extends React.Attributes {
    disabled?: boolean;
    loading?: boolean;
    children?: any;
}

export function Form(props: IFormProps) {
    return (
        <form className={c(styles.form)}>
            {props.loading ?

                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionName={{
                        enter: '', leave: '',
                        appear: styles.overlayAppear,
                        appearActive: styles.overlayAppearActive
                    }}
                >

                    <div className={c(styles.overlay)}>
                        <p><span>🕓</span></p>
                    </div>

                </ReactCSSTransitionGroup>
            : ''}

            <fieldset disabled={props.disabled || props.loading} className={c(styles.fieldset)}>
                {props.children}
            </fieldset>
        </form>
    );
}
