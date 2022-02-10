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
            <input type="text" className={className}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e)}
                {...other_props}
            />
            { error &&
                <div className="invalid-feedback">{error}</div>
            }
        </Fragment>
    )
}



class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 'initial',
            values: props.values && props.values.id && props.values || {
                name: '',
                nationality: '',
                code_alpha2: '',
                code_alpha3: '',
                code_numeric: '',
            },
            form_errors: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        if (['code_alpha2', 'code_alpha3', 'code_numeric'].includes(field)) {
            values[field] = e.target.value.toUpperCase()
        } else {
            values[field] = e.target.value
        }
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

    render() {
        const { values, form_errors, status } = this.state

        const field_options = {
            onChange: this.handleChange,
            status: status,
            errors: form_errors,
            values: values,
        }

        return (
            <form onSubmit={this.handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Нэр</label>
                    <InputText { ...field_options }
                        placeholder="Нэр"
                        name="name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Үндэстэн:</label>
                    <InputText { ...field_options }
                        placeholder="Үндэстэн"
                        name="nationality"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Alpha 2 code:</label>
                    <InputText { ...field_options }
                        placeholder="XX"
                        name="code_alpha2"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Alpha 3 code:</label>
                    <InputText { ...field_options }
                        placeholder="XXX"
                        name="code_alpha3"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Numeric code:</label>
                    <InputText { ...field_options }
                        placeholder="###"
                        name="code_numeric"
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                    {status == 'loading' ? 'Loading...' : 'Хадгалах'}
                </button>
            </form>
        )
    }

}

const FormWithRouter = withRouter(Form)
export { FormWithRouter as Form }
