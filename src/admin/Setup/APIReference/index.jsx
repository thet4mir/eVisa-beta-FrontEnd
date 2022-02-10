import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'


export default class APIReference extends Component {

    constructor(props) {
        super(props)

        this.state = {
            document: '',
            document_promise: null,
        }

        this.loadDocument = this.loadDocument.bind(this)
    }

    componentDidMount() {
        this.loadDocument()
    }

    loadDocument() {
        const { id } = this.props.match.params

        const { hash } = this.props.history.location
        window.location.hash = ''

        const promise = axiosInstance
            .get(`/api/doc/all/`)
            .then((document) => {
                this.setState({ document }, () => {
                    window.location.hash = hash
                })
            })
        this.setState({ document_promise: promise })
    }

    render() {
        const { document } = this.state
        return (
            <Loader promise={ this.state.document_promise } reload={ this.loadDocument }>
                <div dangerouslySetInnerHTML={{ __html: document }}></div>
            </Loader>
        )
    }

}
