import React, { Component } from 'react'

import { InputNumber, FieldError, FieldHelp } from '@admin/components/Form'


export class DiscountForm extends Component {

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
            values_old.num_person !== values_new.num_person ||
            values_old.percent !== values_new.percent
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
        const { className } = this.props
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

                <div className="col-sm-4">
                    <div className={ "input-group" + (errors['num_person'] ? ' has-validation' : '') }>

                        <InputNumber { ...getOpts('num_person') }
                            placeholder="###"
                            control_only={ true }
                            min="2"
                        />

                        <span className="input-group-text">хүн</span>

                        <FieldError errors={ errors['num_person'] }/>

                    </div>
                </div>

                <div className="col-sm-4">
                    <div className={ "input-group" + (errors['percent'] ? ' has-validation' : '') }>

                        <InputNumber { ...getOpts('percent') }
                            placeholder="хувь"
                            control_only={ true }
                            min="0"
                            step="0.01"
                            max="100"
                        />

                        <span className="input-group-text">%</span>

                        <FieldError errors={ errors['percent'] }/>

                    </div>
                </div>

                <div className="col-sm-4">
                    { values.num_person && values.percent
                        ?
                            <FieldHelp
                                className="mt-0"
                                help={ `${values.num_person}-с доошгүй хүн бол ${values.percent}% хямдарна` }
                            />
                        :
                            null
                    }
                </div>
            </div>

        )
    }
}
