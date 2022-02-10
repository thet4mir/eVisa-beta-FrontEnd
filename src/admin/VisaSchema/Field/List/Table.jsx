
import React from 'react'
import { Link } from 'react-router-dom'

import { TableRow } from './TableRow'


export function Table(props) {

    const { items } = props

    return (
        <table className="table table-hover">
            <thead>
                <tr className="text-nowrap">
                    <th scope="col" className="text-center"><i className="bi bi-chevron-expand"></i></th>
                    <th scope="col">Нэр</th>
                    <th scope="col">Төрөл</th>
                    <th scope="col">Заавал оруулах</th>
                    <th scope="col">Хязгаарлалт</th>
                    <th scope="col"><i className="bi bi-clock"></i> Зассан</th>
                </tr>
            </thead>
            <tbody>
                { items.map((item, idx) =>
                    <TableRow key={ idx } idx={ idx + 1 } item={ item }/>
                )}
            </tbody>
        </table>
    )
}
