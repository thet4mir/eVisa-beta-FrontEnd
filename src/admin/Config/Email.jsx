import React, { Component } from 'react'

import { axiosInstance } from '@/service'


export class Email extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...props.values,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.values.email_user != prevProps.values.email_user) {
            this.setState({ email_user: this.props.values.email_user })
        }
        if (this.props.values.email_password != prevProps.values.email_password) {
            this.setState({ email_password: this.props.values.email_password })
        }
        if (this.props.values.email_host != prevProps.values.email_host) {
            this.setState({ email_host: this.props.values.email_host })
        }
        if (this.props.values.email_port != prevProps.values.email_port) {
            this.setState({ email_port: this.props.values.email_port })
        }
    }

    handleChange(field, e) {
        this.setState({
            [field]: e.target.value,
        })
    }

    handleSubmit(e) {
        const values = this.state

        for (let key in values) {

            const payload = {
                name: key,
                value: values[key]
            }

            axiosInstance
                .post('/api/config/admin/save/', payload)
                .then((rsp) => {
                    console.log(rsp);
                })
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <h1>Email</h1>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('email_user', e)} value={this.state.email_user} />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('email_password', e)} value={this.state.email_password} />
                        </div>

                        <div className="mb-3">
                            <label>SMTP Host</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('email_host', e)} value={this.state.email_host} />
                        </div>

                        <div className="mb-3">
                            <label>SMTP Port</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('email_port', e)} value={this.state.email_port} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </div>

            </div>
        )
    }

}
