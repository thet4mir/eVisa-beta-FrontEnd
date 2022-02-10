import React, { Fragment } from 'react'

import { Field } from './Field'


export function InputTextarea(props) {

    const { name, errors, label, help, placeholder, is_validated, onChange, ...other_props } = props
    const id = `id_${name}`

    const className = (
        "form-control" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    return (
        <Field { ...{ name, label, help, errors } }>

            <textarea
                id={ id }
                name={ name }
                placeholder={ placeholder }
                className={ className }
                onChange={ (e) => onChange(name, e.target.value) }
                { ...other_props }
            >
            </textarea>

        </Field>
    )
}
