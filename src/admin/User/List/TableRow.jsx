import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


export function TableRow(props) {
    const { idx, item } = props

    return (
        <tr className={ item.is_active ? '' : ' table-warning' }>
            <th scope="row" className="text-center">{ idx }</th>
            <td className="position-relative">
                <Link to={`/user/${item.id}/detail/`} className="stretched-link text-decoration-none">
                    { item.username }
                </Link>
            </td>
            <td>
                { item.first_name }
            </td>
            <td>
                { item.last_name }
            </td>
            <td>
                { item.is_superuser
                    ?   <Fragment>
                            <span className="badge rounded-pill bg-success"><i className="bi bi-toggle-on"></i> Админ</span>
                        </Fragment>
                    :   <Fragment>
                            <span className="badge rounded-pill bg-secondary"><i className="bi bi-toggle-off"></i> Хэрэглэгч</span>
                        </Fragment>
                }
            </td>
        </tr>
    )

}
