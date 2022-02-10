import React from 'react'

import { InputText } from '@admin/components/Form'


export function TextField(props) {

    const {
        code_name,
        label,
        description,
        is_required,
        is_required_error,
    } = props.values

    return (
        <InputText
            name={ code_name }
            label={ label }
            help={ description }
            errors={ [is_required_error] }
            is_validated={ true }
            placeholder={ label }
        />
    )

}
