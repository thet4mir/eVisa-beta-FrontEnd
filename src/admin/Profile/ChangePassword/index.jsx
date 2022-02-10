import React, { Component, Fragment } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'


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
            <input type="password" className={ className }
                name={ name }
                value={ value || ''}
                onChange={ (e) => onChange(name, e) }
                { ...other_props }
            />
            { error &&
                <div className="invalid-feedback">{ error }</div>
            }
        </Fragment>
    )
}


export class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            save_promise: null,
            status: 'initial',
            values: props.values && props.values.id && props.values || {
                old_password  : null,
                new_password1 : null,
                new_password2 : null,
            },
            form_errors: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name, e) {
        const { values } = this.state
        values[name] = e.target.value
        this.setState({ values })
    }

    handleSubmit(payload, callback) {

    }

    handleSubmit(e) {
        e && e.preventDefault()

        const { values } = this.state

        this.setState({ status: 'loading' })

        const promise = axiosInstance
            .post('/api/auth/change-password/', values)
            .then(({ is_success, form_errors }) => {
                if (is_success) {
                    this.setState({
                        status: 'success',
                        values: {
                            old_password  : null,
                            new_password1 : null,
                            new_password2 : null,
                        },
                    })
                } else {
                    this.setState({
                        status: 'fail',
                        form_errors,
                    })
                }
            })
            .catch((error) => {
                return Promise.reject(error)
            })
        this.setState({ save_promise: promise })

    }

    render() {

        const { values, form_errors, status } = this.state

        return (
            <Loader promise={ this.state.save_promise }>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-5">

                            { status == 'success' &&
                                <div className="alert alert-success fade show" role="alert">Нууц үг амжилттай солигдлоо.</div>
                            }

                            <h1>Нууц үг солих</h1>

                            <form onSubmit={ this.handleSubmit }>
                                <div className="mb-3">
                                    <label className="form-label">Хуучин нууц үг</label>
                                    <InputPassword
                                        placeholder = "хуучин нууц үг"
                                        name = "old_password"
                                        onChange = { this.handleChange }
                                        status ={  status }
                                        errors = { form_errors }
                                        values = { values  }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Шинэ нууц үг</label>
                                    <InputPassword
                                        placeholder = "шинэ нууц үг"
                                        name = "new_password1"
                                        onChange = { this.handleChange }
                                        status ={  status }
                                        errors = { form_errors }
                                        values = { values }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Шинэ нууц үг баталгаажуулах</label>
                                    <InputPassword
                                        placeholder = "шинэ нууц үг баталгаажуулах"
                                        name = "new_password2"
                                        onChange = { this.handleChange }
                                        status ={  status }
                                        errors = { form_errors }
                                        values = { values }
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Хадгалах</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}
