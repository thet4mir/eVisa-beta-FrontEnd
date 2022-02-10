import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { InputText, InputTextarea } from '@admin/components/Form'


export class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {

            language: props.language,

            status: 'initial',
            values: props.values || {
                subject: '',
                body: '',
            },
            form_errors: {},

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(name, value) {
        const { values } = this.state
        values[name] = value
        this.setState({ values })
    }

    handleSubmit(e) {

        e.preventDefault()

        const { values } = this.state
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

        const { language, values, form_errors, status } = this.state

        const getOpts = (name) => ({
            name: name,
            value: values[name],
            errors: form_errors[name],
            is_validated: status == 'fail',
            onChange: this.handleChange,
        })

        return (
            <form onSubmit={ this.handleSubmit }>
                <div className="mb-3">
                    <InputText { ...getOpts('subject') }
                        label="Гарчиг"
                        placeholder={ `Гарчиг (${language.name} хэлээр)` }
                    />
                </div>

                <div className="mb-3">
                    <InputTextarea{ ...getOpts('body') }
                        label="Агуулга"
                        placeholder={ `И-Мэйл агуулга (${language.name} хэлээр)` }
                        rows="6"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Хадгалах</button>
            </form>
        )

    }

}
