import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import { Loader } from '@/components/Loader'
import { axiosInstance } from '@/service'


export default class Logout extends Component {

    constructor(props) {
        super(props)
        this.state = { logout_promise: null }
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        this.handleLogout()
    }

    handleLogout() {
        const promise = axiosInstance
            .post('/api/auth/logout/')
            .then(({ is_success }) => {
                if (is_success) {
                    window.dispatchEvent(new CustomEvent('auth_changed'))
                    this.props.history.push('/logout-success/')
                }
            })

        this.setState({ logout_promise: promise })
    }

    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="alert alert-info fade show" role="alert">
                            Please wait while we log you out...
                        </div>
                        <Loader promise={ this.state.logout_promise } reload={ this.handleLogout }>
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
