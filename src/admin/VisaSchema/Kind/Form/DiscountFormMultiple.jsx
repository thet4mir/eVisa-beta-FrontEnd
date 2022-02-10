import React, { Component, Fragment } from 'react'

import { DiscountForm } from './DiscountForm'

import { FieldLabel } from '@admin/components/Form'


export class DiscountFormMultiple extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: props.value || [],
        }

        this.defaults = {
            num_person: '',
            percent: '',
        }

        this.isNotEmpty = this.isNotEmpty.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addItemIfNecessary = this.addItemIfNecessary.bind(this)
    }

    componentDidMount() {
        this.addItemIfNecessary(this.state.items, true)
    }

    componentDidUpdate(prevProps) {

        const items_old = prevProps.value
        const items_new = this.props.value

        const old_is_array = Array.isArray(prevProps.value)
        const new_is_array = Array.isArray(this.props.value)

        if (!old_is_array && new_is_array) {
            this.addItemIfNecessary([ ...items_new ], true)
        }

        if (old_is_array && new_is_array) {

            const is_changed = (
                items_old.length != items_new.length ||
                items_old.reduce((acc, v, i) => acc || items_new[i].id != v.id, false)
            )

            if (is_changed) {
                this.addItemIfNecessary([ ...items_new ], true)
            }

        }
    }

    addItemIfNecessary(items, do_update_state) {

        if (items.length == 0 || this.isNotEmpty(items[items.length - 1])) {
            items.push({ ...this.defaults })
        }

        if (do_update_state) {
            this.setState({ items })
        }

    }

    isNotEmpty(item) {
        return (item.num_person || item.percent)
    }

    handleChange(idx, item) {

        let { items } = this.state
        const { name } = this.props
        items[idx] = item
        items = items.filter(this.isNotEmpty)

        this.props.onChange(name, [ ...items ])

        this.addItemIfNecessary(items, false)

        this.setState({ items })
    }

    render() {

        const { is_validated } = this.props
        const { items } = this.state
        const errors = this.props.errors || []

        return (
            <Fragment>

                <FieldLabel name="num_person" label="Хөнгөлөлтийн хувь"/>

                { items.map((item, idx) =>
                    <DiscountForm
                        key={ idx }
                        className={ idx ? 'mt-3' : '' }
                        is_validated={ is_validated }
                        values={ item }
                        errors={ errors[idx] || [] }
                        onChange={ (values) => this.handleChange(idx, values) }
                        defaults={ this.defaults }
                    />
                )}

            </Fragment>
        )
    }
}


