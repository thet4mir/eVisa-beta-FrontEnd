import React, { useState }  from 'react'
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import en from "date-fns/locale/en-AU"
import {
    format as formatDate,
    parse as parseDate,
    isDate,
} from 'date-fns'

import { Field } from './Field'


registerLocale("en", en)


export function DatePicker(props) {

    const {
        name,
        errors,
        label,
        help,
        placeholder,
        is_validated,
        control_only,
        onChange,
        value,
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

    const wrapperClassName = (
        "d-block" +
        (
            is_validated
                ? (errors && errors.length ? " is-invalid" : " is-valid")
                : ""
        )
    )

    function fromDate(date_str) {
        const is_valid = /\d{4}-\d{2}-\d{2}/.test(date_str)

        if (is_valid) {
            return parseDate(date_str, 'yyyy-MM-dd', new Date())
        } else {
            return ''
        }
    }

    function handleChange(date) {
        const date_str = formatDate(date, 'yyyy-MM-dd')
        props.onChange(name, date_str)
    }

    const element = (
        <ReactDatePicker
            autoComplete="off"
            id={ id }
            name={ name }
            placeholder={ placeholder }
            wrapperClassName={ wrapperClassName }
            className={ className }
            dateFormat="yyyy.MM.dd"
            selected={ fromDate(value) }
            locale="en"
            onChange={ handleChange }
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
