import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { Accordion } from '@/components/Accordion'


export class Language extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            language_list_promise: null,
            value: 0,
        }

        this.loadRows = this.loadRows.bind(this)
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
    }

    componentDidMount() {
        this.loadRows()
    }

    loadRows() {
        const promise = axiosInstance
            .get('/api/language/all/')
            .then(({ is_success, items }) => {
                if (is_success) {
                    this.setState({ items })
                    items.forEach((item) => {
                        if (item.is_default) {
                            this.setState({ value: item.id })
                        }
                    })
                }
            })

        this.setState({ language_list_promise: promise })
    }

    handleChangeLanguage(e) {
        const { value } = e.target
        this.setState({ value })
    }

    render() {
        const { items, value } = this.state;

        return (
            <select
                className="btn btn-secondary"
                value={ value }
                onChange={ this.handleChangeLanguage }
            >
                { items.map((item, idx) =>
                    <option key={ idx } value={ item.id }>{ item.name_local }</option>
                )}
            </select>
        )
    }

}
