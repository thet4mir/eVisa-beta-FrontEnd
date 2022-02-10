import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { ButtonCreate } from '@admin/components/ButtonCreate'

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
            .post('/api/visa/document/all/')
            .then(({ is_success, items}) => {
                if (is_success) {
                    this.setState({ items })
                }
            })
        this.setState({ items_promise: promise})
    }

    render() {
        const { items } = this.state

        const main_content = (
            <Table
                items={ items }
            />
        )

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                        <h1>Бичиг баримт</h1>
                    </div>
                    <div className="col-2 text-end">
                        <ButtonCreate to="/visa-schema/document/create/"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Loader promise={ this.state.items_promise } spinner={false} reload={this.loadItems}>
                            { main_content }
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
