import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { StatusOptions } from '@/options'


function DeadLine(props) {

    const {item} = props

    return (
        <Fragment>
            {Math.round(item.dead_line/60/60) < 12
                ?
                    <h5>
                        <span className="badge bg-danger">
                            {Math.round(item.dead_line/60/60) < 0
                                ?   <div>Хариу өгөх <br/>хугацаа өнгөрсөн</div>
                                :   <div>Хариу өгөхөд <br/>{Math.round(item.dead_line/60/60)} цаг</div>
                            }
                            <br/>   <small>{ item.created_at.substr(0,16) }</small>
                        </span>
                    </h5>
                :
                    <Fragment>
                        { item.status == 1
                            ?   <h5 className="border border-secondary rounded col-11">
                                    <span className="badge text-dark fw-normal">
                                        Хариу өгөхөд <br/>{Math.round(item.dead_line/60/60)} цаг <br/>
                                        <small>{ item.created_at.substr(0,16) }</small>
                                    </span>
                                </h5>
                            :   <small className="ms-3">{ item.created_at.substr(0,16) }</small>
                        }
                    </Fragment>
            }
        </Fragment>
    )
}

export function TableRow(props){
    const { item, idx } = props

    const {
        id,
        number,
        country,
        visa_kind,
        fee_person,
        status,
        created_by,
        created_at,
        updated_by,
        updated_at,
        name,
        surname,
    } = item

    return (
        <Fragment>
            <tr className= { status == 1 ? Math.round(item.dead_line/60/60) < 12 ? 'table-danger' : null : null}>
                <th scope="row" className="text-center">{ idx }</th>
                <td>
                    <Link to={`/visarequest/${id}/`} className="streched-link text-decoration-none">
                        <p>{ number }</p>
                    </Link>
                </td>
                <td> {name} {surname} </td>
                <td> { country } </td>
                <td> { created_by } </td>
                <td>
                    <code >{fee_person}$/хүн</code>
                </td>
                <td> { visa_kind } </td>
                <td> {status == 1 ? <DeadLine item={item}/> : <small>{created_at}</small> } </td>
                <td>
                    { StatusOptions.status.options[status] }
                </td>
                <td>
                    { updated_by
                        ?   <Fragment>
                                {updated_by}<br/>
                                <small>{updated_at}</small>
                            </Fragment>
                        :   null
                    }
                </td>
            </tr>
        </Fragment>

    )
}
