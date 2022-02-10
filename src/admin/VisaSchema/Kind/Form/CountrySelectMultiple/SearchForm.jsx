import React, { useState } from 'react'

import { InputText } from '@admin/components/Form'


export function SearchForm(props) {

    const [ query, setQuery ] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(name, value) {
        setQuery(value)
        props.onChange(value)
    }

    return (
        <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={ handleSubmit } noValidate>
            <div className="col-12 ms-3">
                <div className="input-group">
                    <div className="input-group-text">
                        <i className="bi bi-search"></i>
                    </div>

                    <InputText
                        name={ query }
                        value={ query }
                        is_validated={ false }
                        onChange={ handleChange }
                        control_only={ true }
                        placeholder="Хайх..."
                    />
                </div>
            </div>
        </form>
    )
}
