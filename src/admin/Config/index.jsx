import React, { Component } from 'react'

import { axiosInstance } from '@/service'

import { Email } from './Email'
import { Captcha } from './Captcha'


export default class Config extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loading: true,
            config_email: {
                email_user: '',
                email_password: '',
                email_host: '',
                email_port: '',
            },
            config_captcha: {
                recaptcha_is_active: '',
                recaptcha_secret_key: '',
                recaptcha_site_key: '',
                recaptcha_verify_url: '',
            },
        }
    }

    componentDidMount() {
        axiosInstance
            .get('/api/config/admin/all/')
            .then(({ configs, is_success }) => {
                if (is_success) {

                    const config_email = {}

                    for (const { name, value } of configs) {

                        if (name == 'email_user') {
                            config_email[name] = value
                        }
                        if (name == 'email_password') {
                            config_email[name] = value
                        }
                        if (name == 'email_host') {
                            config_email[name] = value
                        }
                        if (name == 'email_port') {
                            config_email[name] = value
                        }
                    }

                    const config_captcha = {}

                    for (const { name, value } of configs) {

                        if (name == 'recaptcha_is_active') {
                            config_captcha[name] = value
                        }
                        if (name == 'recaptcha_secret_key') {
                            config_captcha[name] = value
                        }
                        if (name == 'recaptcha_site_key') {
                            config_captcha[name] = value
                        }
                        if (name == 'recaptcha_verify_url') {
                            config_captcha[name] = value
                        }
                    }


                    this.setState({
                        config_email,
                        config_captcha,
                        is_loading: false,
                    })

                } else {
                    // TODO
                }
            })
    }

    render() {
        return (
            <div>
                { !this.is_loading &&
                    <Email values={ this.state.config_email }/>
                }
                { !this.is_loading &&
                    <Captcha values={ this.state.config_captcha }/>
                }
            </div>
        )
    }

}
