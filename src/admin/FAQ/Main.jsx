import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { Form } from './Form'



export default class FAQLanguage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            languages: [],
            loader_promise: null,
        }

        this.loadDetail = this.loadDetail.bind(this)
        this.sortLangueges = this.sortLangueges.bind(this)
    }

    componentDidMount() {
        this.loadDetail()
    }

    loadDetail() {

        const promise = Promise.all(
            [
                axiosInstance.get('/api/language/admin/all/')
            ]
        ).then(([ rsp_languages ]) => {

            const is_success = (
                rsp_languages.is_success
            )

            if (is_success) {

                

            }

        })

    }

}