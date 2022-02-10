import React from 'react'
import { Link } from 'react-router-dom'



export function TableRow(props){
    const { idx, item } = props
    return (
        <tr className={ item.is_active ? '' : 'table-warning' }>
            <td scope="row" className="text-center">{ idx }</td>
            <td className="position-relative">
                <Link to={`/visa-schema/document/${item.id}/detail`} className="stretched-link text-decoration-none">
                    { item.name }
                </Link>
            </td>
            <td scope="row" className="text-left text-muted">
                <small className="d-block text-left">
                    { item.created_at.substr(0, 16) }
                </small>
            </td>
            <td scope="row" className="text-left text-muted">
                <small className="d-block text-left">
                    { item.updated_at.substr(0, 16) }
                </small>
            </td>
        </tr>
    )
}