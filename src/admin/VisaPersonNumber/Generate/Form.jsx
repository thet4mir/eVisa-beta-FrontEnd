import React, { Component, Fragment } from 'react'


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


export class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 'initial',
            values: {
                length: '',
                amount: '',
            },
            form_errors: {},
            amount_generated: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
    }

    handleChange(field, e) {
        const { values, status } = this.state
        values[field] = e.target.value
        this.setState({
            values,
            status: status == 'fail' ? 'fail' : 'initial'
        })
    }

    handleSubmit(e) {
        e && e.preventDefault()

        const { values } = this.state

        this.setState({ status: 'loading' }, () => {
            this.props.onSubmit(values, this.handleSubmitComplete)
        })
    }

    handleSubmitComplete(is_success, { form_errors, amount }) {
        if (is_success) {
            this.setState({
                status: 'success',
                amount_generated: amount,
            })
        } else {
            this.setState({
                status: 'fail',
                form_errors: form_errors || {},
            })
        }
    }

    render() {
        const { values, form_errors, status, amount_generated } = this.state

        return(
            <form onSubmit={ this.handleSubmit }>

                { status == 'success' &&
                    <div className="alert alert-success fade show" role="alert">
                        { amount_generated } ширхэг дугаарыг амжилттай үүсгэлээ.
                    </div>
                }

                <div className="mb-3">
                    <label className="form-label">Тэмдэгтийн урт</label>
                    <InputText
                        placeholder="Дугаарын урт 8-12"
                        name="length"
                        type="number"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <div className="mb-3">
                     <label className="form-label">Хэдэн ширхэг дугаар үүсгэх</label>
                    <InputText
                        placeholder="Тоо ширхэг"
                        name="amount"
                        type="number"
                        onChange={ this.handleChange }
                        status={ status }
                        errors={ form_errors }
                        values={ values }
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-large" >
                    { status == 'loading' ?  'Loading...' : 'Үүсгэх' }
                </button>
            </form>
        )

    }

}
