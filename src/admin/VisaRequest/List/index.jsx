import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { Pagination } from "@/components/Pagination"

import { Table } from './Table'
import { Search } from './components'


export class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loading: false,

            results : [],
            total_approve: [],
            total_decline: [],
            total_new: [],
            total_record: 0,
            total_page: 0,

            items_promise: null,
            initialPage: 1,
            pageSize: 25,
            payload: {
                page: 1,
                text: '',
                country: '',
                start_date: '',
                end_date: '',
                status: '',
                sort_key: 'created_at',
                sort_direction: 'desc',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }

    onChangePage(pageOfItems) {

        const payload = {
            ...this.state.payload,
            page: pageOfItems,
        }

        this.setState({ payload })
        this.loadItems(payload)
    }

    handleChange(field, value) {

        const payload = {
            ...this.state.payload,
            [field]: value,
        }

        this.setState({ payload })
    }

    handleSort(sort_key, sort_direction) {

        const payload = {
            ...this.state.payload,
            sort_key,
            sort_direction,
        }

        this.setState({ payload })
        this.loadItems(payload)
    }

    handleSearch(search_payload) {
        const { payload } = this.state
        this.setState({ payload : search_payload })
        this.loadItems(search_payload)
    }

    componentDidMount(){
        this.loadItems(this.state.payload)
    }

    loadItems(search_payload){

        const promise_visa = axiosInstance

            .post('/api/visa/admin/list/', search_payload)
            .then(({is_success, results, total_record, total_approve, total_decline, total_new, total_page, page}) => {

                if(is_success) {
                    results.sort((a, b) => a.dead_line - b.dead_line )

                    this.setState({
                        results: results,
                        total_record: total_record,
                        total_approve : total_approve,
                        total_decline : total_decline,
                        total_new : total_new,
                        total_page: total_page,
                        initialPage: page,
                    })
                }
            })
        this.setState({ items_promise: promise_visa })
    }

    render (){

        const {
            initialPage,
            results, total_page,
            total_record,
            pageSize,
            total_approve,
            total_decline,
            total_new,
            payload
        } = this.state


        return (
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1>Визийн хүсэлт</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">

                        <Loader promise={ this.state.items_promise } reload={ this.loadItems } >

                            <Search
                                payload={ payload }
                                onChange={ this.handleChange }
                                onSubmit={ this.handleSearch }
                            />

                            <Table
                                items={results}
                                total_record={total_record}
                                total_approve={total_approve}
                                total_decline={total_decline}
                                total_new={total_new}
                                sort_key={ payload.sort_key }
                                sort_direction={ payload.sort_direction }
                                onSort={ this.handleSort }

                            />

                            <Pagination
                                items={results}
                                initialPage={initialPage}
                                pageSize={pageSize}
                                totalPage={total_page}
                                total_approve={total_approve}
                                total_decline={total_decline}
                                total_new={total_new}
                                itemLen={total_record}
                                onChangePage={this.onChangePage}

                            />

                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
