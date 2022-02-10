import React  from 'react'

import { Field } from './Field'



function isNumber(v) {
    return /^\d+(\.\d+)?$/.test(v)
}


export function InputNumber(props) {

    const {
        name,
        errors,
        label,
        help,
        placeholder,
        is_validated,
        control_only,
        onChange,
        ...other_props
    } = props

    const id = `id_${name}`

    const className = (
        "form-control" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    function handleChange(e) {

        let value = e.target.value

        if (isNumber(value)) {
                value = e.target.valueAsNumber
        }

        onChange(name, value)
    }

    const element = (
        <input
            type="number"
            id={ id }
            name={ name }
            placeholder={ placeholder }
            onChange={ handleChange }
            className={ className }
            { ...other_props }
        />
    )

    if (control_only) {
        return element
    } else {
        return (
            <Field { ...{ name, label, help, errors} }>
                { element }
            </Field>
        )
    }

}
