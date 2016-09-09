/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {Input} from './Input';
import {FormRow} from '../templates/FormRow';
import {IClientFormState} from '../state';

@connect()
export class ClientFormComponent extends Component<any, any> {

    render() {
        const refs = this.$.clientForm as IClientFormState;

        return (
            <form>
                <FormRow title="Фамилия">
                    <Input key="surname" $={refs.data.surname} />
                </FormRow>

                <FormRow title="Имя">
                    <Input key="name" $={refs.data.name} />
                </FormRow>

                <FormRow title="Отчество">
                    <Input key="middlenam" $={refs.data.middlename} />
                </FormRow>

                <FormRow title="День рождения">
                    <Input key="birthday" $={refs.data.birthday} mask="." />
                </FormRow>

                <FormRow title="Серия и номер паспорта">
                    <Input key="passport" $={refs.data.passport} mask=" " />
                </FormRow>
            </form>
        );
    }
}