import React, { Component } from 'react'

import { axiosInstance } from '@/service'


export class Captcha extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...props.values,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.values.recaptcha_is_active != prevProps.values.recaptcha_is_active) {
            this.setState({recaptcha_is_active: this.props.values.recaptcha_is_active})
        }
        if (this.props.values.recaptcha_secret_key != prevProps.values.recaptcha_secret_key) {
            this.setState({recaptcha_secret_key: this.props.values.recaptcha_secret_key})
        }
        if (this.props.values.recaptcha_site_key != prevProps.values.recaptcha_site_key) {
            this.setState({recaptcha_site_key: this.props.values.recaptcha_site_key})
        }
        if (this.props.values.recaptcha_verify_url != prevProps.values.recaptcha_verify_url) {
            this.setState({recaptcha_verify_url: this.props.values.recaptcha_verify_url})
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
                name:key,
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
                        <h1>Captcha</h1>
                        <div className="mb-3">
                            <label>reCAPTCHA Secret Key</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('recaptcha_is_active', e)} value={this.state.recaptcha_is_active} placeholder="Site дээр reCAPTCHA-г идэвхжүүлэх бол yes идэвхгүй болгох бол no гэж бичнэ үү!" />
                        </div>
                        <div className="mb-3">
                            <label>reCAPTCHA Secret Key</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('recaptcha_secret_key', e)} value={this.state.recaptcha_secret_key} />
                        </div>
                        <div className="mb-3">
                            <label>reCAPTCHA Site Key</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('recaptcha_site_key', e)} value={this.state.recaptcha_site_key} />
                        </div>
                        <div className="mb-3">
                            <label>reCAPTCHA Verify URL</label>
                            <input type="text" className="form-control" onChange={(e) => this.handleChange('recaptcha_verify_url', e)} value={this.state.recaptcha_verify_url} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </div>

            </div>
        )
    }
}
