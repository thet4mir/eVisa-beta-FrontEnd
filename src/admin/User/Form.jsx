import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { axiosInstance } from '@/service'


function InputText(props) {
    const {
        status,
        name,
        errors,
        values,
        onChange,
        ...other_props
    } = props

    const value = values[name]

    const error = (
        errors[name]
            ? errors[name].length && errors[name][0]
            : null
    )

    const className = (
        "form-control" +
        (
            status == 'fail'
                ? (error ? " is-invalid" : " is-valid")
                : ""
        )
    )

    return (
        <Fragment>
            <input type="text" className={ className }
                name={ name }
                value={ value }
                onChange={ (e) => onChange(name, e) }
                { ...other_props }
            />
            { error &&
                <div className="invalid-feedback">{ error }</div>
            }
        </Fragment>
    )
}

function InputPassword(props) {
    const {
        status,
        name,
        errors,
        values,
        onChange,
        ...other_props
    } = props

    const value = values[name]

    const error = (
        errors[name]
            ? errors[name].length && errors[name][0]
            : null
    )

    const className = (
        "form-control" +
        (
            status == 'fail'
                ? (error ? " is-invalid" : " is-valid")
                : ""
        )
    )

    return (
        <Fragment>
            <input className={ className }
                name={ name }
                value={ value }
                onChange={ (e) => onChange(name, e) }
                { ...other_props }
            />
            { error &&
                <div className="invalid-feedback">{ error }</div>
            }
        </Fragment>
    )
}

function SelectBox(props) {
    const {
        status,
        name,
        values,
        onChange,
        ...other_props
    } = props

    const value = values[name]

    return (
        <Fragment>
            <select type="text" className="btn btn-secondary"
                name={ name }
                value={ value }
                onChange={ (e) => onChange(name, e) }
                { ...other_props }
            >
            <option value={false}>Хэрэглэгч</option>
            <option value={true}>Админ</option>
            </select>
        </Fragment>
    )
}


class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 'initial',
            values: props.values && props.values.id && props.values || {
                email: '',
                first_name: '',
                last_name: '',
                password1: '',
                password2: '',
                is_superuser: '',
            },
            form_errors: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleShow = this.toggleShow.bind(this)
    }

    componentDidUpdate(prevProps) {
        const values_old = prevProps.values
        const values_new = this.props.values
        if (
            (values_old === null && values_new) ||
            values_old && values_new && values_old.id != values_new.id
        ) {
            this.setState({ values: values_new })
        }
    }

    handleChange(field, e) {
        const { values } = this.state
        values[field] = e.target.value
        this.setState({ values })
    }

    handleSubmit(e) {
        e && e.preventDefault()

        const { values } = this.state

        this.setState({ status: 'loading' })

        this.props.onSubmit(values, (is_success, form_errors) => {
            if (!is_success) {
                this.setState({
                    status: 'fail',
                    form_errors
                })
            }
        })
    }

    toggleShow() {
        const { isPasswordShow } = this.state;
        this.setState({ isPasswordShow : !isPasswordShow });
    }

    render() {
        const { values, form_errors, status, isPasswordShow } = this.state
        const passShow = {
            position: "absolute",
            right: "1rem",
            top: "18.5rem",
            cursor: "pointer"
          };

        return (
            <form onSubmit={ this.handleSubmit }>

                <div className="mb-3">
                    <label className="form-label">И-Мэйл</label>
                    <InputText
                        placeholder="И-Мэйл"
                        name="email"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Нэр</label>
                    <InputText
                        placeholder="Нэр"
                        name="first_name"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Овог</label>
                    <InputText
                        placeholder="Овог"
                        name="last_name"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Нууц үг</label>
                    <InputPassword
                        type={isPasswordShow ? "text" : "password"}
                        placeholder="Нууц үг"
                        name="password1"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                    <i className={isPasswordShow ? 'bi-eye-slash-fill' : 'bi-eye-fill' } style={passShow} onClick={this.toggleShow}></i>
                </div>

                <div className="mb-3">
                    <label className="form-label">Нууц үгээ давтан оруулна уу</label>
                    <InputPassword
                        type={isPasswordShow ? "text" : "password"}
                        placeholder="Нууц үгээ давтан оруулна уу"
                        name="password2"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label"> </label>
                    <SelectBox
                        name="is_superuser"
                        onChange={ this.handleChange }
                        status={ status }
                        values={ values }
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                    { status == 'loading' ?  'Loading...' : 'Хадгалах' }
                </button>
            </form>
        )
    }

}

const FormWithRouter = withRouter(Form)
export { FormWithRouter as Form }
