import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Form } from '../Form'


class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            save_promise: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(payload, callback) {
        const promise = axiosInstance
            .post(`/api/user/create/`, payload)
            .then(({ is_success, item, form_errors }) => {
                if (is_success) {
                    this.props.history.push(`/user/`)
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

    render() {
        return (
            <Loader promise={ this.state.save_promise }>
                <Form onSubmit={ this.handleSubmit }/>
            </Loader>
        )
    }
}

const routed = withRouter(Main)
export { routed as Main }
