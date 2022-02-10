import React  from 'react'

import { Field } from './Field'


export function Select(props) {

    const { name, errors, label, help, options, is_validated, onChange, ...other_props } = props
    const id = `id_${name}`

    const className = (
        "form-select" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    const error = (
        (errors && errors.length)
            ? errors[0]
            : null
    )

    function handleChange(e) {
        let { value } = e.target
        const idx = (options || []).findIndex(([ v, text ]) => v == value)
        if (idx > -1) {
            value = options[idx][0]
        }
        onChange(name, value)
    }

    return (
        <Field { ...{ name, label, help, errors } }>

            <select
                id={ id }
                name={ name }
                className={ className }
                onChange={ handleChange }
                { ...other_props }
            >
                { (options || []).map(([ value, text ], idx) =>
                    <option key={ idx } value={ value }>{ text }</option>
                )}
            </select>


        </Field>
    )
}
