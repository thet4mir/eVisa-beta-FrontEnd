import React, { Component, Fragment, createRef } from 'react'
import { Route } from 'react-router-dom'

import { Loader } from '@/components/Loader'
import { axiosInstance } from '@/service'


class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            recaptcha_is_active: null,
            form_status: 'initial',
            values: {
                username: '',
                password: '',
            },
            g_recaptcha_widget_id: null,
            errors: {},
            login_promise: null,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.refRecaptcha = createRef()
    }

    componentDidMount() {

        const recaptcha = axiosInstance
            .post('/api/auth/login/options/', {})
            .then(({ is_success, recaptcha_site_key}) => {
                if (is_success) {
                    if (recaptcha_site_key == "") {
                        this.setState({recaptcha_is_active: false})
                    }
                    else {
                        this.setState({recaptcha_is_active: true})
                        grecaptcha.ready(() => {

                            const g_recaptcha_widget_id = grecaptcha.render(
                                this.refRecaptcha.current,
                                {
                                    sitekey: recaptcha_site_key,
                                }
                            )
                            this.setState({ g_recaptcha_widget_id })

                        })
                    }
                }
            }
        )



    }

    handleChange(field, e) {
        const { values } = this.state
        values[field] = e.target.value
        this.setState({ values })
    }

    handleSubmit(e) {
        e && e.preventDefault()

        const { g_recaptcha_widget_id, values } = this.state

        const payload = {
            ...values,
        }

        if (this.state.recaptcha_is_active) {
            payload['g_recaptcha_response'] = grecaptcha.getResponse(g_recaptcha_widget_id)
        }

        this.setState({ form_status: 'loading' })
        const promise = axiosInstance
            .post(
                '/api/auth/login/',
                payload,
                { timeout: 30 * 1000 },
            )
            .then(({ is_success, errors}) => {

                if (is_success) {

                    window.dispatchEvent(new CustomEvent('auth_changed'))
                    this.props.history.push('/')

                } else {

                    this.setState({
                        errors,
                        form_status: 'fail',
                    })

                }
            })

        this.setState({ login_promise: promise })
    }

    render() {
        const {
            form_status,
            values: {
                username,
                password,
            },
            errors,
        } = this.state


        const getErrorClass = (name) => {
            return (
                form_status == 'fail'
                    ?  (errors[name] && errors[name].length ? " is-invalid" : " is-valid")
                    : ''
            )
        }

        return (
            <Fragment>

                <h1>Login</h1>

                <form onSubmit={ this.handleSubmit }>

                    <fieldset disabled={ form_status == 'loading' }>

                        { errors.form &&
                            <div className="alert alert-danger" role="alert">
                                { errors.form }
                            </div>
                        }

                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text"
                                id="id_username"
                                className={ "form-control" + getErrorClass('username') }
                                onChange={(e) => this.handleChange('username', e)}
                                value={ username }
                            />
                            { errors.username && errors.username.length > 0 &&
                                <div className="invalid-feedback">{ errors.username[0] }</div>
                            }
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="id_password">Password</label>
                            <input type="password"
                                id="id_password"
                                className={ "form-control" + getErrorClass('password') }
                                onChange={(e) => this.handleChange('password', e)}
                                value={ password }
                            />
                            { errors.password && errors.password.length > 0 &&
                                <div className="invalid-feedback">{ errors.password[0] }</div>
                            }
                        </div>

                        <div className="mb-3">
                            <div ref={ this.refRecaptcha }></div>
                            { errors.g_recaptcha_response && errors.g_recaptcha_response.length > 0 &&
                                <div className="invalid-feedback d-block">{ errors.g_recaptcha_response[0] }</div>
                            }
                        </div>

                        <Loader promise={ this.state.login_promise } reload={ this.handleSubmit }>
                        </Loader>

                        <button type="submit" className="btn btn-primary btn-large">
                            { form_status == 'loading' ?  'Loading...' : 'Login' }
                        </button>

                    </fieldset>

                </form>

            </Fragment>
        )
    }

}

export default function Login() {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3"></div>
                <div className="col-6">
                    <Route component={ LoginForm }/>
                </div>
            </div>
        </div>
    )
}
