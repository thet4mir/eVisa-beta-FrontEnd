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
        this.handleSortMove = this.handleSortMove.bind(this)
        this.handleSortMoveUp = this.handleSortMoveUp.bind(this)
        this.handleSortMoveDown = this.handleSortMoveDown.bind(this)
    }

    componentDidMount() {
        this.loadItems()
    }

    loadItems() {
        const promise = axiosInstance
            .get('/api/faq/admin/all/')
            .then(({ is_success, items }) => {
                if (is_success) {
                    this.setState({ items })
                }
            })
        this.setState({ items_promise: promise })
    }

    handleSortMove(item, fn_switch) {
        const items = [ ...this.state.items ]
        const idx = items.findIndex(v => v.id == item.id)
        fn_switch(items, idx)

        items.forEach((_item) => {
            if (_item.is_moved_last)
                _item.is_moved_last = false
        })
        item.is_moved_last = true

        const payload = {
            orders: items.map((item) => item.id)
        }

        const promise = axiosInstance
            .post('/api/faq/admin/save-sort/', payload)
            .then(({ is_success }) => {
                if (is_success)
                    this.setState({ items })
            })
        this.setState({ items_promise: promise })
    }

    handleSortMoveUp(item) {
        this.handleSortMove(item, (items, idx) => {
            if (idx > 0) {
                [ items[idx], items[idx - 1] ] = [ items[idx - 1], items[idx] ]
            }
        })
    }

    handleSortMoveDown(item) {
        this.handleSortMove(item, (items, idx) => {
            if (idx < items.length - 1) {
                [ items[idx], items[idx + 1] ] = [ items[idx + 1], items[idx] ]
            }
        })
    }

    render() {
        const { items } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1>Түгээмэл асуултууд</h1>
                    </div>
                    <div className="col-2 text-end">
                        <ButtonCreate to="/faq/create/"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Loader promise={ this.state.items_promise } reload={ this.loadItems }>
                            <Table
                                items={ items }
                                onMoveUp={ this.handleSortMoveUp }
                                onMoveDown={ this.handleSortMoveDown }
                            />
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}
