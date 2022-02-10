import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { ButtonBack } from '@admin/components/ButtonBack'

import { Main } from './Main'


export class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: [],
            item_promise: null,
        }

        this.loadDetail = this.loadDetail.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/error500/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    this.setState({ item })
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
                            <ButtonBack to="/setup/error500/"/>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Main item={ item }/>
                        </div>
                    </div>
                </div>

            </Loader>
        )
    }
}
