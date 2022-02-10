import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Form } from '../Form'


class Main extends Component {

    constructor(props) {

        super(props)

        this.state = {
            loader_promise: null,
            values: null,
            documents: [],
            countries: [],
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {

        const { id } = this.props.match.params

        const promise = Promise.all(
            [
                axiosInstance.post('/api/visa/document/all/', {}),
                axiosInstance.post('/api/country/all/', {}),
                axiosInstance.post(`/api/visa/kind/${id}/`)
            ]
        ).then(
            (
                [
                    document_rsp,
                    country_rsp,
                    kind_rsp,
                ]
            ) => {

                const is_success = (
                    document_rsp.is_success &&
                    country_rsp.is_success &&
                    kind_rsp.is_success
                )

                if (is_success) {

                    const {
                        documents,
                        discount_list,
                        visa_exempt_countries,
                        fee_exempt_countries,
                        ...item
                    } = kind_rsp.item

                    this.setState({
                        documents: document_rsp.items,
                        countries: country_rsp.items,
                        values: {
                            ...item,
                            discount_list: discount_list || [],
                            documents: (documents || []).map((v) => v.id),
                            visa_exempt_country: (visa_exempt_countries || []).map((v) => v.id),
                            fee_exempt_country: (fee_exempt_countries || []).map((v) => v.id),
                        }
                    })
                }

            }
        )

        this.setState({ loader_promise: promise })

    }

    handleSubmit(payload, callback) {
        const { id } = this.state.values
        const promise = axiosInstance
            .post(`/api/visa/kind/${id}/update/`, payload)
            .then(({is_success, item, form_errors }) => {
                if(is_success) {
                    this.props.history.push(`/visa-schema/kind/${id}/detail/`)
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

        const { values, documents, countries } = this.state

        return(
            <Loader promise={ this.state.loader_promise } reload={ this.loadDetail }>
                <Form
                    values={ values }
                    documents={ documents }
                    countries={ countries }
                    onSubmit={ this.handleSubmit }
                />
            </Loader>
        )
    }
}

const routed = withRouter(Main)
export { routed as Main }
