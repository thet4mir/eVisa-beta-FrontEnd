import React  from 'react'

import { Field } from './Field'


export function CheckboxSingle(props) {

    const { name, errors, label, help, is_validated, onChange, value, ...other_props } = props
    const id = `id_${name}`

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

    return (
        <Field help={ help }>

            <div className="form-check">

                <input
                    type="checkbox"
                    id={ id }
                    name={ name }
                    className={ className }
                    onChange={ (e) => onChange(name, e.target.checked) }
                    checked={ !!value }
                    { ...other_props }
                />

                <label className="form-check-label" htmlFor={ id }>
                    { label }
                </label>

                { error &&
                    <div className="invalid-feedback">{ error }</div>
                }

            </div>

        </Field>
    )
}
