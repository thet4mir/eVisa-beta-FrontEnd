import React, { Component } from 'react'

import { CheckboxMultiple } from '@admin/components/Form'

import { SearchForm } from './SearchForm'
import { splitArray } from './utils'


function filterCountry(query, items) {

    let items_filtered = items

    if (query) {

        const _query = query.toLowerCase()

        items_filtered = items.filter(
            ([k, v]) => v.toLowerCase().startsWith(_query)
        )

    }

    return items_filtered

}


export class Modal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.value || [],
            search_query: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    updateValue() {

    }

    componentDidUpdate(prevProps) {

        const value_old = prevProps.value || []
        const value_new = this.props.value || []

        if (value_old.length != value_new.length) {
            this.setState({ value: value_new })
        }

    }

    handleChange(name, value) {
        this.setState({ value })
        this.props.onChange(name, value)
    }

    handleSearch(search_query) {
        this.setState({ search_query })
    }

    render() {

        const { is_validated, name, label, options, errors } = this.props
        const { value, search_query } = this.state


        const options_filtered = filterCountry(search_query, options)
        const [ options1, options2, options3 ] = splitArray(options_filtered, 3)

        return (
            <div className="modal fade" id={ `${name}_modal` } tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{ label }</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <SearchForm onChange={ this.handleSearch }/>

                            <div className="container mt-3 ps-3">

                                <div className="row">

                                    <div className="col-4">
                                        <CheckboxMultiple
                                            { ...{ name, value, errors, is_validated } }
                                            options={ options1 }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className="col-4">
                                        <CheckboxMultiple
                                            { ...{ name, value, errors, is_validated } }
                                            options={ options2 }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className="col-4">
                                        <CheckboxMultiple
                                            { ...{ name, value, errors, is_validated } }
                                            options={ options3 }
                                            onChange={ this.handleChange }
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Хаах</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
