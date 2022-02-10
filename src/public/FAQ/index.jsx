import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'
import { Accordion } from '@/components/Accordion'


export class FAQ extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rows: [],
            faq_list_promise: null,
        }

        this.loadRows = this.loadRows.bind(this)
    }

    componentDidMount() {
        this.loadRows()
    }

    loadRows() {
        const promise = axiosInstance
            .get('/api/faq/all/')
            .then(({ is_success, items }) => {
                if (is_success) {
                    const rows = items.map(({ question, answer }) => {
                        return {
                            title: question,
                            body: answer,
                        }
                    })
                    this.setState({ rows })
                }
            })

        this.setState({ faq_list_promise: promise })
    }

    render() {
        const { rows } = this.state
        return (
            <Loader promise={ this.state.faq_list_promise } reload={ this.loadRows }>
                <Accordion rows={ rows } id="faq-list"/>
            </Loader>
        )
    }
}
