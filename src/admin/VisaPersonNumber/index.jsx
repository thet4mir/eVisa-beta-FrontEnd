import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { List } from './List'
import { Generate } from './Generate'


export default class VisaPersonNumber extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items_promise: null,
            data: {},
        }
        this.loadItems = this.loadItems.bind(this)
    }

    componentDidMount() {
        this.loadItems()
    }

    loadItems() {
        const promise = axiosInstance
            .get('/api/visa/person-number/admin/statistics/')
            .then(({ is_success, ...data }) => {
                if (is_success) {
                    this.setState({ data })
                }
            })
        this.setState({ items_promise: promise })
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col">
                        <Loader promise={this.state.items_promise} reload={ this.loadItems }>
                            <List data={ this.state.data }/>
                        </Loader>
                    </div>

                    <div className="col">
                        <Generate onSuccess={ this.loadItems }/>
                    </div>
                </div>
            </div>
        )
    }
}
