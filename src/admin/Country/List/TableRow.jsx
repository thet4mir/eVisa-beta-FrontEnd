import React from 'react'
import { Link } from 'react-router-dom'


export function TableRow(props) {
    const { idx, item } = props

    return (
        <tr className={ item.is_active ? '' : ' table-warning' }>
            <th scope="row" className="text-center">{ idx }</th>
            <td className={ "position-relative" + (item.is_moved_last ? ' table-active' : '')}>
                <Link to={`/country/${item.id}/detail/` } className="stretched-link text-decoration-none">
                    { item.name }
                </Link>
            </td>
            <td scope="row"> { item.nationality } </td>
            <td scope="row"><code>{ item.code_alpha2 }</code></td>
            <td scope="row"><code>{ item.code_alpha3 }</code></td>
            <td scope="row"><code>{ item.code_numeric }</code></td>
            <td scope="row">
                <small className="d-block text-muted">
                    {item.updated_at}
                </small>
            </td>
        </tr>
    )

}
