import React from 'react'

import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'


export function Table(props) {
    const { items, ...other_props } = props
    return (
        <table className="table table-bordered">
            <thead>
                <TableHeader />
            </thead>
            <tbody>
                {items.map((item, idx) =>
                    <TableRow key={idx}
                        item={item}
                        {...other_props}
                    />
                )}
            </tbody>
        </table>
    )
}
