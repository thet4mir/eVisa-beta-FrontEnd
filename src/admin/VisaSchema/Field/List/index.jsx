import React, { Component } from 'react'

import { ButtonCreate } from '@admin/components'
import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Table } from './Table'


export class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
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
            .post('/api/visa/field/all/', {})
            .then(({ is_success, items }) => {
                if (is_success) {
                    this.setState({ items })
                }
            })
        this.setState({ items_promise: promise })
    }

    render () {
        const { items, items_promise } = this.state
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                        <h1>Талбарууд</h1>
                    </div>
                    <div className="col-2 text-end">
                        <ButtonCreate to="/visa-schema/field/create/"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Loader promise={ this.state.items_promise } reload={ this.loadItems }>
                            <Table
                                items={ items }
                            />
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
