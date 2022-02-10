import React, { Component, Fragment } from 'react'

import { axiosInstance } from '@/service'
import { SpinnerCover } from '@/components/Spinner'
import { Progress } from '@/components/Progress'

import { Form } from './Form'


export class Generate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount_current: 0,
            amount_max: 0,
            status: 'initial',
            save_promise: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleGenerate = this.handleGenerate.bind(this)
    }

    handleGenerate(payload, callback) {
        const promise = axiosInstance
            .post(
                `/api/visa/person-number/admin/generate/`,
                payload,
                { timeout: 300 * 1000 },
            )
            .then(({ is_success, ...data }) => {
                callback(is_success, data)
            })
            .catch((error) => {
                callback(false, {})
                return Promise.reject(error)
            })
        this.setState({ save_promise: promise })
    }

    handleSubmit(payload, callback) {
        const { amount, length } = payload

        let amount_max = amount
        let amount_current = 0

        this.setState({
            amount_current,
            amount_max,
            status: 'loading',
        })

        let doGenerateLoop = () => {

            this.handleGenerate(
                {
                    length,
                    amount: amount_max - amount_current,
                },
                (is_success, data) => {
                    if (is_success) {

                        amount_current += data.amount
                        if (amount_current >= amount) {
                            this.setState({
                                amount_current,
                                status: 'initial',
                            })
                            this.props.onSuccess()
                            callback(is_success, { ...data, amount: amount_current})
                        } else {
                            this.setState({ amount_current })
                            doGenerateLoop()
                        }

                    } else {

                        this.setState({ status: 'initial' })
                        callback(is_success, data)

                    }
                }
            )

        }

        doGenerateLoop()
    }

    render() {

        const { status } = this.state
        let progress = null

        if (status == 'loading') {

            const { amount_current, amount_max } = this.state
            const progress_value = amount_current / amount_max
            const progress_label = `${amount_current} / ${amount_max}`

            progress = (
                <div className="alert alert-warning" role="alert">
                    Дугаарыг үүсгэж байна. Түр хүлээнэ үү!
                    <Progress value={ progress_value } label={ progress_label }/>
                </div>
            )
        }

        return (
            <Fragment>
                { progress }
                <fieldset className="position-relative" disabled={ status == 'loading' }>
                    <SpinnerCover visible={ status == 'loading' }/>
                    <Form onSubmit={this.handleSubmit} />
                </fieldset>
            </Fragment>
        )
    }
}
