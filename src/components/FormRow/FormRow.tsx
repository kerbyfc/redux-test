/**
 * External imports
 */
import * as React from 'react';

/**
 * Local imports
 */
import * as styles from './FormRow.style.scss';

/**
 * Interfaces
 */
interface IFormRowProps extends React.Attributes {
	title: string;
	children?: any;
}

export function FormRow(props: IFormRowProps) {
	return (
		<div>
			<label className={styles.title}>{props.title}</label>
			{props.children}
		</div>
	);
}
