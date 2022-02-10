import React, { Component, Fragment } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { SpinnerCover } from './Spinner'


function PageRequestTimedOut(props) {
    const handleReload = (e) => {
        e.preventDefault()
        props.onReload()
    }
    return (
        <div className="alert alert-danger fade show" role="alert">
            Loading this page took longer than expected.
            { props.onReload &&
                <Fragment>
                    {} <a href="#" className="alert-link" onClick={ handleReload }>Click here</a>
                    {} to try again.
                </Fragment>
            }
        </div>
    )
}


function PageNotFound(props) {
    return (
        <div className="alert alert-warning fade show" role="alert">
            <h4 className="alert-heading">404 Not Found</h4>
            <p>The page you requested doesn't exist!</p>
        </div>
    )
}


function PageLoginRequired(props) {
    return (
        <div className="alert alert-warning fade show" role="alert">
            <h4 className="alert-heading">Login required</h4>
            <p>
                You need to login to view this content.<br/>
                <NavLink to="/login/" className="alert-link">Click here</NavLink> to login.
            </p>
        </div>
    )
}


function PageMissingPermission(props) {
    return (
        <div className="alert alert-danger fade show" role="alert">
            <h4 className="alert-heading">Permission required</h4>
            <p>
                You are not privileged to view this page.<br/>
                Please contact authorized personnel to access this content.
            </p>
        </div>
    )
}


function PageUnhandledException(props) {
    const handleReload = (e) => {
        e.preventDefault()
        props.onReload()
    }
    return (
        <div className="alert alert-danger fade show" role="alert">
            We cannot process your request at the moment. Please try again later!

            { props.onReload &&
                <Fragment>
                    {} Or <a href="#" className="alert-link" onClick={ handleReload }>click here</a>
                    {} to try again.
                </Fragment>
            }
        </div>
    )
}


export class Loader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            is_loading: false
        }
        this.handlePromise = this.handlePromise.bind(this)
        this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
        this.handlePromise(this.props.promise)
        this.is_component_active = true
    }

    componentDidUpdate(prevProps) {
        if (this.props.promise != prevProps.promise) {
            this.handlePromise(this.props.promise)
        }
    }

    componentWillUnmount() {
        this.is_component_active = false
    }

    handlePromise(promise) {
        if (!promise) return

        this.setState({ is_loading: true, error: null })

        promise
            .catch(error => {
                if (error.isAxiosError) {
                    if (this.is_component_active) {
                        this.setState({ error })
                    }
                } else {
                    return Promise.reject(error)
                }
            })
            .finally(() => {
                if (this.is_component_active) {
                    this.setState({ is_loading: false })
                }
            })
    }

    handleReload() {
        const { reload } = this.props
        reload && reload()
    }

    render() {
        const { is_loading, error, reload } = this.state

        if (error) {

            if (!error.response) {
                return <PageRequestTimedOut onReload={ reload && this.handleReload }/>
            }

            const { status, data } = error.response
            if (status == 404) {
                return <PageNotFound/>
            }

            if (status == 401 && data.error == 'login-required') {
                return <PageLoginRequired/>
            }

            if (status == 401 && data.error == 'missing-permission') {
                return <PageMissingPermission/>
            }

            console.error({ error })

            return <PageUnhandledException onReload={ reload && this.handleReload }/>
        }

        if (this.props.children) {
            return (
                <fieldset className="position-relative" disabled={ is_loading }>
                    <SpinnerCover visible={ is_loading }/>
                    { this.props.children }
                </fieldset>
            )
        } else {
            return null
        }
    }

}
