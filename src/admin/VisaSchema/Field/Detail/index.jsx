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
            item: {},
            item_promise: null,
            items: [],
            language_promise: null,
        }

        this.loadDetail = this.loadDetail.bind(this)
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
            .post(`/api/visa/field/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }

    handleDelete() {
        const { item } = this.state

        const promise = axiosInstance
            .post(`/api/visa/field/${item.id}/delete/`, {})
            .then(({ is_success }) => {
                if (is_success) {
                    this.props.history.push('/visa-schema/field/')
                }
            })
        this.setState({ item_promise: promise })
    }

    render() {
        const { items, item } = this.state
        return (
            <Loader promise={ this.state.item_promise } reload={ this.loadDetail }>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-2">
                            <ButtonBack to="/visa-schema/field/"/>
                        </div>

                        <div className="col-10 text-end">
                            <ButtonEdit to={`/visa-schema/field/${item.id}/edit/`}/>
                            {} {!item.is_fixed && <ButtonDelete onClick={ this.handleDelete }/>}
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-12">

                            <h1>Талбар</h1>

                            <Main
                                language={ items }
                                item={ item }
                            />

                        </div>
                    </div>
                </div>

            </Loader>
        )
    }
}
