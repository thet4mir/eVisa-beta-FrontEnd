import React from 'react'
import { Link } from 'react-router-dom'


export function TableRow(props) {
    const { item } = props

    return (
        <tr>
            <td className="text-center">
                { item.id }
            </td>
            <td>
                { item.request_scheme }
            </td>
            <td>
                { item.request_method == 'POST' &&
                        <span className="badge bg-success">POST</span>
                }
                { item.request_method == 'GET' &&
                        <span className="badge bg-info">GET</span>
                }
            </td>
            <td className="position-relative text-nowrap">
                <Link to={`/setup/error500/${item.id}/detail/`} className="stretched-link text-decoration-none">
                    { item.request_url }
                </Link>
            </td>
            <td className="text-nowrap">
                <small className="text-muted">
                    { item.created_at.substr(0, 16) }
                </small>
            </td>
        </tr>
    )

}
