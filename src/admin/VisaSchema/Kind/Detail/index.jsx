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
            { props.message_text }
        </div>
    )
}


export class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: [],
            item_promise: null,
            is_message: false,
            message_text: '',
            items: [],
            language_promise: null,
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleToggleActive = this.handleToggleActive.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.loadLanguage = this.loadLanguage.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
        this.loadLanguage()
    }

    loadLanguage(){
        const promise = axiosInstance
            .get(`/api/language/admin/all/`)
            .then(({ is_success, items }) => {
                if ( is_success ) {
                    this.setState({ items })
                }
            })
        this.setState({ language_promise: promise })
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/kind/${id}/`)
            .then(({ is_success, item }) => {
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
            .post(`/api/visa/kind/${item.id}/toggle-active/`, payload)
            .then(({ is_success }) => {
                if ( is_success ) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }


    handleDelete() {
        const { item } = this.state

        const promise = axiosInstance
            .post(`/api/visa/kind/${item.id}/delete/`, {})
            .then(({ is_success, errors }) => {
                if (is_success) {
                    this.props.history.push('/visa-schema/kind/')
                } else {
                    this.setState({
                        is_message: true,
                        message_text: errors,
                    })
                }
            })
        this.setState({ item_promise: promise })
    }

    render() {
        const { item,items } = this.state
        const { is_message } = this.state
        const { message_text } = this.state

        return (
            <Loader promise={ this.state.item_promise } reload={ this.loadDetail }>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-2">
                            <ButtonBack to="/visa-schema/kind/"/>
                        </div>

                        <div className="col-10 text-end">
                            <ButtonEdit to={`/visa-schema/kind/${item.id}/edit/`}/>
                            {} <ButtonDelete onClick={ this.handleDelete }/>
                        </div>

                    </div>
                    <div className="row mt-3">
                        { is_message
                            ?
                                <Message message_text={message_text}/>
                            :
                                null
                        }
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Main
                                language={items}
                                item={ item }
                                onToggleActive={ this.handleToggleActive }
                            />
                        </div>
                    </div>
                </div>

            </Loader>
        )
    }
}
