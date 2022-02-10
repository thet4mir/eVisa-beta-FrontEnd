import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Form } from '../Form'
import { Preview } from '../Preview'


export class Create extends Component {

    constructor(props) {
        super(props)

        this.state = {
            save_promise: null,
            preview_values: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
    }

    handleSubmit(payload, callback) {
        const promise = axiosInstance
            .post('/api/visa/field/create/', payload)
            .then(({ is_success, item, form_errors }) => {
                if (is_success) {
                    this.props.history.push(`/visa-schema/field/${item.id}/detail/`)
                } else {
                    callback(is_success, form_errors)
                }
            })
            .catch((error) => {
                callback(false, {})
                return Promise.reject(error)
            })
        this.setState({ save_promise: promise })
    }

    handlePreview(preview_values) {
        this.setState({
            preview_values,
        })
    }

    render() {

        const { preview_values } = this.state

        return (
            <div className="container ms-0">

                <div className="row">
                    <div className="col-2">
                        <ButtonBack to="/visa-schema/field/"/>
                    </div>
                </div>

                <div className="row mt-3">

                    <div className="col-12">
                        <h1>Талбар үүсгэх</h1>
                    </div>

                    <div className="col-8">
                        <Loader promise={ this.state.save_promise }>
                            <Form
                                onSubmit={ this.handleSubmit }
                                onChange={ this.handlePreview }
                            />
                        </Loader>
                    </div>

                    <div className="col-4">
                        <Preview values={ preview_values }/>
                    </div>

                </div>
            </div>
        )
    }
}
