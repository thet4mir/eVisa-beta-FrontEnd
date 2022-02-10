import React from 'react'
import { Link } from 'react-router-dom'

import { IconIsDefault } from '../IconIsDefault'


export function TableRow(props) {
    const { idx, item } = props

    return (
        <tr className={ item.is_active ? '' : ' table-warning' }>
            <th scope="row" className="text-center">{ idx }</th>
            <td className={ "position-relative" + (item.is_moved_last ? ' table-active' : '')}>
                <Link to={`/language/${item.id}/detail/` } className="stretched-link text-decoration-none">
                    { item.name }
                </Link>

            </td>
            <td className="text-nowrap">
                <small className="d-block text-muted">
                    { item.name_local }
                </small>
            </td>
            <td className="text-nowrap">
                <small className="d-block text-muted">
                    <code>{ item.code_name }</code>
                    {} { item.is_default && <IconIsDefault/> }
                </small>
            </td>
            <td className="text-nowrap">
                <small className="d-block text-muted">
                    { item.created_at.substr(0, 16) }
                </small>
            </td>
        </tr>
    )

}
