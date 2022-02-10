import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { ButtonCreate } from '@admin/components/ButtonCreate'

import { Table } from './Table'


export class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_loading: false,
            items: [],
            items_promise: null,
        }

        this.loadItems = this.loadItems.bind(this)
    }

    componentDidMount() {
        this.loadItems()
    }

    loadItems() {
        const promise = axiosInstance
            .get('/api/language/admin/all/')
            .then(({ is_success, items }) => {
                if (is_success) {
                    this.setState({ items })
                }
            })
        this.setState({ items_promise: promise })
    }

    render() {
        const { items } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1>Хэл</h1>
                    </div>
                    <div className="col-2 text-end">
                        <ButtonCreate to="/language/create/" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Loader promise={this.state.items_promise} reload={this.loadItems}>
                            <Table
                                items={items}
                            />
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
