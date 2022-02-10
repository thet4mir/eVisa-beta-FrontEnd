import React from 'react'

import { Select } from '@admin/components/Form'


export function ChoiceField(props) {

    const {
        code_name,
        label,
        description,
        is_required,
        is_required_error,
        options,
    } = props.values

    return (
        <Select
            options = {options.map((opt) =>  [opt.code_name, opt.label])}
            name={ code_name }
            label={ label }
            help={ description }
            errors={ [is_required_error] }
            is_validated={ true }
            placeholder={ label }
        />
    )

}
