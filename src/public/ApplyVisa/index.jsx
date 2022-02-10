import React, { Component, Fragment } from 'react'

import { Loader } from '@/components/Loader'
import { axiosInstance } from '@/service'

import { Form } from './Form'


export class Applyvisa extends Component {

    constructor(props) {
        super(props)
        this.state = {
            send_mail_promise: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(payload, callback) {
        const promise = axiosInstance
            .post('/api/config/test-send-mail/', payload, { timeout: 15000 })
            .then(({ is_success }) => {
                callback(is_success)
            })
            .catch((error) => {
                callback(false)
                return Promise.reject(error)
            })
        this.setState({ send_mail_promise: promise })
    }

    render() {
        const { send_mail_promise } = this.state

        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-3"></div>
                    <div className="col-6">

                        <h1>1. Appy</h1>

                        <Loader promise={ send_mail_promise }>
                            <Form onSubmit={ this.handleSubmit }/>
                        </Loader>

                    </div>
                </div>
            </div>
        )
    }

}
