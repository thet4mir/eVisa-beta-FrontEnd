import React  from 'react'
import { Link } from 'react-router-dom'

import { FieldOptions, CommonOptions } from '@/options'
import { ValidationInfo } from '@admin/VisaSchema/Field/components'


export function TableRow(props) {

    const { idx, item } = props


    const {
        id,
        kind,
        label,
        code_name,
        description,
        is_required,
        min_length,
        max_length,
        regex_chars,
        updated_at,
    } = item

    return (
        <tr>
            <th scope="row" className="text-center">{ idx }</th>

            <td className="position-relative">

                <Link to={ `/visa-schema/field/${id}/detail/` } className="stretched-link text-decoration-none">
                    { label } ({ code_name })
                </Link>

                <small className="d-block text-muted">
                    { description }
                </small>

            </td>

            <td>
                { FieldOptions.kinds.options[kind] }
            </td>

            <td>
                { CommonOptions.yesno.options[is_required] }
            </td>

            <td>
                <ValidationInfo item={ item }/>
            </td>

            <td>
                <small className="text-muted">{ updated_at }</small>
            </td>

        </tr>
    )

}
