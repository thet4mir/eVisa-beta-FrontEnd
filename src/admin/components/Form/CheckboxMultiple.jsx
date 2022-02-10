import React  from 'react'

import { Field } from './Field'


export function CheckboxMultiple(props) {

    const { name, errors, label, help, options, is_validated, value, onChange, ...other_props } = props

    const error = (
        (errors && errors.length)
            ? errors[0]
            : null
    )

    const className = (
        "form-check-input" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    function handleChange(name, _value, checked) {
        const selected_values = value
        const idx = selected_values.indexOf(_value)

        if (checked) {
            if (idx == -1) {
                selected_values.push(_value)
            }
        } else {
            selected_values.splice(idx, 1)
        }
        onChange(name, selected_values)
    }

    const opts = options || []

    return (
        <Field { ...{ name, label, help } }>

            { opts.map(([ _value, text ], idx) => {

                const is_last = idx == (opts.length - 1)
                const id = `id_${name}_${_value}`

                return (
                    <div className="form-check" key={ idx }>

                        <input
                            type="checkbox"
                            className={ className }
                            name={ name }
                            id={ id }
                            value={ _value }
                            checked={ (value || []).includes(_value) }
                            onChange={ (e) => handleChange(name, _value, e.target.checked) }
                            { ...other_props }
                        />

                        <label className="form-check-label" htmlFor={ id }>
                            { text }
                        </label>

                        { error && is_last &&
                            <div className="invalid-feedback">{ error }</div>
                        }

                    </div>
                )
            })}

        </Field>
    )
}
