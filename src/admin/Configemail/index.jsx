import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Form } from './Form'


class Toast extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_open: true,
        }
    }

    render() {

        const { is_open } = this.state
        const { title, created_at, message, type } = this.props.values

        return (
            <div
                className={'toast' + (is_open ? ' show' : ' hide') }
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >

                <div className="toast-header">

                    { type == 'success' &&
                        <i className="bi bi-check-square-fill text-success me-1"></i>
                    }

                    { type == 'fail' &&
                        <i className="bi bi-x-square-fill text-danger me-1"></i>
                    }

                    <strong className="me-auto">{ title }</strong>
                    <small className="text-muted">{ created_at }</small>
                    <button type="button" className="btn-close"
                        data-bs-dismiss="toast" aria-label="Close"
                        onClick={ () => this.setState({ is_open: false }) }
                    ></button>

                </div>

                <div className="toast-body">

                    { message }

                </div>

            </div>
        )
    }
}


function Toasts(props) {

    return (
        <div className="toast-container position-absolute p-3 top-0 end-0">

            { props.toasts.map((toast, idx) =>
                <Toast values={ toast } key={ idx }/>
            )}

        </div>
    )
}


export default class Config extends Component {

    constructor(props) {
        super(props)

        this.state = {
            success_values: {},
            reject_values: {},
            languages: [],
            loader_promise: null,
            toasts: [],
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.sortLanguages = this.sortLanguages.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {

        const promise = Promise.all(
            [
                axiosInstance.get('/api/language/admin/all/'),
                axiosInstance.get('/api/config/admin/all/')
            ]
        ).then(([ rsp_languages, rsp_configs ]) => {

            const is_success = (
                rsp_languages.is_success &&
                rsp_configs.is_success
            )

            if (is_success) {

                const success_values = {}
                const reject_values = {}

                rsp_configs.configs.forEach((conf) => {

                    for (const field of ['subject', 'body']) {

                        if (conf.name.startsWith(`email_visa_success_${field}_`)) {

                            const lang_code = conf.name.substr(-2)
                            success_values[lang_code] = {
                                ...(success_values[lang_code] || {}),
                                [field]: conf.value,
                            }

                        }
                        if (conf.name.startsWith(`email_visa_reject_${field}_`)) {

                            const lang_code = conf.name.substr(-2)
                            reject_values[lang_code] = {
                                ...(reject_values[lang_code] || {}),
                                [field]: conf.value,
                            }

                        }

                    }

                })

                this.setState({
                    success_values,
                    reject_values,
                    languages: this.sortLanguages(rsp_languages.items),
                })

            }

        })

        this.setState({ loader_promise: promise })

    }

    sortLanguages(langs) {

        const langs_sorted = [ ...langs ]
        const idx_default = langs.findIndex((lang) => lang.is_default)

        if (idx_default !== -1) {
            const [ lang_default ] = langs_sorted.splice(idx_default, 1)
            langs_sorted.unshift(lang_default)
        }

        return langs_sorted

    }

    handleSubmit(kind, lang, values, callback) {

        const payload1 = {
            name: `email_visa_${kind}_subject_${lang.code_name}`,
            value: values.subject,
        }

        const payload2 = {
            name: `email_visa_${kind}_body_${lang.code_name}`,
            value: values.body,
        }


        const promise = Promise.all(
                [
                    axiosInstance.post('/api/config/admin/save/', payload1),
                    axiosInstance.post('/api/config/admin/save/', payload2),
                ]
        ).then(([ rsp1, rsp2 ]) => {

                if (rsp1.is_success && rsp2.is_success) {

                    const text = kind == 'success' ? 'олгохыг зөвшөөрсөн' : 'олгохоос татгалзсан'
                    const toast = {
                        type: 'success',
                        title: 'Мэйлийн тохиргоо!',
                        message: `Визийн ${text} мэйлийн тохиргоог ${lang.name} хэлээр амжилттай хадгаллаа!`,
                        created_at: (new Date()).toISOString().substr(11, 5),
                    }

                    this.setState({
                        toasts: [ ...this.state.toasts, toast ]
                    })

                    callback(true, {})

                } else {

                    callback(false, {
                        subject: rsp1.errors.value,
                        body: rsp2.errors.value,
                    })

                }

        }).catch((e) => {
            const text = kind == 'success' ? 'олгохыг зөвшөөрсөн' : 'олгохоос татгалзсан'
            const toast = {
                created_at: (new Date()).toISOString().substr(11, 5),
                type: 'fail',
                title: 'Мэйлийн тохиргоо!',
                message: `Визийн ${text} мэйлийн тохиргоог ${lang.name} хэлээр хадгалахад алдаа гарлаа!`,
            }

            this.setState({
                toasts: [ ...this.state.toasts, toast ]
            })

        })

        this.setState({ loader_promise: promise })

    }

    render() {

        const { languages, success_values, reject_values, toasts } = this.state

        return (
            <Loader promise={ this.state.loader_promise } reload={ this.loadDetail }>
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="col-6 offset-3">

                            <h1>Виз олгохыг зөвшөөрсөн мэйл</h1>

                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                        { languages.map((lang, idx) =>
                                            <li className="nav-item" key={ idx }>
                                                <button className={ "nav-link" + (idx == 0 ? ' active' : '') }
                                                data-bs-toggle="tab"
                                                data-bs-target={ `#success-tab-content-${idx}` }
                                                type="button"
                                            >
                                                    { lang.name_local }
                                            </button>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content p-0 m-0">
                                        { languages.map((lang, idx) =>
                                            <div key={ idx }
                                                className={ "tab-pane" + (idx == 0 ? ' active' : '') }
                                                id={ `success-tab-content-${idx}` }
                                            >
                                                <Form
                                                    language={ lang }
                                                    values={ success_values[lang.code_name] }
                                                    onSubmit={ (...args) => this.handleSubmit('success', lang, ...args) }
                                                />

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            { toasts &&
                                <Toasts toasts={ toasts }/>
                            }

                        </div>
                    </div>
                </div>
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="col-6 offset-3">

                            <h1>Виз олгохыг татгалзах мэйл</h1>

                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                        { languages.map((lang, idx) =>
                                            <li className="nav-item" key={ idx }>
                                                <button className={ "nav-link" + (idx == 0 ? ' active' : '') }
                                                data-bs-toggle="tab"
                                                data-bs-target={ `#reject-tab-content-${idx}` }
                                                type="button"
                                            >
                                                    { lang.name_local }
                                            </button>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content p-0 m-0">
                                        { languages.map((lang, idx) =>
                                            <div key={ idx }
                                                className={ "tab-pane" + (idx == 0 ? ' active' : '') }
                                                id={ `reject-tab-content-${idx}` }
                                            >
                                                <Form
                                                    language={ lang }
                                                    values={ reject_values[lang.code_name] }
                                                    onSubmit={ (...args) => this.handleSubmit('reject', lang, ...args) }
                                                />

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }

}
