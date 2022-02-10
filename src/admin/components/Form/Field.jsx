import React, { Fragment } from 'react'


export function FieldError(props) {

    const { errors } = props

    if (errors && errors.length) {
        return <div className="invalid-feedback">{ errors[0] }</div>
    } else {
        return null
    }

}


export function FieldLabel(props) {

    const { name, label, className, id_prefix } = props

    if (label) {
        const htmlFor = (id_prefix ? id_prefix + '_' : '') + `id_${name}`
        return (
            <label
                htmlFor={ htmlFor }
                className={ className || "form-label" }
            >
                { label }
            </label>
        )
    } else {
        return null
    }

}


export function FieldHelp(props) {

    const { help, className } = props

    if (props.children) {
        return (
            <div
                className={ "form-text" + (className ? ' ' + className : '') }
            >{ props.children }</div>
        )
    }else if (help) {
        return (
            <div
                className={ "form-text" + (className ? ' ' + className : '') }
            >{ help }</div>
        )
    } else {
        return null
    }

}


export function Field(props) {

    const { name, label, errors, help, id_prefix } = props

    return (
        <Fragment>

            <FieldLabel { ...{ label, name, id_prefix } }/>

            { props.children }

            <FieldError errors={ errors }/>

            <FieldHelp help={ help }/>

        </Fragment>
    )
}
