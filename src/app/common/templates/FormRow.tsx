import * as React from 'react';

export function FormRow(props: {

    title: string
    children?: any;

}) { return (

    <div>
        <label>{props.title}</label>
        {props.children}
    </div>

    );
}
