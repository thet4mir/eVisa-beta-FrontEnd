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
                ? (error ? " is-invalid" : " is-valid ")
                : ""
        )
    )

    return (
        <Fragment>
            <input type="text" className={ className }
                name = { name }
                value = { value }
                onChange= { (e) => onChange(name, e) }
                { ...other_props }
            />
            { error &&
                <div className="invalid-feedback">{ error }</div>
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
                name_local: '',
                code_name: '',
                is_active: true,

            },
            forms_errors: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(prevProps) {
        const values_old = prevProps.values
        const values_new = this.props.values
        if (
            (values_old === null && values_new ) ||
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

        this.props.onSubmit(values, (is_success, forms_errors) => {
            if (!is_success) {
                this.setState({
                    status: 'fail',
                    forms_errors
                })
            }
        })
    }

    render() {
        const { values, forms_errors, status } = this.state

        return(
            <form onSubmit={ this.handleSubmit }>

                <div className="mb-3">
                    <label className="form-label">Нэр</label>
                    <InputText
                        placeholder="Нэр"
                        name="name"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ forms_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Нэр улсаар</label>
                    <InputText
                        placeholder="Тус улсаар"
                        name="name_local"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ forms_errors }
                        values={ values }
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Код</label>
                    <InputText
                        placeholder="Код"
                        name="code_name"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ forms_errors }
                        values={ values }
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