import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { ButtonBack } from '@admin/components/ButtonBack'
import { ButtonEdit } from '@admin/components/ButtonEdit'
import { ButtonDelete } from '@admin/components/ButtonDelete'

import { Main } from './Main'


export class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loading: false,
            item: [],
            item_promise: null,
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.handleToggleActive = this.handleToggleActive.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/user/${id}/`)
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
            .post(`/api/user/${item.id}/toggle-active/`, payload)
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
            .post(`/api/user/${item.id}/remove/`, {})
            .then(({ is_success }) => {
                if (is_success) {
                    this.props.history.push('/user/')
                }
            })
        this.setState({ item_promise: promise })
    }

    render() {
        const { item } = this.state
        return (
            <Loader promise={ this.state.item_promise } reload={ this.loadDetail }>

                <div className="container">
                    <div className="row">

                        <div className="col-2">
                            <ButtonBack to="/user/"/>
                        </div>

                        <div className="col-10 text-end">
                            <ButtonEdit to={`/user/${item.id}/edit/`}/>
                            {} <ButtonDelete onClick={ this.handleDelete }/>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Main
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
