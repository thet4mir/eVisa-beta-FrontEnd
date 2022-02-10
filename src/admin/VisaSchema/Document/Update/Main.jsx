import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Form } from '../Form'


class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: null,
            item_promise: null
        }
        this.loadDetail = this.loadDetail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/document/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    const doc_fields = item.fields.filter((item) => item.is_fixed == false)
                    const values = {
                        id: item.id,
                        name: item.name,
                        doc_fields: doc_fields,
                    }
                    this.setState({ values })
                }
            })
        this.setState({ item_promise: promise })
    }

    handleSubmit(payload, callback) {
        const { id } = this.state.values
        const promise = axiosInstance
            .post(`/api/visa/document/${id}/update/`, payload)
            .then(({ is_success, item, form_errors }) => {
                if (is_success) {
                    this.props.history.push(`/visa-schema/document/${item.id}/detail/`)
                } else {
                    callback(is_success, form_errors)
                }
            })
            .catch((error) => {
                callback(false, {})
                return Promise.reject(error)
            })
        this.setState({ item_promise: promise })
    }

    render() {
        const { values } = this.state
        return (
            <Loader promise={this.state.item_promise} reload={ this.loadDetail }>
                <Form
                    values={values}
                    onSubmit={this.handleSubmit}
                />
            </Loader>
        )
    }
}

const routed = withRouter(Main)
export { routed as Main }
