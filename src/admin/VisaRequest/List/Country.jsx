import React, { Component, Fragment } from 'react'

import { axiosInstance } from '@/service'


export class Country extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            country_promise: null,
        }
    }

    componentDidMount() {
        this.loadItems()
    }

    sendSelectedCountry(e) {
        this.props.onChange(e.target.value)
    }

    loadItems() {
        const promise = axiosInstance
            .post('/api/country/all/')
            .then(({ is_success, items }) => {
                if(is_success) {
                    this.setState({ items })
                }
            })

        this.setState({ country_promise: promise })
    }

    handleChangeCountry(e) {
        const { value } = e.target
        this.setState({ value: e.target.value })
    }

    render() {
        const { items, value } = this.state

        return (
            <Fragment>
                <select
                    value={ value }
                    onChange={this.sendSelectedCountry.bind(this)}
                    className="form-select form-select"
                >
                    <option> ------ </option>
                    { items.map((item, idx) =>
                        <option key={ idx } value={ item.id }>{ item.name }</option>
                    )}
                </select>
            </Fragment>
        )
    }
}
