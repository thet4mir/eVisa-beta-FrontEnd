import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { FieldOptions } from '@/options'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Form } from '../Form'
import { Preview } from '../Preview'


export class Edit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: null,
            save_promise: null,
            preview_values: {},
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/field/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    if (item.kind == FieldOptions.kinds.text) {
                        item.regex_chars = item.regex_chars || ''
                    }
                    this.setState({ item })
                }
            })

        this.setState({ item_promise: promise })
    }


    handleSubmit(payload, callback) {

        const { id } = this.state.item

        const promise = axiosInstance
            .post(`/api/visa/field/${id}/update/`, payload)
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
        this.setState({ preview_values })
    }

    render() {

        const { item, preview_values } = this.state

        const { id } = this.props.match.params

        return (
            <div className="container ms-0">

                <div className="row">
                    <div className="col-2">
                        <ButtonBack to={ `/visa-schema/field/${id}/detail/` }/>
                    </div>
                </div>

                <div className="row mt-3">

                    <div className="col-12">
                        <h1>Талбар засах</h1>
                    </div>

                    <div className="col-8">
                        <Loader promise={ this.state.save_promise }>
                            <Form
                                values={ item }
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
