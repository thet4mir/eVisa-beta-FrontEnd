import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { ButtonBack } from '@admin/components/ButtonBack'
import { ButtonEdit } from '@admin/components/ButtonEdit'
import { ButtonDelete } from '@admin/components/ButtonDelete'

import { Main } from './Main'


function Message(props) {
        return (
            <div className="alert alert-warning" role="alert">
                {props.message_text}
            </div>
        )
}

export class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loading: false,
            item: [],
            item_promise: null,
            is_default: false,
            is_message: false,
            message_text: ''
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleToggleActive = this.handleToggleActive.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDefault = this.handleDefault.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .get(`/api/language/admin/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }

    handleDefault() {
        const { item } = this.state
        item.is_default = !item.is_default

        const promise = axiosInstance
            .post(`/api/language/admin/${item.id}/set-default/`)
            .then(({ is_success }) => {
                if (is_success) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }

    handleToggleActive() {
        const { item } = this.state
        item.is_active = !item.is_active

        const payload = { is_active: item.is_active }

        const promise = axiosInstance
            .post(`/api/language/admin/${item.id}/toggle-active/`, payload)
            .then(({ is_success }) => {
                if (is_success) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }


    handleDelete() {
        const { item } = this.state

        const promise = axiosInstance
            .post(`/api/language/admin/${item.id}/delete/`, {})
            .then(({ is_success, error }) => {
                if (is_success) {
                    this.props.history.push('/language/')
                }
                else {
                    this.setState({
                        is_message: true,
                        message_text: error,
                    })
                }
            })
        this.setState({ item_promise: promise })
    }

    render() {
        const { item } = this.state
        const { is_message } = this.state
        const { message_text } = this.state
        return (
            <Loader promise={ this.state.item_promise } reload={ this.loadDetail }>

                <div className="container">
              
                    <div className="row">

                        <div className="col-2">
                            <ButtonBack to="/language/"/>
                        </div>

                        <div className="col-10 text-end">
                            <ButtonEdit to={`/language/${item.id}/update/`} />
                            { } <ButtonDelete onClick={ this.handleDelete } />
                        
                        </div>

                    </div>
                    <div className="row mt-3">
                        {
                            is_message ?
                            <Message message_text={message_text} />
                            :
                            null
                        }
                         
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Main
                                item={ item }
                                onToggleActive={ this.handleToggleActive }
                                onSetDefault={this.handleDefault}
                            />
                        </div>
                    </div>
                </div>

            </Loader>
        )
    }
}
