import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Form } from '../Form'


export class Create extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loader_promise: null,
            documents: [],
            countries: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loadFormOptions = this.loadFormOptions.bind(this)
    }

    componentDidMount() {
        this.loadFormOptions()
    }

    loadFormOptions() {

        const promise = Promise.all(
            [
                axiosInstance.post('/api/visa/document/all/', {}),
                axiosInstance.post('/api/country/all/', {}),
            ]
        ).then(
            (
                [
                    document_rsp,
                    country_rsp,
                ]
            ) => {

                const is_success = (
                    document_rsp.is_success &&
                    country_rsp.is_success
                )

                if (is_success) {
                    this.setState({
                        documents: document_rsp.items,
                        countries: country_rsp.items,
                    })
                }

            }
        )

        this.setState({ loader_promise: promise })

    }

    handleSubmit(payload, callback) {
        const promise = axiosInstance
            .post('/api/visa/kind/create/', payload)
            .then(({ is_success, item, form_errors }) => {
                if (is_success) {
                    this.props.history.push(`/visa-schema/kind/${item.id}/detail/`)
                } else {
                    callback(is_success, form_errors)
                }
            })
            .catch((error) => {
                callback(false, {})
                return Promise.reject(error)
            })
        this.setState({ loader_promise: promise })
    }

    render() {
        return (
            <div className="container ms-0">

                <div className="row">
                    <div className="col-2">
                        <ButtonBack to="/visa-schema/kind/"/>
                    </div>
                </div>

                <div className="row mt-3">

                    <h1>Визийн ангилал үүсгэх</h1>

                    <Loader promise={ this.state.loader_promise } reload={ this.loadFormOptions }>
                        <Form
                            documents={ this.state.documents }
                            countries={ this.state.countries }
                            onSubmit={ this.handleSubmit }
                        />
                    </Loader>

                </div>

            </div>
        )
    }
}
