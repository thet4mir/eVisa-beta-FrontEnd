import React, { Component, Fragment } from 'react'

import { FieldLabel } from '@admin/components/Form'

import { Form } from './Form'


export class ChoicesMultiple extends Component {

    constructor(props) {

        super(props)

        this.state = {
            items: props.value || [],
        }

        this.defaults = {
            label: '',
            code_name: '',
        }

        this.isNotEmpty = this.isNotEmpty.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addItemIfNecessary = this.addItemIfNecessary.bind(this)

    }

    componentDidMount() {
        this.addItemIfNecessary(this.state.items)
    }

    componentDidUpdate(prevProps) {

        const items_old = prevProps.value
        const items_new = this.props.value

        const old_is_array = Array.isArray(prevProps.value)
        const new_is_array = Array.isArray(this.props.value)

        if (!old_is_array && new_is_array) {
            this.addItemIfNecessary([ ...items_new ])
        }

        if (old_is_array && new_is_array) {

            const is_changed = (
                items_old.length != items_new.length ||
                items_old.reduce((acc, v, i) => acc || items_new[i].id != v.id, false)
            )

            if (is_changed) {
                this.addItemIfNecessary([ ...items_new ])
            }

        }
    }

    addItemIfNecessary(items) {

        if (items.length == 0 || this.isNotEmpty(items[items.length - 1])) {
            items.push({ ...this.defaults })
        }

        this.setState({ items })

    }

    isNotEmpty(item) {
        return (item.label || item.code_name)
    }

    handleChange(idx, item) {

        let { items } = this.state
        const { name } = this.props
        items[idx] = item
        items = items.filter(this.isNotEmpty)

        this.props.onChange(name, [ ...items ])

        this.addItemIfNecessary(items)

    }

    render() {

        const { is_validated } = this.props
        const { items } = this.state
        const errors = this.props.errors || []

        return (
            <Fragment>

                <div className="row">
                    <div className="col-sm-6">
                        <FieldLabel name="code_name" label="Код (code_name)" id_prefix="choice-0"/>
                    </div>
                    <div className="col-sm-6">
                        <FieldLabel name="label" label="Харагдах нэр" id_prefix="choice-0"/>
                    </div>
                </div>

                { items.map((item, idx) =>
                    <Form
                        key={ idx }
                        id_prefix={ `choice-${idx}` }
                        className="mt-3"
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
