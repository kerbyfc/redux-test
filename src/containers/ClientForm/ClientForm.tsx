/**
 * External imports
 */
import * as React from 'react';
import {connect} from 'react-redux';

/**
 * Local imports
 */
import {Component} from '../../core/Component';
import {FormRow} from '../../templates/FormRow/FormRow';
import {Input} from '../../components/Input/Input';
import {Checkbox} from '../../components/Checkbox/Checkbox';
import {Select} from '../../components/Select/Select';
import {Button} from '../../components/Button/Button';
import {SaveClient} from '../../actions/clientForm/SaveClient';
import {Form} from '../../templates/Form/Form';

/**
 * Constants
 * TODO: fetch it
 */
const carMarks = [
    '', 'mazda', 'ford', 'audi'
];

const carModels = {
    mazda: ['', '3', '6', 'mpv'],
    ford: ['', 'focus', 'mustang', 'mondeo'],
    audi: ['', 'A3', 'A6', 'A8']
};

/**
 * Redux
 */
function mapStateToProps(state: IAppState) {
    return state.clientForm;
}

/**
 * Form to add client to database
 */
@connect(mapStateToProps)
export class ClientForm extends Component<IClientFormState, any> {

    save = (event) => {
        this.createAction<SaveClient>(SaveClient).emit();
    };

    render() {
        const refs: IClientFormStateRef = this.$.clientForm;

        return (
            <Form loading={this.props.loading}>

                <FormRow title="Фамилия">
                    <Input key="surname" val={this.props.data.surname} $={refs.data.surname} />
                </FormRow>

                <FormRow title="Имя">
                    <Input key="name" val={this.props.data.name} $={refs.data.name} />
                </FormRow>

                <FormRow title="Отчество">
                    <Input key="middlename" val={this.props.data.middlename} $={refs.data.middlename} />
                </FormRow>

                <FormRow title="День рождения">
                    <Input key="birthday" val={this.props.data.birthday} $={refs.data.birthday} mask="." />
                </FormRow>

                <FormRow title="Серия и номер паспорта">
                    <Input key="passport" val={this.props.data.passport} $={refs.data.passport} mask=" " />
                </FormRow>

                <FormRow title="Почта">
                    <Input key="email" val={this.props.data.email} $={refs.data.email} error={this.props.errors.email} />
                </FormRow>

                <FormRow title="Автомобиль">
                    <Checkbox key="hascar" checked={this.props.data.car.exists} $={refs.data.car.exists} />
                </FormRow>

                {this.props.data.car.exists? (() => (<FormRow title="Марка автомобиля">
                    <Select key="carMark" options={carMarks} value={this.props.data.car.brand} $={refs.data.car.brand} />
                </FormRow>))() : ''}

                {this.props.data.car.exists ? (() => (<FormRow title="Модель автомобиля">
                    <Select key="carModel" options={carModels[this.props.data.car.brand]} value={this.props.data.car.model} $={refs.data.car.model} />
                </FormRow>))() : ''}

                <Button onClick={this.save}>
                    Сохранить
                </Button>
            </Form>
        );
    }
}
