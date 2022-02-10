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
        this.DeclineRequest = this.DeclineRequest.bind(this)
        this.ApproveRequest = this.ApproveRequest.bind(this)
    }

    DeclineRequest() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/admin/${id}/decline/`, {'language': 'en'})
            .then(({ is_success, item }) => {
                if (is_success, item) {
                    this.setState({ item: item })
                    this.props.history.push(`/visarequest/`)
                }
            })
        this.setState({ item_promise: promise })
    }

    ApproveRequest() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/admin/${id}/approve/`,{'language': 'en'})
            .then(({ is_success, item }) => {
                if (is_success) {
                    this.setState({ item: item })
                    this.props.history.push(`/visarequest/`)
                }
            })
        this.setState({ item_promise: promise })
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {
        const { id } = this.props.match.params

        const promise = axiosInstance
            .post(`/api/visa/admin/${id}/`)
            .then(({ is_success, item }) => {
                if (is_success) {
                    this.setState({ item })
                }
            })
        this.setState({ item_promise: promise })
    }



    render() {

        const { item } = this.state
        return(
            <Loader promise={ this.state.item_promise } reload={ this.loadDetail }>

                <div className="container">
                    <div className="row">

                        <div className="col-8">
                            <ButtonBack to="/visarequest/"/>
                        </div>

                        <div className="col-4">
                            <dl className="row justify-content-end">
                                <dt className="col-6">Шийдвэрлэсэн ажилтан:</dt>
                                <dd className="col-5">
                                <p className="fs-6 fs-light">
                                    {item.updated_by}
                                    </p>
                                </dd>
                            </dl>
                        </div>

                        <div className="row mt-3">
                            <div className="col-12">
                                <Main
                                    item={ item }
                                    onDecline={ this.DeclineRequest }
                                    onApprove={ this.ApproveRequest }
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </Loader>
        )
    }

}
