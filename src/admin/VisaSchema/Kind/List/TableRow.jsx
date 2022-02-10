import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { KindOptions } from '@/options'


export function TableRow(props) {
    const { idx, item } = props

    const {
        entry_kind,
    } = item

    return (
        <Fragment>
            <tr className={ item.is_active ? '' : ' table-warning' }>
                <th scope="row" className="text-center">{ idx }</th>
                <td className="position-relative">
                    <Link to={`/visa-schema/kind/${item.id}/detail`} className="stretched-link text-decoration-none">
                        { item.title}
                    </Link>
                </td>
                <td scope="row">
                    { KindOptions.entry_kinds.options[entry_kind] }
                </td>
                <td>
                    <span className="badge bg-primary">{ item.days_valid } хоног</span>
                    <br/> <span className="badge bg-success ">{ item.days_stay } хоног байх</span></td>
                <td scope="row">
                    <code>${ item.fee_person }/хүн</code>
                </td>
                <td scope="row" className="text-muted">
                    <small>{item.created_at.substr(0, 16)}</small>
                </td>
            </tr>
        </Fragment>
    )
}
