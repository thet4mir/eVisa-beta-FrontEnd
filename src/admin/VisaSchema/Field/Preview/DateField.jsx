import React, { useState } from 'react'

import { DatePicker } from '@admin/components/Form'


export function DateField(props) {

    const {
        code_name,
        label,
        description,
        is_required,
        is_required_error,
    } = props.values

    const [ value, setValue ] = useState('1900-01-01')

    return (
        <DatePicker
            name={ code_name }
            label={ label }
            help={ description }
            errors={ [is_required_error] }
            is_validated={ true }
            placeholder={ label }
            value={ value }
            onChange={ (name, value) => setValue(value) }
        />
    )

}
