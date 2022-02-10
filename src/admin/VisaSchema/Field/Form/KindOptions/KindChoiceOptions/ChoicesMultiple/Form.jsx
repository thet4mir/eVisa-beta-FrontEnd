import React, { Component } from 'react'

import { InputText, FieldError, FieldHelp } from '@admin/components/Form'


export class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            values: props.values || props.defaults,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate(prevProps) {

        const values_old = prevProps.values || props.defaults
        const values_new = this.props.values || props.defaults

        const is_changed = (
            values_old.id !== values_new.id ||
            values_old.code_name !== values_new.code_name ||
            values_old.label !== values_new.label
        )

        if (is_changed) {
            this.setState({ values: values_new })
        }

    }

    handleChange(name, value) {
        const { values } = this.state

        values[name] = value

        this.setState({ values })
        this.props.onChange(values)
    }

    render() {

        const { values } = this.state
        const { className, id_prefix } = this.props
        const errors = this.props.errors || {}

        const getOpts = (name) => ({
            name: name,
            value: values[name],
            errors: errors[name],
            is_validated: this.props.is_validated,
            onChange: this.handleChange,
        })

        return (
            <div className={ "row " + (className || '') }>

                <div className="col-sm-6">
                    <InputText { ...getOpts('code_name') }
                        placeholder="код (code_name)"
                        id_prefix={ id_prefix }
                    />
                </div>

                <div className="col-sm-6">
                    <InputText { ...getOpts('label') }
                        placeholder="харагдах нэр"
                        id_prefix={ id_prefix }
                    />
                </div>

            </div>

        )
    }
}
