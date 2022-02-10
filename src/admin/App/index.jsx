import React, { Component, Fragment } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Layout } from '../Layout'
import { Routes } from './Routes'


export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            current_user_promise: null,
            current_user: {
                is_authenticated: false,
                is_superuser: false,
            }
        }

        this.loadCurrentUser = this.loadCurrentUser.bind(this)
    }

    componentDidMount() {
        this.loadCurrentUser()
        window.addEventListener('auth_changed', this.loadCurrentUser)
    }

    componentWillUnmount() {
        window.removeEventListener('auth_changed', this.loadCurrentUser)
    }

    loadCurrentUser() {

        const promise = axiosInstance
            .get('/api/auth/me/')
            .then(({ is_success, current_user }) => {
                if (is_success) {
                    this.setState({ current_user })
                }
            })

        this.setState({ current_user_promise: promise })
    }

    render() {
        const { current_user } = this.state

        return (
            <Layout current_user={ current_user }>

                <Loader promise={ this.state.current_user_promise } reload={ this.loadCurrentUser }>
                    <Routes current_user={ current_user }/>
                </Loader>

            </Layout>
        )
    }

}
