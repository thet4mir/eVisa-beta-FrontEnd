import React, { Component, Fragment } from 'react'

import { Loader } from '@/components/Loader'
import { axiosInstance } from '@/service'

import { Form } from './Form'


export default class Testsendmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            send_mail_promise: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(payload, callback) {
        if ( payload.toggle == false ) {

            const promise = axiosInstance
                .post('/api/config/admin/test-send-mail/', payload, { timeout: 15000 })
                .then(({ is_success }) => {
                    callback(is_success)
                })
                .catch((error) => {
                    callback(false)
                    return Promise.reject(error)
                })
            this.setState({ send_mail_promise: promise })
        } else {

            const promise = axiosInstance
                .post('/api/config/admin/test-send-file/', payload, { timeout: 15000 })
                .then(({ is_success }) => {
                    callback(is_success)
                })
                .catch((error) => {
                    callback(false)
                    return Promise.reject(error)
                })
            this.setState({ send_mail_promise: promise })
        }

    }

    render() {
        const { send_mail_promise } = this.state

        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-3"></div>
                    <div className="col-6">

                        <h1>Test send mail</h1>

                        <Loader promise={ send_mail_promise }>
                            <Form onSubmit={ this.handleSubmit }/>
                        </Loader>

                    </div>
                </div>
            </div>
        )
    }

}
