import React, { Component, Fragment, useState} from 'react'

import { axiosInstance } from '@/service'

import { InputText } from '@admin/components/Form'
import { Fields } from './Fields'


function Message(props) {
    return (
        <div className="alert alert-warning" role="alert">
            {props.message_text}
        </div>
    )
}


export class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            language_promise: null,
            status: 'initial',
            values: props.values && props.values.id && props.values || {
                name: '',
                doc_fields: [],
                is_message: false,
                message_text: '',
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

    handleChange(name, value) {
        const { values } = this.state
        values[name] = value
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
                    is_message: true,
                })
            }
        })
    }

    render() {
        const { values, form_errors, status, is_message, message_text } = this.state


        return (
            <div className="row">

                { is_message
                    ?
                        <Message message_text='Талбарууд сонгогдоогүй байна'/>
                    :   null
                }


                <div className="col-6">
                    <form onSubmit={this.handleSubmit}>

                        <div className="mb-3">
                            <div className="tab-pane active" id="language-tab-content-0">
                                <InputText
                                    label="Нэр"
                                    name="name"
                                    placeholder="Нэр"
                                    value={ values.name }
                                    errors={ form_errors.name }
                                    is_validated={ status == 'fail' }
                                    onChange={ this.handleChange }
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <Fields
                                name="doc_fields"
                                value={ values.doc_fields }
                                errors={ form_errors.doc_fields }
                                is_validated={ status == 'fail' }
                                onChange={ this.handleChange }
                            />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                                {status == 'loading' ? 'Loading...' : 'Хадгалах'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}
