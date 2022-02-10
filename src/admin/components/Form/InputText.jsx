import React  from 'react'

import { Field } from './Field'


export function InputText(props) {

    const {
        name,
        id_prefix,
        errors,
        label,
        help,
        placeholder,
        is_validated,
        control_only,
        onChange,
        ...other_props
    } = props

    const id = (id_prefix ? id_prefix + '_' : '') + `id_${name}`

    const className = (
        "form-control" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    const element = (
        <input
            type="text"
            id={ id }
            name={ name }
            placeholder={ placeholder }
            className={ className }
            onChange={ (e) => onChange(name, e.target.value) }
            { ...other_props }
        />
    )

    if (control_only) {
        return element
    } else {
        return (
            <Field { ...{ name, label, help, errors, id_prefix } }>
                { element }
            </Field>
        )
    }

}
