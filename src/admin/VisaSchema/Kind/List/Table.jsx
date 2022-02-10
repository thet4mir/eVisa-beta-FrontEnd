import React from 'react'

import { TableRow } from './TableRow'



export function Table(props) {

    const { items, ...other_props} = props

    return (

        <table className="table table-hover">
            <thead>
                <tr className="text-nowrap">
                    <th scope="col" className="text-center"> <i className="bi bi-chevron-expand"></i> </th>
                    <th scope="col">Визийн ангилал</th>
                    <th scope="col">Төрөл</th>
                    <th scope="col">Хүчинтэй хугацаа</th>
                    <th scope="col"><i className="bi bi-cash"></i> Хураамж</th>
                    <th scope="col"><i className="bi bi-clock"></i> Өөрчлөлт</th>
                </tr>
            </thead>
            <tbody>
                { items.map((item, idx) =>
                    <TableRow key={idx}
                        idx={idx+ 1}
                        item={item}
                        {...other_props}
                    />
                )}
            </tbody>
        </table>

    )
}
